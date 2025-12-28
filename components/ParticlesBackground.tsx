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
            console.log('Particles script loaded, initializing');
            window.particlesJS.load('particles-js', '/particles/particles.json');
          } else {
            console.warn('Particles script loaded but particlesJS not found');
          }
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
