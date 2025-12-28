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
    const interval = setInterval(() => {
      if (window.particlesJS) {
        window.particlesJS.load('particles-js', '/particles/particles.json');
        clearInterval(interval);
      }
    }, 100);
  }, []);

  return (
    <>
      <Script
        src="/particles/particles.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // helper to update a visible debug badge for quick verification
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

          if (window.particlesJS) {
            console.log('Particles script loaded, initializing from local file');
            updateDebug('initializing (local)', '#06b6d4');
            try {
              window.particlesJS.load('particles-js', '/particles/particles.json');
              updateDebug('initialized (local)', '#10b981');
            } catch (e) {
              console.error('Error initializing local particles:', e);
              updateDebug('init error (local)', '#ef4444');
            }
            return;
          }

          // Fallback to CDN and inline demo config if local script is not available
          console.warn('Local particles script not found — loading CDN fallback');
          updateDebug('loading CDN fallback', '#f59e0b');

          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
          s.async = true;
          s.onload = () => {
            console.log('CDN particles loaded, initializing with inline demo config');
            updateDebug('initializing (cdn)', '#06b6d4');
            const demoConfig = {
              particles: {
                number: { value: 120 },
                color: { value: '#38bdf8' },
                size: { value: 5 },
                line_linked: { enable: true, distance: 200, color: '#38bdf8', opacity: 0.6, width: 1 }
              },
              interactivity: {
                events: {
                  onhover: { enable: true, mode: 'repulse' },
                  onclick: { enable: true, mode: 'push' }
                },
                modes: { repulse: { distance: 150, duration: 0.4 }, push: { particles_nb: 6 } }
              }
            };

            try {
              if ((window as any).particlesJS && typeof (window as any).particlesJS === 'function') {
                (window as any).particlesJS('particles-js', demoConfig);
              } else if ((window as any).particlesJS && typeof (window as any).particlesJS.load === 'function') {
                (window as any).particlesJS.load('particles-js', demoConfig);
              } else {
                throw new Error('particlesJS not exposed after CDN load');
              }

              updateDebug('initialized (cdn)', '#10b981');
            } catch (e) {
              console.error('Unable to initialize particles from CDN fallback', e);
              updateDebug('init error (cdn)', '#ef4444');
            }

            // hide debug badge after 6s if successful
            setTimeout(() => {
              const b = document.getElementById('particles-debug');
              if (b && b.innerText.startsWith('Particles: initialized')) b.style.display = 'none';
            }, 6000);
          };

          s.onerror = () => {
            console.error('CDN fallback script failed to load');
            updateDebug('cdn load failed', '#ef4444');
          };
          document.head.appendChild(s);
        }}
        onError={() => {
          // ensure fallback if local script 404s
          console.warn('Local particles script failed to load (onError) — falling back to CDN');
          const evt = new Event('error-fallback');
          window.dispatchEvent(evt);
        }}
      />
      <div
        id="particles-js"
        className="fixed inset-0 z-10 pointer-events-none"
        // container for particles
      />
    </>
  );
};



export default ParticlesBackground;
