"use client";
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D, smokeImage: HTMLImageElement) => void;
}

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const NUM_PARTICLES = 80;
  const fps = 30;
  const fpsInterval = 80 / fps;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf: number;
    let particles: Particle[] = [];
    const smokeImage = new Image();
    smokeImage.src = "/cloud.webp";

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight + 100;
      initParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width - width;
        this.y = Math.random() * height - height / 2;
        this.size = Math.random() * 3000 + 1000;
        this.opacity = Math.random() * 0.8;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.002;
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D, smokeImage: HTMLImageElement) {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
          smokeImage,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size
        );
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const { width, height } = canvas;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new ParticleImpl(width, height));
      }
    };

    const handleParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx, smokeImage);
      });
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      handleParticles();
    };

    smokeImage.onload = () => {
      animate();
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="smoke-bkg"
      style={{
        position: "fixed",
        top: 0,
        zIndex: -10,
        height: "100%",
        width: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Cloud Effect"
        style={{ opacity: 0.5 }}
      ></canvas>
    </div>
  );
};

export default Background;
