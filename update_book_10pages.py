import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Add stamp state
if "const [stamps, setStamps]" not in content:
    content = re.sub(
        r'const \[hoverFlipRight, setHoverFlipRight\] = useState\(false\);',
        r'const [hoverFlipRight, setHoverFlipRight] = useState(false);\n  const [stamps, setStamps] = useState<{x: number, y: number, rotation: number}[]>([]);\n\n  const addStamp = (e: React.MouseEvent<HTMLDivElement>) => {\n    const rect = e.currentTarget.getBoundingClientRect();\n    const x = e.clientX - rect.left;\n    const y = e.clientY - rect.top;\n    const rotation = Math.random() * 360;\n    setStamps([...stamps, { x, y, rotation }]);\n  };',
        content
    )

# 2. Hotzones update
content = re.sub(r'\{currentSpread < 4 && bookOpen && \(', r'{currentSpread < 5 && bookOpen && (', content)
# Left hotzone is already {currentSpread > 1 && bookOpen && ( which covers 5.

# 3. Update Page 7 header color
content = re.sub(
    r'<h2 className="journal-header"><span style={{ color: \'#7c2d12\' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>',
    r'<h2 className="journal-header"><span style={{ color: \'#c2410c\' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>',
    content
)

# 4. We need to extract Page 8 from Base Right, and replace Base Right with Page 10.
# We also need to add Layer 4 between Layer 3 and Base Right.
# Let's locate the Base Right section.

base_right_pattern = re.compile(
    r'\{/\* ── RIGHT PAGE: Base Right - PAGE 8 ── \*/\}(.*?)</motion\.div>\s*</div>\s*</div>\s*</main>',
    re.DOTALL
)

# Wait, the closing tags are for <motion.div> (book cover right?), <div className="open-book-wrapper">, <div className="perspective-container">, <main>
# Let's be careful about how the file ends.
# I will just write a python script that searches for "RIGHT PAGE: Base Right - PAGE 8" and replaces the rest of the relevant part.
