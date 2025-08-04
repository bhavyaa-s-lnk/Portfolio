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
      <Script src="/particles/particles.min.js" strategy="beforeInteractive" />
      <div
        id="particles-js"
        className="fixed top-0 left-0 w-full h-full z-[2] pointer-events-auto"

         // Needed for interaction
      />
    </>
  );
};



export default ParticlesBackground;
