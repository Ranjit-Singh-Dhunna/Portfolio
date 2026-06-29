import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# Replace Featured Works color
content = content.replace("#9f1239", "#7c2d12") # Warm Deep Rust

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
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Jan 2026</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Participated in Quebec’s largest hackathon, exceeding 36 hours while competing against over 850 participants.</p>
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

# Find Page 7 block and replace it
page7_pattern = re.compile(r'<h2 className="journal-header"><span style={{ color: \'#[^\']+\' }}>Featured Works</span><span className="journal-page-num">Page 7</span></h2>\n                    <div style={{ flex: 1, display: \'flex\', flexDirection: \'column\', alignItems: \'center\', justifyContent: \'center\' }}>\n                      <p style={{ fontFamily: \'Caveat, cursive\', fontSize: \'24px\', color: \'#6b7280\', textAlign: \'center\' }}>And many more<br/>in the works\.\.\.</p>\n                    </div>', re.DOTALL)
content = page7_pattern.sub(page7_html, content)

page8_html = """<h2 className="journal-header" style={{ width: '100%' }}>
                    <span style={{ color: '#ea580c' }}>Competitions & Events</span>
                    <span className="journal-page-num">Page 8</span>
                  </h2>
                  <div className="journal-works" style={{ marginTop: '16px' }}>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>ConUHacks IX Hackathon</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Feb 2025</p>
                        <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Participated in Quebec’s largest hackathon, exceeding 24 hours while competing against over 800 participants.</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>AlgoTime Member</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>SCS Concordia • Sep 2024 - Present</p>
                        <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Actively participating in weekly competitive programming session, tackling LeetCode challenges.</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>Hack the Mountain</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>May 2026</p>
                        <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Participated in a hackathon hosted by Polytechnique Montréal and Université de Montréal.</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start' }}>
                      <div className="work-info">
                        <h4>MPC Hacks</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>May 2026</p>
                        <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Participated in a hackathon hosted by Polytechnique Montréal, Concordia University, and McGill University.</p>
                      </div>
                    </div>
                  </div>"""

page8_pattern = re.compile(r'<h2 className="journal-header" style={{ width: \'100%\' }}>\n                    <span style={{ color: \'#ea580c\' }}>End of Journal</span>\n                    <span className="journal-page-num">Page 8</span>\n                  </h2>\n                  <div style={{ flex: 1, display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                    <div className="book-end-mark" />\n                  </div>', re.DOTALL)
content = page8_pattern.sub(page8_html, content)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)
