import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# Instead of relying on exact HTML, we'll use regex to isolate the <div className="journal-works"> blocks for Pages 4, 5, 6, 7

projects = [
    ("Predicting Customer Churn", "Python • scikit-learn • pandas • seaborn"),
    ("Skin Lesion CNN Classifier", "PyTorch • ResNet-18 • VGG-16"),
    ("Health Companion App", "Figma • UI/UX • Accessibility"),
    ("FLUX: Collaborative Scheduling", "React • TypeScript • Supabase"),
    ("MediVault", "OpenRouter • MongoDB • ElevenLabs"),
    ("Events & Ticketing App", "React • TypeScript • PostgreSQL"),
    ("INTERBU: AI Interview Coach", "React • Flask • Whisper"),
    ("DRIP GENIUS", "Roboflow • K-means • CV"),
    ("Code Buddy", "React • Vite • Node.js • Express"),
    ("Universal Resume Parser", "Python • Ollama LLM • LangChain"),
    ("Hospital DBMS", "PostgreSQL • MongoDB"),
    ("Click2Bill", "Google Sheets • Apps Script"),
    ("Scénix", "React • MediaPipe • Gemini 2.5"),
    ("CANHEALTH", "FastAPI • React • Gemini • ElevenLabs")
]

def render_project(title, tech, is_last=False):
    margin = "" if is_last else ", marginBottom: '8px'"
    return f"""<div className="work-item" style={{{{ alignItems: 'flex-start'{margin} }}}}>
                        <div className="work-info">
                          <h4>{title}</h4>
                          <p style={{{{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}}}>{tech}</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{{{color: '#6b7280'}}}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>"""

def render_projects(start, end):
    return "\\n                      ".join(
        render_project(projects[i][0], projects[i][1], is_last=(i == end-1))
        for i in range(start, end)
    )

page4_html = render_projects(0, 5)   # 5 projects
page5_html = render_projects(5, 10)  # 5 projects
page6_html = render_projects(10, 14) # 4 projects

# We can search for the start of each Featured Works block using the Page X span
def replace_journal_works(page_num, new_inner):
    global content
    # Find the page marker
    pattern = re.compile(rf'<span className="journal-page-num">Page {page_num}</span></h2>\s*<div className="journal-works">(.*?)</div>\s*</div>\s*</div>', re.DOTALL)
    
    match = pattern.search(content)
    if match:
        old_inner = match.group(1)
        content = content[:match.start(1)] + '\\n                      ' + new_inner + '\\n                    ' + content[match.end(1):]
    else:
        print(f"Could not find Page {page_num} block")

replace_journal_works(4, page4_html)
replace_journal_works(5, page5_html)
replace_journal_works(6, page6_html)

# For page 7, we want to replace the whole <div className="journal-works"> block with our custom block
page7_pattern = re.compile(r'(<h2 className="journal-header"><span style={{ color: \'(.*?)\' }}>Featured Works</span><span className="journal-page-num">Page 7</span></h2>).*?(</div>\s*</div>\s*</div>)', re.DOTALL)
page7_new = r'\1\n                    <div style={{ flex: 1, display: \'flex\', flexDirection: \'column\', alignItems: \'center\', justifyContent: \'center\' }}>\n                      <p style={{ fontFamily: \'Caveat, cursive\', fontSize: \'24px\', color: \'#6b7280\', textAlign: \'center\' }}>And many more<br/>in the works...</p>\n                    </div>\n                  \3'

content = page7_pattern.sub(page7_new, content)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)
