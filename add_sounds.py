import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Add playSound function
if "const playSound" not in content:
    hook_str = "const [hoverFlipLeft, setHoverFlipLeft] = useState(false);"
    new_hook = """const [hoverFlipLeft, setHoverFlipLeft] = useState(false);

  const playSound = (fileName: string) => {
    try {
      const audio = new Audio(`/${fileName}`);
      audio.play();
    } catch (e) {
      console.error('Failed to play sound:', e);
    }
  };"""
    content = content.replace(hook_str, new_hook)

# 2. addStamp
content = content.replace(
    "const addStamp = (e: React.MouseEvent<HTMLDivElement>) => {",
    "const addStamp = (e: React.MouseEvent<HTMLDivElement>) => {\n    playSound('freesound_community-stamp-102627.mp3');"
)

# 3. Page flips
# Right hotzone
content = content.replace(
    "setCurrentSpread(currentSpread + 1);",
    "playSound('freesound_community-one-page-book-flip-101928.mp3');\n                      setCurrentSpread(currentSpread + 1);"
)

# Left hotzone (spread > 1)
content = content.replace(
    "setCurrentSpread(currentSpread - 1);",
    "playSound('freesound_community-one-page-book-flip-101928.mp3');\n                      setCurrentSpread(currentSpread - 1);"
)
# Left hotzone (closing book)
content = content.replace(
    "setBookOpen(false);",
    "playSound('freesound_community-one-page-book-flip-101928.mp3');\n                      setBookOpen(false);"
)

# Cover open
content = content.replace(
    "onClick={() => setBookOpen(true)}",
    "onClick={() => { playSound('freesound_community-one-page-book-flip-101928.mp3'); setBookOpen(true); }}"
)

# 4. Lamp
content = content.replace(
    "onTap={() => setLampOn(!lampOn)}",
    "onTap={() => { playSound('milanwulf-foot-switch-166326.mp3'); setLampOn(!lampOn); }}"
)

# 5. Keyboard
content = content.replace(
    "const handleKeyClick = (keyId: string) => {",
    "const handleKeyClick = (keyId: string) => {\n    playSound('lightningbulb-spacebar-click-keyboard-199448.mp3');"
)

# 6. Camera
content = content.replace(
    "setCameraState('flashing');",
    "playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');\n          setCameraState('flashing');"
)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)

