'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    particlesJS: {
      load: (id: string, path: string, cb?: () => void) => void;
    };
  }
}

const ParticlesBackground = () => {
  useEffect(() => {
    // force load official particles.js from CDN and initialize with a visible demo config
    const updateDebug = (text: string, color = '#10b981') => {
      let badge = document.getElementById('particles-debug');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'particles-debug';
        badge.style.cssText = 'position:fixed;right:12px;top:12px;padding:6px 10px;border-radius:6px;background:#111;color:#fff;z-index:9999;font-size:12px;font-weight:600;opacity:0.95';
        document.body.appendChild(badge);
      }
      (badge as HTMLElement).innerText = `Particles: ${text}`;
      (badge as HTMLElement).style.background = color;
    };

    const initParticles = () => {
      const demoConfig = {
        particles: {
          number: { value: 24 },
          color: { value: '#8b5cf6' },
          size: { value: 3 },
          line_linked: { enable: true, distance: 90, color: '#8b5cf6', opacity: 0.04, width: 0.5 }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
          },
          modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 3 } }
        }
      };

      try {
        if ((window as any).particlesJS && typeof (window as any).particlesJS === 'function') {
          (window as any).particlesJS('particles-js', demoConfig);
          updateDebug('initialized (cdn)', '#10b981');
          // hide debug badge shortly after init
          setTimeout(() => {
            const b = document.getElementById('particles-debug');
            if (b) b.style.display = 'none';
          }, 3000);
        } else if ((window as any).particlesJS && typeof (window as any).particlesJS.load === 'function') {
          (window as any).particlesJS.load('particles-js', demoConfig);
          updateDebug('initialized (cdn)', '#10b981');
          setTimeout(() => {
            const b = document.getElementById('particles-debug');
            if (b) b.style.display = 'none';
          }, 3000);
        } else {
          throw new Error('particlesJS missing after load');
        }
      } catch (e) {
        console.error('Failed to init particles:', e);
        updateDebug('init error', '#ef4444');
      }
    };

    // always load CDN (more reliable than local across dev setups)
    updateDebug('loading CDN', '#f59e0b');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      console.log('particles.js CDN loaded');
      initParticles();
    };
    script.onerror = () => {
      console.error('particles.js CDN failed to load');
      updateDebug('cdn load failed', '#ef4444');
    };
    document.head.appendChild(script);

    // create a small inline canvas demo so there's always visible motion for local testing
    const container = document.getElementById('particles-js');
    let rafId: number | null = null;
    let demoCanvas: HTMLCanvasElement | null = null;

    function setupDemoCanvas() {
      if (!container) return;
      demoCanvas = document.createElement('canvas');
      demoCanvas.id = 'particles-demo-canvas';
      demoCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
      container.appendChild(demoCanvas);
      const ctx = demoCanvas.getContext('2d');
      const DPR = window.devicePixelRatio || 1;

      function resizeCanvas() {
        demoCanvas!.width = container.clientWidth * DPR;
        demoCanvas!.height = container.clientHeight * DPR;
        demoCanvas!.style.width = '100%';
        demoCanvas!.style.height = '100%';
        if (ctx) ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const colors = ['rgba(139,92,246,0.85)', 'rgba(56,189,248,0.85)'];
      const particles = Array.from({ length: 30 }).map(() => ({
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        r: 2 + Math.random() * 3,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));

      function draw() {
        if (!ctx || !demoCanvas) return;
        ctx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);

        // faint background tint to help visibility (very subtle)
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(0, 0, demoCanvas.width, demoCanvas.height);

        // draw connecting lines sparingly
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          // wrap around edges for smooth motion
          if (p.x < -10) p.x = container.clientWidth + 10;
          if (p.x > container.clientWidth + 10) p.x = -10;
          if (p.y < -10) p.y = container.clientHeight + 10;
          if (p.y > container.clientHeight + 10) p.y = -10;

          // light connections to nearby particles only
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(140,100,230,0.06)';
              ctx.lineWidth = 0.6;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        // draw particles on top of lines
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
      };
    }

    const cleanupDemo = setupDemoCanvas();

    // cleanup if component unmounts
    return () => {
      const badge = document.getElementById('particles-debug');
      if (badge) badge.remove();
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
