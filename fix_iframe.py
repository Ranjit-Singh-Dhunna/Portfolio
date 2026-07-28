import re

with open('components/CustomCursor.tsx', 'r') as f:
    content = f.read()

old_tick_logic = """            // Update iframe scale if it exists
            const iframe = circleRef.current.querySelector('iframe');
            if (iframe) {
              iframe.style.left = `${circleSize.current / 2}px`;
              iframe.style.top = `${circleSize.current / 2}px`;
              iframe.style.transform = `translate(-50%, -50%) scale(${circleSize.current / window.innerWidth})`;
            }"""

new_tick_logic = """            // Update iframe to act as an X-ray window
            const iframe = circleRef.current.querySelector('iframe');
            if (iframe) {
              const circleGlobalLeft = cursorPos.current.x + 4 - circleSize.current / 2;
              const circleGlobalTop = cursorPos.current.y + 18 - circleSize.current / 2;
              iframe.style.left = `${-circleGlobalLeft}px`;
              iframe.style.top = `${-circleGlobalTop}px`;
              iframe.style.transform = `none`;
            }"""

content = content.replace(old_tick_logic, new_tick_logic)

old_iframe_jsx = """          {(hoveredTheme === 'book' || (isBookPage && (isTransitioning || isFadingOut))) && (
            <iframe 
              src="/book" 
              style={{
                position: 'absolute',
                top: (isTransitioning || isFadingOut) ? undefined : '50%',
                left: (isTransitioning || isFadingOut) ? undefined : '50%',
                width: '100vw',
                height: '100vh',
                border: 'none',
                pointerEvents: 'none',
                transform: (isTransitioning || isFadingOut) ? undefined : `translate(-50%, -50%) scale(${150 / (typeof window !== 'undefined' ? window.innerWidth : 1920)})`,
                transformOrigin: 'center center'
              }}
            />
          )}"""

new_iframe_jsx = """          {(hoveredTheme === 'book' || (isBookPage && (isTransitioning || isFadingOut))) && (
            <iframe 
              src="/book" 
              style={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                border: 'none',
                pointerEvents: 'none',
                transformOrigin: '0 0'
              }}
            />
          )}"""

content = content.replace(old_iframe_jsx, new_iframe_jsx)

with open('components/CustomCursor.tsx', 'w') as f:
    f.write(content)

