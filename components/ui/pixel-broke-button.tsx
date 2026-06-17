import React from 'react';

export interface Button03Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  isActive?: boolean;
  align?: 'left' | 'center';
  pixelColor?: string;
  midBgColor?: string;
  borderColor?: string;
}

export const Button03 = ({ 
  text = "Pixel-Broke",
  isActive = false,
  align = 'center',
  pixelColor,
  midBgColor,
  borderColor,
  style,
  className,
  ...props
}: Button03Props) => {
  // Define the index patterns for left and right pixels
  const leftPixelIndices = [0, 0, 1, 3, 4, 0, 0, 2, 0, 0, 0, 1];
  const rightPixelIndices = [3, 0, 0, 0, 4, 0, 0, 2, 1, 3, 0, 0];

  // Default color schemes based on active state
  // Active state uses cyan theme, Inactive state uses dark forest slate theme
  const defaultMidBgColor = isActive ? '#00f0ff' : '#1b201a';
  const defaultTextColor = isActive ? '#151710' : '#7d9685';

  const activeMidBgColor = midBgColor || defaultMidBgColor;
  const activeTextColor = defaultTextColor;

  return (
    <a 
      {...props}
      data-active={isActive}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'stretch',
        textDecoration: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        boxSizing: 'border-box',
        '--mid-bg-color': activeMidBgColor,
        '--text-color': activeTextColor,
        ...style
      } as React.CSSProperties}
      className={`button03 w-inline-block ${className || ''}`}
    >
      <style>{`
        .button03 {
          color: var(--text-color);
          transition: color 0.2s;
          padding: 0;
        }
        
        .button03_bg {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 24px;
          right: 24px;
          display: flex;
          pointer-events: none;
          z-index: 1;
        }

        .button03_bg-left {
          position: absolute;
          left: 0px;
          top: 0px;
          bottom: 0px;
          width: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .button03_bg-right {
          position: absolute;
          right: 0px;
          top: 0px;
          bottom: 0px;
          width: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .button03_bg-mid {
          flex-grow: 1;
          height: 100%;
          background-color: var(--mid-bg-color);
          transition: background-color 0.2s, transform 0.1s ease;
        }

        .button03_bg-pixel {
          height: calc(100% / 12);
          width: var(--pixel-size, 4px); /* Equal width for all pixels creates a perfect rectangle when not hovering */
          background-color: var(--mid-bg-color);
          transform: translate(0, 0);
          image-rendering: pixelated;
          transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), background-color 0.2s;
        }

        /* Hover OR Active scattering effects: translate individual pixels outward to break the rectangle shape */
        .button03:hover .button03_bg-left .button03_bg-pixel,
        .button03[data-active="true"] .button03_bg-left .button03_bg-pixel {
          transform: translateX(calc(var(--index) * -6px));
        }

        .button03:hover .button03_bg-right .button03_bg-pixel,
        .button03[data-active="true"] .button03_bg-right .button03_bg-pixel {
          transform: translateX(calc(var(--index) * 6px));
        }

        /* Click / Active scattering effects: pixels scatter further, text and body shift down */
        .button03:active .button03_bg-left .button03_bg-pixel {
          transform: translateX(calc(var(--index) * -10px));
        }

        .button03:active .button03_bg-right .button03_bg-pixel {
          transform: translateX(calc(var(--index) * 10px));
        }

        .button03:active .button03_bg-mid {
          transform: translateY(2px);
        }

        .button03:active .button03_inner {
          transform: translateY(2px);
        }

        /* Inactive hover states */
        .button03[data-active="false"]:hover {
          color: #e0fff0;
          --mid-bg-color: #3c4538;
        }

        /* Active hover states */
        .button03[data-active="true"]:hover {
          color: #151710;
          --mid-bg-color: #00f0ff;
        }

        .button03_inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          width: 100%;
          margin-left: 24px;
          margin-right: 24px;
          padding: 0.8rem 1.2rem;
          box-sizing: border-box;
          transition: transform 0.1s ease;
        }

        .button03_text {
          position: relative;
          color: inherit;
          white-space: normal;
          word-break: break-word;
          line-height: 1.3;
          width: 100%;
        }
      `}</style>

      {/* Floating pixel column left */}
      <span className="button03_bg">
        <span className="button03_bg-left">
          {leftPixelIndices.map((index, i) => (
            <span
              key={`left-${i}`}
              style={{ '--index': index } as React.CSSProperties}
              className="button03_bg-pixel"
            ></span>
          ))}
        </span>
        <span className="button03_bg-mid"></span>
        <span className="button03_bg-right">
          {rightPixelIndices.map((index, i) => (
            <span
              key={`right-${i}`}
              style={{ '--index': index } as React.CSSProperties}
              className="button03_bg-pixel"
            ></span>
          ))}
        </span>
      </span>

      {/* Button Content */}
      <span 
        className="button03_inner"
        style={{
          justifyContent: align === 'left' ? 'flex-start' : 'center',
        }}
      >
        <span 
          className="button03_text"
          style={{
            textAlign: align,
          }}
        >
          {text}
        </span>
      </span>
    </a>
  );
};

export default Button03;
