'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: {
      load: (id: string, path: string, cb?: () => void) => void;
    };
  }
}

const ParticlesBackground = () => {
  useEffect(() => {


    const initParticles = () => {
      const demoConfig = {
        particles: {
          number: { value: 48 },
          color: { value: ['#8b5cf6', '#06b6d4', '#ffffff'] },
          size: { value: 3.4 },
          line_linked: { enable: true, distance: 120, color: '#8b5cf6', opacity: 0.12, width: 0.6 }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
          },
          modes: { repulse: { distance: 120, duration: 0.45 }, push: { particles_nb: 4 } }
        }
      };

      try {
        if ((window as any).particlesJS && typeof (window as any).particlesJS === 'function') {
          (window as any).particlesJS('particles-js', demoConfig);
          console.log('particles initialized (cdn)');
        } else if ((window as any).particlesJS && typeof (window as any).particlesJS.load === 'function') {
          (window as any).particlesJS.load('particles-js', demoConfig);
          console.log('particles initialized (cdn)');
        } else {
          throw new Error('particlesJS missing after load');
        }
      } catch (e) {
        console.error('Failed to init particles:', e);
      }
    };

    // always load CDN (more reliable than local across dev setups)
    console.log('loading particles.js CDN...');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      console.log('particles.js CDN loaded');
      initParticles();
    };
    script.onerror = () => {
      console.error('particles.js CDN failed to load');
    };
    document.head.appendChild(script);

    // create a small inline canvas demo so there's always visible motion for local testing
    const container = document.getElementById('particles-js');
    let rafId: number | null = null;
    let demoCanvas: HTMLCanvasElement | null = null;
    const colors = ['rgba(139,92,246,0.95)', 'rgba(56,189,248,0.95)', 'rgba(255,255,255,0.9)'];

    function setupDemoCanvas() {
      // Always append demo canvas to the document body to guarantee visibility
      // keep it non-interactive and behind content (z-index:-1) and use screen blend to make it pop
      if (demoCanvas && demoCanvas.parentNode) demoCanvas.parentNode.removeChild(demoCanvas);
      demoCanvas = document.createElement('canvas');
      demoCanvas.id = 'particles-demo-canvas';
      // bring canvas above content so particles are always visible, but keep it non-interactive
      demoCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:40;mix-blend-mode:normal;opacity:1';
      document.body.appendChild(demoCanvas);
      console.log('particles: demo canvas appended to body');
      // tiny persistent status dot so you can see if the demo canvas was created
      let status = document.getElementById('particles-status');
      if (!status) {
        status = document.createElement('div');
        status.id = 'particles-status';
        status.style.cssText = 'position:fixed;left:10px;bottom:10px;width:12px;height:12px;border-radius:999px;background:#06b6d4;box-shadow:0 0 8px rgba(6,182,212,0.8);z-index:50;pointer-events:none';
        document.body.appendChild(status);
      }
      const ctx = demoCanvas.getContext('2d');
      const DPR = window.devicePixelRatio || 1;

      function resizeCanvas() {
        demoCanvas!.width = Math.max(window.innerWidth, 300) * DPR;
        demoCanvas!.height = Math.max(window.innerHeight, 200) * DPR;
        demoCanvas!.style.width = '100%';
        demoCanvas!.style.height = '100%';
        if (ctx) ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Position particles relative to viewport when canvas is on body
      const particles = Array.from({ length: 56 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.3,
        vy: (Math.random() - 0.5) * 1.3,
        r: 2.8 + Math.random() * 3.6,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));

      console.log('particles: demo started — count=', particles.length);

      function draw() {
        if (!ctx || !demoCanvas) return;
        ctx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);

        // subtle background tint to increase contrast
        ctx.fillStyle = 'rgba(0,0,0,0.02)';
        ctx.fillRect(0, 0, demoCanvas.width, demoCanvas.height);

        // use additive blending for glow
        ctx.globalCompositeOperation = 'lighter';

        // draw connections sparingly but more visible
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          // wrap around viewport
          if (p.x < -20) p.x = window.innerWidth + 20;
          if (p.x > window.innerWidth + 20) p.x = -20;
          if (p.y < -20) p.y = window.innerHeight + 20;
          if (p.y > window.innerHeight + 20) p.y = -20;

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(140,100,230,0.28)';
              ctx.lineWidth = 0.9;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        // draw particles last (ensure particle fills remain bright)
        ctx.globalCompositeOperation = 'source-over';
        for (const p of particles) {
          ctx.beginPath();
          ctx.fillStyle = p.c;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        rafId = requestAnimationFrame(draw);
      }

      rafId = requestAnimationFrame(draw);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resizeCanvas);
        if (demoCanvas && demoCanvas.parentNode) demoCanvas.parentNode.removeChild(demoCanvas);
        const statusEl = document.getElementById('particles-status');
        if (statusEl) statusEl.remove();
      };
    }

    const cleanupDemo = setupDemoCanvas();

    // cleanup if component unmounts
    return () => {
      if (cleanupDemo) cleanupDemo();
    };
  }, []);

  return (
    <>
      <div
        id="particles-js"
        className="fixed inset-0 z-0 pointer-events-none"
        // container for particles (now behind content)
      />
    </>
  );
};



export default ParticlesBackground;
