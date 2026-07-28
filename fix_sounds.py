import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Lamp
# The lamp onTap is:
#         onTap={(e) => {
#           setLampOn(!lampOn);
#         }}
lamp_pattern = r'onTap=\{\(e\) => \{\s*setLampOn\(!lampOn\);\s*\}\}'
new_lamp = "onTap={(e) => { playSound('milanwulf-foot-switch-166326.mp3'); setLampOn(!lampOn); }}"
content = re.sub(lamp_pattern, new_lamp, content)

# 2. Keyboard
# Find className="keyboard-key" and add onPointerDown
content = content.replace(
    'className="keyboard-key"',
    'className="keyboard-key" onPointerDown={() => playSound(\'lightningbulb-spacebar-click-keyboard-199448.mp3\')}'
)

# 3. Camera
# We want to move playSound before the setTimeout for flashing.
# Current code:
#         // Brief delay for webcam to adjust light
#         setTimeout(() => {
#           playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');
#           setCameraState('flashing');
camera_pattern1 = r"// Brief delay for webcam to adjust light\s*setTimeout\(\(\) => \{\s*playSound\('freesound_community-camera-shutter-and-flash-combined-6827\.mp3'\);\s*setCameraState\('flashing'\);"
new_camera1 = """// Flash sound slightly early to align with flash animation
        playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');
        // Brief delay for webcam to adjust light
        setTimeout(() => {
          setCameraState('flashing');"""
content = re.sub(camera_pattern1, new_camera1, content)

# Current fallback code:
#         playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');
#         setCameraState('flashing');
#         setTimeout(() => {
#           setCameraState('finished');
camera_pattern2 = r"playSound\('freesound_community-camera-shutter-and-flash-combined-6827\.mp3'\);\s*setCameraState\('flashing'\);\s*setTimeout\(\(\) => \{\s*setCameraState\('finished'\);"
new_camera2 = """playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');
        setTimeout(() => {
          setCameraState('flashing');
          setTimeout(() => {
            setCameraState('finished');"""
content = re.sub(camera_pattern2, new_camera2, content)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)

