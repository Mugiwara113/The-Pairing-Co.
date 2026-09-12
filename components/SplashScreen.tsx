'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: 'foam' | 'bubble';
  color: string;
}

interface Pie {
  x: number;
  y: number;
  scale: number;
}

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animation state
    let time = 0;
    const totalDuration = 4500; // 4.5 seconds
    const particles: Particle[] = [];
    const pie: Pie = { x: canvas.width * 0.5, y: canvas.height * 0.5, scale: 0 };

    // Draw wine bottle
    const drawBottle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Bottle body
      ctx.fillStyle = '#2d5016';
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bottle neck
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(-6, -15, 12, 20);

      // Glass shine
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0.5, 2);
      ctx.stroke();

      // Bottle label
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(-12, -5, 24, 8);
      ctx.fillStyle = '#333';
      ctx.font = '6px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('FINE', 0, -2);

      ctx.restore();
    };

    // Draw cork
    const drawCork = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      progress: number
    ) => {
      ctx.save();

      // Cork shoots up and away
      const moveProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.3));
      const corkX = x + moveProgress * 200;
      const corkY = y - moveProgress * 300;

      ctx.translate(corkX, corkY);
      ctx.rotate((moveProgress * Math.PI) / 4);

      // Cork body
      ctx.fillStyle = '#d4a574';
      ctx.fillRect(-4, -12, 8, 24);

      // Cork texture
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      for (let i = -10; i < 10; i += 2) {
        ctx.beginPath();
        ctx.moveTo(-4, i);
        ctx.lineTo(4, i);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Draw pie
    const drawPie = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
      if (scale <= 0) return;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Pie crust
      ctx.fillStyle = '#c9a876';
      ctx.beginPath();
      ctx.ellipse(0, 0, 60, 50, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pie edge highlight
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 5, 58, 48, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Filling
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.ellipse(0, 8, 50, 40, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw whipped cream
    const drawWhippedCream = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number
    ) => {
      if (scale <= 0) return;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Whipped cream peaks
      const peakPositions = [-35, -15, 0, 15, 35];
      ctx.fillStyle = '#ffffff';

      peakPositions.forEach((px, i) => {
        ctx.beginPath();
        const height = 40 + Math.sin(time * 0.005 + i) * 5;
        ctx.bezierCurveTo(px - 15, -50, px - 10, -height, px, -30);
        ctx.bezierCurveTo(px + 10, -height, px + 15, -50, px, -20);
        ctx.fill();
      });

      // Shine on cream
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(0, -40, 20, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Create foam particles from cork trail
    const createFoamParticles = (progress: number) => {
      if (progress > 0.1 && progress < 0.4) {
        const moveProgress = (progress - 0.1) / 0.3;
        const particleX = canvas.width * 0.5 + moveProgress * 200;
        const particleY = canvas.height * 0.35 - moveProgress * 300;

        for (let i = 0; i < 3; i++) {
          particles.push({
            x: particleX,
            y: particleY,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 2 - 1,
            life: 1,
            maxLife: 1,
            size: Math.random() * 4 + 2,
            type: 'foam',
            color: '#f5f5dc',
          });
        }
      }

      // Transform to whipped cream particles
      if (progress > 0.45 && progress < 0.7) {
        const transformProgress = (progress - 0.45) / 0.25;
        const particleX = canvas.width * 0.5 + (1 - transformProgress) * 150;
        const particleY = canvas.height * 0.5 + (1 - transformProgress) * 100;

        for (let i = 0; i < 2; i++) {
          particles.push({
            x: particleX,
            y: particleY,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            life: 1,
            maxLife: 1.5,
            size: Math.random() * 6 + 3,
            type: 'foam',
            color: '#ffffff',
          });
        }
      }
    };

    // Animation loop
    const animate = (timestamp: number) => {
      time = timestamp;
      const progress = (timestamp % totalDuration) / totalDuration;

      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Title
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 48px serif';
      ctx.textAlign = 'center';
      ctx.fillText('Spirited Sweetly', canvas.width / 2, 80);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '20px serif';
      ctx.fillText('Flavor Meets Celebration', canvas.width / 2, 120);

      // Bottle position
      const bottleX = canvas.width * 0.5;
      const bottleY = canvas.height * 0.35;

      // Phase 1: Bottle sits (0 - 0.1)
      if (progress < 0.1) {
        drawBottle(ctx, bottleX, bottleY, 1);
      }

      // Phase 2: Cork pops and flies (0.1 - 0.4)
      if (progress > 0.08) {
        drawCork(ctx, bottleX, bottleY, progress);
      }

      // Phase 3: Bottle stays (0.4 - 0.45)
      if (progress < 0.45) {
        drawBottle(ctx, bottleX, bottleY, 1);
      }

      // Phase 4: Pie enters with whipped cream (0.45 - end)
      if (progress > 0.4) {
        const pieProgress = Math.max(0, progress - 0.4) / 0.1;
        pie.scale = Math.min(1, pieProgress * 1.2);
        drawPie(ctx, canvas.width * 0.5, canvas.height * 0.5, pie.scale);

        if (progress > 0.45) {
          const creamProgress = Math.max(0, progress - 0.45) / 0.2;
          drawWhippedCream(ctx, canvas.width * 0.5, canvas.height * 0.5, creamProgress);
        }
      }

      // Create particles
      createFoamParticles(progress);

      // Draw and update particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.15; // Gravity
        particle.life -= 1 / 60;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        const alpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color.replace(')', `, ${alpha * 0.8})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      });

      // Check if animation complete
      if (progress > 0.95) {
        setTimeout(() => {
          onComplete();
        }, 300);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 text-sm">
        Loading your culinary adventure...
      </div>
    </div>
  );
}
