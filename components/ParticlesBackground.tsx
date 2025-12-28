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
          number: { value: 140 },
          color: { value: '#8b5cf6' },
          size: { value: 4 },
          line_linked: { enable: true, distance: 220, color: '#8b5cf6', opacity: 0.6, width: 1 }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
          },
          modes: { repulse: { distance: 160, duration: 0.4 }, push: { particles_nb: 6 } }
        }
      };

      try {
        if ((window as any).particlesJS && typeof (window as any).particlesJS === 'function') {
          (window as any).particlesJS('particles-js', demoConfig);
          updateDebug('initialized (cdn)', '#10b981');
        } else if ((window as any).particlesJS && typeof (window as any).particlesJS.load === 'function') {
          (window as any).particlesJS.load('particles-js', demoConfig);
          updateDebug('initialized (cdn)', '#10b981');
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

    // cleanup if component unmounts
    return () => {
      const badge = document.getElementById('particles-debug');
      if (badge) badge.remove();
    };
  }, []);

  return (
    <>
      <div
        id="particles-js"
        className="fixed inset-0 z-0 pointer-events-none"
        // container for particles
      />
    </>
  );
};



export default ParticlesBackground;
