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
  const NUM_PARTICLES = 500;
  const fps = 30;
  const fpsInterval = 800 / fps;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let raf: number;
    let particles: Particle[] = [];
    const smokeImage = new Image();
    smokeImage.src = "/cloud.webp";

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 100;

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
        ctx.globalAlpha = 1.0;
        ctx.restore();
      }
    }

    const initParticles = () => {
      const { width, height } = canvas;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new ParticleImpl(width, height));
      }
    };

    const handleParticles = () => {
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx, smokeImage);
      });
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = Date.now();
      const elapsed = now - (now % fpsInterval);

      if (elapsed > fpsInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
      }
    };

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight + 100;
      cancelAnimationFrame(raf);
      initParticles();
      animate();
    });

    smokeImage.onload = () => {
      initParticles();
      animate();
    };

    return () => {
      window.removeEventListener("resize", () => {});
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
        style={{
          opacity: 0.5,
          ...({
            "@media (prefers-color-scheme: dark)": { opacity: 0.5 },
          } as React.CSSProperties),
        }}
      ></canvas>
    </div>
  );
};

export default Background;
