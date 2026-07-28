import re

with open('components/CustomCursor.tsx', 'r') as f:
    content = f.read()

# 1. Fix cursor flipping for book
content = content.replace(
    "if (pathnameRef.current.startsWith('/pixel') || pathnameRef.current.startsWith('/book')) {",
    "if (pathnameRef.current.startsWith('/pixel')) {"
)

# 2. Update circle logic for the iframe preview
old_circle_tick = """            circleRef.current.style.width = `${circleSize.current}px`;
            circleRef.current.style.height = `${circleSize.current}px`;
            
            // Fade out border when circle is past 70% of animation"""

new_circle_tick = """            circleRef.current.style.width = `${circleSize.current}px`;
            circleRef.current.style.height = `${circleSize.current}px`;
            
            // Update iframe scale if it exists
            const iframe = circleRef.current.querySelector('iframe');
            if (iframe) {
              iframe.style.left = `${circleSize.current / 2}px`;
              iframe.style.top = `${circleSize.current / 2}px`;
              iframe.style.transform = `translate(-50%, -50%) scale(${circleSize.current / window.innerWidth})`;
            }

            // Fade out border when circle is past 70% of animation"""
content = content.replace(old_circle_tick, new_circle_tick)

# 3. Render the iframe inside the circle
old_circle_render = """            backgroundColor: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
            backgroundImage: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(${(hoveredTheme === 'book' || isBookPage) ? '/gibli.png' : '/px1.png'})` : 'none',
            backgroundSize: (hoveredTheme === 'pixel' || isTransitioning || isFadingOut) ? undefined : 'cover',
            backgroundRepeat: 'no-repeat',
            backdropFilter: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'none' : 'blur(2px)',
            pointerEvents: 'none',
            transform: `translate(-50%, -50%) scale(${(isTransitioning || isFadingOut) ? 1.0 : (isHovering ? 1.0 : 0)})`,
            opacity: (isHovering || isTransitioning || isFadingOut) ? 1 : 0,
            transition: (isTransitioning || isFadingOut)
              ? 'none'
              : 'width 0.3s ease, height 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, border-color 0.4s ease, background-color 0.4s ease',
            zIndex: (isTransitioning || isFadingOut) ? 10001 : -1,
            imageRendering: 'pixelated'
          }}
        />"""
new_circle_render = """            backgroundColor: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
            backgroundImage: (hoveredTheme === 'pixel' || (isPixelPage && (isTransitioning || isFadingOut))) ? `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(/px1.png)` : 'none',
            backgroundSize: (hoveredTheme === 'pixel' || isTransitioning || isFadingOut) ? undefined : 'cover',
            backgroundRepeat: 'no-repeat',
            backdropFilter: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'none' : 'blur(2px)',
            pointerEvents: 'none',
            overflow: 'hidden',
            transform: `translate(-50%, -50%) scale(${(isTransitioning || isFadingOut) ? 1.0 : (isHovering ? 1.0 : 0)})`,
            opacity: (isHovering || isTransitioning || isFadingOut) ? 1 : 0,
            transition: (isTransitioning || isFadingOut)
              ? 'none'
              : 'width 0.3s ease, height 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, border-color 0.4s ease, background-color 0.4s ease',
            zIndex: (isTransitioning || isFadingOut) ? 10001 : -1,
            imageRendering: 'pixelated'
          }}
        >
          {(hoveredTheme === 'book' || (isBookPage && (isTransitioning || isFadingOut))) && (
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
          )}
        </div>"""
content = content.replace(old_circle_render, new_circle_render)

# 4. Update the overlay to use iframe for book
old_overlay = """        <div 
          ref={overlayRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999998,
            backgroundColor: '#000',
            opacity: '1',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              right: '2px',
              bottom: '2px',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(${(hoveredTheme === 'book' || isBookPage) ? '/gibli.png' : '/px1.png'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
            }}
          />
        </div>"""

new_overlay = """        <div 
          ref={overlayRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999998,
            backgroundColor: '#000',
            opacity: '1',
            pointerEvents: 'none',
          }}
        >
          {!(hoveredTheme === 'book' || isBookPage) && (
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                right: '2px',
                bottom: '2px',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(/px1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
              }}
            />
          )}
          {(hoveredTheme === 'book' || isBookPage) && (
            <iframe 
              src="/book"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                pointerEvents: 'none'
              }}
            />
          )}
        </div>"""
content = content.replace(old_overlay, new_overlay)

with open('components/CustomCursor.tsx', 'w') as f:
    f.write(content)

