import re

# 1. Update app/book/page.tsx
with open('app/book/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('"♫ Play Lo-Fi Music"', '"♫ Play Music"')

with open('app/book/page.tsx', 'w') as f:
    f.write(content)

# 2. Update app/page.tsx
with open('app/page.tsx', 'r') as f:
    content = f.read()

handle_book = """  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('pixel-transition-start'));
    setTimeout(() => {
      router.push('/book');
    }, 1200);
  };
"""

content = re.sub(r"(const handlePixelClick = [^}]+};\n)", r"\1\n" + handle_book, content)

content = content.replace(
    '<Link href="/book" className="theme-btn style-btn" data-theme="book"',
    '<Link href="/book" onClick={handleBookClick} className="theme-btn style-btn" data-theme="book"'
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

# 3. Update components/CustomCursor.tsx
with open('components/CustomCursor.tsx', 'r') as f:
    content = f.read()

# isBookPage is defined at the bottom, move it up or redefine it
# actually it's defined at line 382: const isPixelPage = pathname.startsWith('/pixel'); const isBookPage = pathname.startsWith('/book');
# Wait, they are used in the render function.

# Change circle condition
content = content.replace(
    "if (hoveredThemeRef.current === 'pixel' || isTransitioningRef.current) {",
    "if (hoveredThemeRef.current === 'pixel' || hoveredThemeRef.current === 'book' || isTransitioningRef.current) {"
)

# Change background image of circle
old_bg = "backgroundColor: (hoveredTheme === 'pixel' || isTransitioning || isFadingOut) ? 'transparent' : 'rgba(255, 255, 255, 0.03)',\n            backgroundImage: (hoveredTheme === 'pixel' || isTransitioning || isFadingOut) ? 'linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(/px1.png)' : 'none',"
new_bg = "backgroundColor: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'transparent' : 'rgba(255, 255, 255, 0.03)',\n            backgroundImage: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(${(hoveredTheme === 'book' || isBookPage) ? '/gibli.png' : '/px1.png'})` : 'none',"
content = content.replace(old_bg, new_bg)

# Change overlay background image
old_overlay_bg = "backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(/px1.png)',"
new_overlay_bg = "backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(${(hoveredTheme === 'book' || isBookPage) ? '/gibli.png' : '/px1.png'})`,"
content = content.replace(old_overlay_bg, new_overlay_bg)

# backdrop filter
old_backdrop = "backdropFilter: (hoveredTheme === 'pixel' || isTransitioning || isFadingOut) ? 'none' : 'blur(2px)',"
new_backdrop = "backdropFilter: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'none' : 'blur(2px)',"
content = content.replace(old_backdrop, new_backdrop)

# Change fade out condition
content = content.replace(
    "if (pathname.startsWith('/pixel') && isTransitioningRef.current) {",
    "if ((pathname.startsWith('/pixel') || pathname.startsWith('/book')) && isTransitioningRef.current) {"
)
content = content.replace(
    "if (pathname.startsWith('/pixel') && !oldPath.startsWith('/pixel')) {",
    "if ((pathname.startsWith('/pixel') || pathname.startsWith('/book')) && !(oldPath.startsWith('/pixel') || oldPath.startsWith('/book'))) {"
)
content = content.replace(
    "if (pathname.startsWith('/pixel')) {",
    "if (pathname.startsWith('/pixel') || pathname.startsWith('/book')) {"
)
content = content.replace(
    "if (pathnameRef.current.startsWith('/pixel')) {",
    "if (pathnameRef.current.startsWith('/pixel') || pathnameRef.current.startsWith('/book')) {"
)
content = content.replace(
    "if (cursorRef.current && !pathnameRef.current.startsWith('/pixel')) {",
    "if (cursorRef.current && !pathnameRef.current.startsWith('/pixel') && !pathnameRef.current.startsWith('/book')) {"
)

with open('components/CustomCursor.tsx', 'w') as f:
    f.write(content)

