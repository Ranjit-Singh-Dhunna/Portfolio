import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Add zIndex: 30 to keyboard-container to prevent the book wrapper from blocking clicks
# The keyboard has:
#         animate={{ scale: 1.4 }}
#         whileDrag={{ scale: 1.45, zIndex: 50 }}
#         className="keyboard-container"
content = content.replace(
    'className="keyboard-container"',
    'className="keyboard-container"\n        style={{ zIndex: 30 }}'
)

# 2. Fix Row 3 span (Enter -> 2)
# gridColumn: key === "Enter" ? "span 3" : (key === "Caps" ? "span 2" : "span 1"),
content = content.replace(
    'key === "Enter" ? "span 3"',
    'key === "Enter" ? "span 2"'
)

# 3. Fix Row 4 span (Shift -> 2)
# gridColumn: key === "Shift" ? "span 3" : "span 1"
content = content.replace(
    'key === "Shift" ? "span 3"',
    'key === "Shift" ? "span 2"'
)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)

