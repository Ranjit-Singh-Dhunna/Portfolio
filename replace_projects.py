import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# We need to construct the HTML for Page 4 (5 projects)
page4_projects = """<div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Predicting Customer Churn</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Python • scikit-learn • pandas • seaborn</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Skin Lesion CNN Classifier</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>PyTorch • ResNet-18 • VGG-16</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Health Companion App</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Figma • UI/UX • Accessibility</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>FLUX: Collaborative Scheduling</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • TypeScript • Supabase</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>MediVault</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>OpenRouter • MongoDB • ElevenLabs</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>"""

page5_projects = """<div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Events & Ticketing App</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • TypeScript • PostgreSQL</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>INTERBU: AI Interview Coach</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • Flask • Whisper</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>DRIP GENIUS</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Roboflow • K-means • CV</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Code Buddy</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • Vite • Node.js • Express</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>Universal Resume Parser</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Python • Ollama LLM • LangChain</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>"""

page6_projects = """<div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Hospital DBMS</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>PostgreSQL • MongoDB</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Click2Bill</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Google Sheets • Apps Script</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Scénix</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • MediaPipe • Gemini 2.5</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>CANHEALTH</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>FastAPI • React • Gemini • ElevenLabs</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>"""

page7_content = """<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: '#6b7280', textAlign: 'center' }}>And many more<br/>in the works...</p>
                  </div>"""

# Find Page 4 journal-works and replace
def replace_between(content, marker1, marker2, new_content):
    idx1 = content.find(marker1)
    if idx1 == -1: return content
    idx2 = content.find(marker2, idx1)
    if idx2 == -1: return content
    return content[:idx1 + len(marker1)] + '\\n' + new_content + '\\n                    ' + content[idx2:]

# We can replace by finding the headers:
# Page 4
content = replace_between(content, '<h2 className="journal-header"><span style={{ color: \\'#9f1239\\' }}>Featured Works</span><span className="journal-page-num">Page 4</span></h2>\\n                    <div className="journal-works">', '</div>\\n                  </div>\\n                </div>\\n                {/* BACK FACE (Page 5) */}', page4_projects)

# Page 5
content = replace_between(content, '<h2 className="journal-header"><span style={{ color: \\'#9f1239\\' }}>Featured Works</span><span className="journal-page-num">Page 5</span></h2>\\n                    <div className="journal-works">', '</div>\\n                  </div>\\n                </div>\\n              </motion.div>', page5_projects)

# Page 6
content = replace_between(content, '<h2 className="journal-header"><span style={{ color: \\'#9f1239\\' }}>Featured Works</span><span className="journal-page-num">Page 6</span></h2>\\n                    <div className="journal-works">', '</div>\\n                  </div>\\n                </div>\\n                {/* BACK FACE (Page 7) */}', page6_projects)

# Page 7 (Change title to something else or keep it, then add page7_content)
# Actually, let's replace the whole inner content of Page 7
marker1 = '<!-- START PAGE 7 REPLACE -->'
marker2 = '<!-- END PAGE 7 REPLACE -->'
# Instead of doing that, let's just do a regex replace for Page 7
page7_regex = r'(<h2 className="journal-header"><span style={{ color: \'(.*?)\' }}>Featured Works</span><span className="journal-page-num">Page 7</span></h2>).*?(</div>\s*</div>\s*</div>\s*</motion.div>)'
page7_new = r'\\1\n                    ' + page7_content + r'\n                  \\2'
content = re.sub(page7_regex, page7_new, content, flags=re.DOTALL)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)
"