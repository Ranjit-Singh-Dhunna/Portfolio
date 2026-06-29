import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# Fix Page 7 (Remove descriptions for ConUHacks X)
page7_html = """<h2 className="journal-header"><span style={{ color: '#7c2d12' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>CS Games 2026</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Mar 2026</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Won 1st place in Web Challenge, 2nd in AI, 3rd in CTF and represented Concordia University.</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>ConUHacks X Hackathon</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>Jan 2026</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>CyberSci Canada CTF</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Nov 2025</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Earned award from event sponsor Cineplex and represented Concordia University.</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>@hack 2025 CTF</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Mar 2025</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Ranked 6th in Quebec’s largest CTF, exceeding 36 hours while competing against over 600 participants.</p>
                        </div>
                      </div>
                    </div>"""

page7_pattern = re.compile(r'<h2 className="journal-header"><span style={{ color: \'#7c2d12\' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
content = page7_pattern.sub(page7_html, content)


# Fix Page 8 (Remove descriptions for all on Page 8)
page8_html = """<h2 className="journal-header" style={{ width: '100%' }}>
                    <span style={{ color: '#ea580c' }}>Competitions & Events</span>
                    <span className="journal-page-num">Page 8</span>
                  </h2>
                  <div className="journal-works" style={{ marginTop: '16px' }}>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>ConUHacks IX Hackathon</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>Feb 2025</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>AlgoTime Member</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>SCS Concordia • Sep 2024 - Present</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>Hack the Mountain</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>May 2026</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start' }}>
                      <div className="work-info">
                        <h4>MPC Hacks</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>May 2026</p>
                      </div>
                    </div>
                  </div>"""

page8_pattern = re.compile(r'<h2 className="journal-header" style={{ width: \'100%\' }}>\n                    <span style={{ color: \'#ea580c\' }}>End of Journal</span>\n                    <span className="journal-page-num">Page 8</span>\n                  </h2>\n                  <div style={{ flex: 1, display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                    <p style={{ fontFamily: \'Caveat, cursive\', fontSize: \'32px\', color: \'#6b7280\', transform: \'rotate\(-5deg\)\' }}>Thanks for reading!</p>\n                  </div>', re.DOTALL)
content = page8_pattern.sub(page8_html, content)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)
