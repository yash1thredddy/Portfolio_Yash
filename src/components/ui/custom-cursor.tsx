'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/contexts/PerformanceContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const hueRef = useRef(0);
  const { isHeavyRendering } = usePerformance();

  useEffect(() => {
    // Only run on desktop (not mobile)
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.opacity = '0.6'; // Reduced opacity for subtler effect
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true, // Better performance
      willReadFrequently: false
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const createParticle = (x: number, y: number, speed: number = 1) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 2 + 1;

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity * speed,
        vy: Math.sin(angle) * velocity * speed,
        size: Math.random() * 3 + 2,
        hue: hueRef.current,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 40 + 40,
      });
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Pause animation during heavy rendering
      if (isHeavyRendering) {
        // Clear particles and canvas during heavy rendering
        particlesRef.current = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas completely for transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glowing cursor core
      const mouse = mouseRef.current;
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 30);
      gradient.addColorStop(0, `hsla(${hueRef.current}, 100%, 70%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${hueRef.current + 30}, 100%, 60%, 0.4)`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      ctx.fill();

      // Draw cursor ring
      ctx.strokeStyle = `hsla(${hueRef.current}, 100%, 60%, 0.6)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Calculate mouse velocity
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Create fewer particles for better performance
      if (speed > 1) {
        const numParticles = Math.min(Math.floor(speed / 8), 2); // Reduced particles
        for (let i = 0; i < numParticles; i++) {
          createParticle(mouse.x, mouse.y, speed / 12);
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.life++;

        const lifeRatio = particle.life / particle.maxLife;
        particle.alpha = 1 - lifeRatio;

        // Draw particle with glow
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        particleGradient.addColorStop(
          0,
          `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`
        );
        particleGradient.addColorStop(
          1,
          `hsla(${particle.hue + 30}, 100%, 50%, 0)`
        );

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return particle.life < particle.maxLife;
      });

      // Cycle hue for rainbow effect
      hueRef.current = (hueRef.current + 1.5) % 360;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(rafRef.current);
      if (canvasRef.current) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  return null;
}
