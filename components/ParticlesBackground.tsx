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
          if (window.particlesJS) {
            console.log('Particles script loaded, initializing from local file');
            window.particlesJS.load('particles-js', '/particles/particles.json');
            return;
          }

          // Fallback to CDN and inline demo config if local script is not available
          console.warn('Local particles script not found — loading CDN fallback');
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
          s.async = true;
          s.onload = () => {
            console.log('CDN particles loaded, initializing with inline demo config');
            const demoConfig = {
              particles: {
                number: { value: 80 },
                color: { value: '#8b5cf6' },
                size: { value: 3 },
                line_linked: { enable: true, distance: 150, color: '#8b5cf6', opacity: 0.4, width: 1 }
              },
              interactivity: {
                events: {
                  onhover: { enable: true, mode: 'repulse' },
                  onclick: { enable: true, mode: 'push' }
                },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
              }
            };

            // particlesJS may be exposed as a function
            if ((window as any).particlesJS && typeof (window as any).particlesJS === 'function') {
              (window as any).particlesJS('particles-js', demoConfig);
            } else if ((window as any).particlesJS && typeof (window as any).particlesJS.load === 'function') {
              (window as any).particlesJS.load('particles-js', demoConfig);
            } else {
              console.error('Unable to initialize particles from CDN fallback');
            }
          };
          document.head.appendChild(s);
        }}
      />
      <div
        id="particles-js"
        className="fixed inset-0 z-0 pointer-events-none"
        // container for particles
      />
    </>
  );
};



export default ParticlesBackground;
