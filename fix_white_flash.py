import re

with open('components/CustomCursor.tsx', 'r') as f:
    content = f.read()

# 1. Update the fade-out logic in tick() to use the correct ref
old_fade_logic = """      // Handle fade-out phase: smoothly fade the overlay after page has painted
      if (overlayRef.current && isFadingOutRef.current) {
        if (fadeStartTime.current !== null) {
          const fadeElapsed = performance.now() - fadeStartTime.current;
          const fadeDuration = 400;
          const fadeT = Math.min(1, fadeElapsed / fadeDuration);
          overlayRef.current.style.opacity = `${1 - fadeT}`;
          if (fadeT >= 1) {
            isFadingOutRef.current = false;
            setIsFadingOut(false);
            circleSize.current = 150;
            transitionStartTime.current = null;
            fullScreenOverlayRef.current = false;
            setFullScreenOverlay(false);
          }
        }
      }"""

new_fade_logic = """      // Handle fade-out phase: smoothly fade the overlay after page has painted
      const fadeTarget = overlayRef.current || (circleRef.current && fullScreenOverlayRef.current ? circleRef.current : null);
      if (fadeTarget && isFadingOutRef.current) {
        if (fadeStartTime.current !== null) {
          const fadeElapsed = performance.now() - fadeStartTime.current;
          const fadeDuration = 400;
          const fadeT = Math.min(1, fadeElapsed / fadeDuration);
          fadeTarget.style.opacity = `${1 - fadeT}`;
          if (fadeT >= 1) {
            isFadingOutRef.current = false;
            setIsFadingOut(false);
            circleSize.current = 150;
            transitionStartTime.current = null;
            fullScreenOverlayRef.current = false;
            setFullScreenOverlay(false);
          }
        }
      }"""
content = content.replace(old_fade_logic, new_fade_logic)

# 2. Prevent overlayRef from rendering for book theme
old_overlay_render = """      {fullScreenOverlay && (
        <div 
          ref={overlayRef}"""
new_overlay_render = """      {fullScreenOverlay && !(hoveredTheme === 'book' || isBookPage) && (
        <div 
          ref={overlayRef}"""
content = content.replace(old_overlay_render, new_overlay_render)

# 3. Prevent circleRef from unmounting during fullScreenOverlay for book theme
old_circle_render = """      {(!isPixelPage && !isBookPage || isTransitioning || isFadingOut) && !fullScreenOverlay && ("""
new_circle_render = """      {(!isPixelPage && !isBookPage || isTransitioning || isFadingOut) && (!fullScreenOverlay || hoveredTheme === 'book' || isBookPage) && ("""
content = content.replace(old_circle_render, new_circle_render)

with open('components/CustomCursor.tsx', 'w') as f:
    f.write(content)
