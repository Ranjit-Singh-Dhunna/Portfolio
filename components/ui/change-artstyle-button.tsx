"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangeArtstyleButton() {
  const [isDissolving, setIsDissolving] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDissolving(true);
    window.dispatchEvent(new CustomEvent('pixel-dissolve-start'));
    setTimeout(() => {
      router.push('/');
    }, 1000); // 1s dissolve animation
  };

  return (
    <>
      <a 
        href="/" 
        onClick={handleClick}
        style={{ 
          color: 'rgba(255, 255, 255, 0.4)', 
          textDecoration: 'none', 
          background: 'transparent', 
          border: '20px solid transparent', 
          fontFamily: 'var(--font-pixelify), monospace',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          display: 'inline-block',
          fontWeight: 600,
        }}
      >
        Change Artstyle
      </a>

      {isDissolving && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#E9E3DE',
          zIndex: 100000,
          pointerEvents: 'none',
          animation: 'dissolve 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}>
          <style>{`
            @keyframes dissolve {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
