import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# Generate Page 7 content
page7_html = """<h2 className="journal-header"><span style={{ color: '#7c2d12' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>
                    <div className="journal-works">
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
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>MPC Hacks</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>May 2026</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>CS Games 2026</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Mar 2026</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>1st in Web Challenge, 2nd in AI and 3rd in CTF</p>
                        </div>
                      </div>
                    </div>"""

# Replace Page 7
page7_pattern = re.compile(r'<h2 className="journal-header"><span style={{ color: \'#7c2d12\' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
content = page7_pattern.sub(page7_html + '\n                  </div>\n                </div>\n              </motion.div>', content)

# Generate Page 8 content
page8_html = """<div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h2 className="journal-header" style={{ width: '100%' }}>
                    <span style={{ color: '#7c2d12' }}>Competitions & Events</span>
                    <span className="journal-page-num">Page 8</span>
                  </h2>
                  <div className="journal-works">
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
                        <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Awarded by Cineplex</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="work-info">
                        <h4>@hack 2025 CTF</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Mar 2025</p>
                        <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Ranked 6th</p>
                      </div>
                    </div>
                    <div className="work-item" style={{ alignItems: 'flex-start' }}>
                      <div className="work-info">
                        <h4>ConUHacks IX Hackathon</h4>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>Feb 2025</p>
                      </div>
                    </div>
                  </div>"""

# Replace Page 8
page8_pattern = re.compile(r'<div className="journal-content" style={{ height: \'100%\', display: \'flex\', flexDirection: \'column\', alignItems: \'center\', justifyContent: \'center\' }}>.*?</div>\s*</div>\s*<div className="open-book-footer" style={{ width: \'100%\' }}>', re.DOTALL)
content = page8_pattern.sub(page8_html + '\n                  <div style={{ flex: 1 }} />\n                  <div className="open-book-footer" style={{ width: \'100%\' }}>', content)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)
