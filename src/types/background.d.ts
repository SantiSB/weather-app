export interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
    update: () => void;
    draw: (ctx: CanvasRenderingContext2D, smokeImage: HTMLImageElement) => void;
}