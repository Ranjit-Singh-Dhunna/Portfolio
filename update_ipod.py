import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Add state variables and musicList
music_list = """  const musicList = [
    { title: 'lofi', artist: 'VibeDepot', src: '/VibeDepot - lofi for vlog.mp3' },
    { title: 'Instrumental', artist: 'JBlanked_Bastardboy Production', src: '/JBlanked_Bastardboy Production - Herbal.mp3' },
    { title: 'pop', artist: 'Simon Mathewson', src: '/Simon Mathewson - Falling For You.mp3' },
    { title: 'classical', artist: 'Megatone', src: '/Megatone - Black and White 02.mp3' },
    { title: 'Vibe', artist: 'VibeDepot', src: '/VibeDepot - fashion.mp3' }
  ];
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [musicMenuIndex, setMusicMenuIndex] = useState(0);
  
  // Handle auto-play on track change
  useEffect(() => {
    if (audioRef.current && isPlayingMusic) {
      audioRef.current.play().catch(e => console.log(e));
    }
  }, [currentMusicIndex]);
"""
# insert near ipodScreen state
content = re.sub(
    r"(const \[ipodScreen, setIpodScreen\] = useState<[^>]+>\('menu'\);)",
    r"const [ipodScreen, setIpodScreen] = useState<'menu' | 'now-playing' | 'about' | 'stack' | 'projects' | 'contact' | 'music-list'>('menu');\n" + music_list,
    content
)

# 2. Update ipodMenuItems
content = content.replace(
    'const ipodMenuItems = ["Play Lo-Fi", "About Ranjit", "Core Stack", "Projects", "Contact"];',
    'const ipodMenuItems = ["Music", "About Ranjit", "Core Stack", "Projects", "Contact"];'
)

# 3. Update audio element
old_audio = """      {/* Hidden Audio Player for iPod Lo-Fi Theme */}
      <audio 
        ref={audioRef} 
        src="/Blue%20Dot%20Sessions%20-%20Winter%20Theme.mp3" 
        loop 
        playsInline
      />"""
new_audio = """      {/* Hidden Audio Player for iPod Music */}
      <audio 
        ref={audioRef} 
        src={musicList[currentMusicIndex].src} 
        onEnded={() => {
          setCurrentMusicIndex(m => (m + 1) % musicList.length);
        }}
        playsInline
      />"""
content = content.replace(old_audio, new_audio)

# 4. Update ipod content rendering (music-list and now-playing)
old_np = """            {ipodScreen === 'now-playing' && (
              <div className="ipod-nowplaying">
                <div className="ipod-np-title">Lo-Fi: Winter Theme</div>
                <div className="ipod-np-artist">Blue Dot Sessions</div>"""
new_np = """            {ipodScreen === 'music-list' && (
              <div className="ipod-menu-list">
                {musicList.map((track, idx) => (
                  <div 
                    key={idx} 
                    className={`ipod-menu-item ${musicMenuIndex === idx ? 'selected' : ''}`}
                  >
                    {track.title}
                  </div>
                ))}
              </div>
            )}

            {ipodScreen === 'now-playing' && (
              <div className="ipod-nowplaying">
                <div className="ipod-np-title">{musicList[currentMusicIndex].title}</div>
                <div className="ipod-np-artist">{musicList[currentMusicIndex].artist}</div>"""
content = content.replace(old_np, new_np)

# 5. Update Center Button
center_btn_old = """          {/* Center Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                if (ipodMenu === 0) {
                  setIpodScreen('now-playing');
                  if (!isPlayingMusic) handleMusicToggle();
                } else if (ipodMenu === 1) {"""
center_btn_new = """          {/* Center Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                if (ipodMenu === 0) {
                  setIpodScreen('music-list');
                } else if (ipodMenu === 1) {"""
content = content.replace(center_btn_old, center_btn_new)

# Handle back logic for Center Button
back_logic_old = """              } else {
                setIpodScreen('menu');
              }
            }}
            className="ipod-wheel-btn ipod-wheel-center"
          />"""
back_logic_new = """              } else if (ipodScreen === 'music-list') {
                setCurrentMusicIndex(musicMenuIndex);
                setIpodScreen('now-playing');
                if (!isPlayingMusic) {
                  setIsPlayingMusic(true);
                  if (audioRef.current) audioRef.current.play().catch(e=>console.log(e));
                }
              } else if (ipodScreen === 'now-playing') {
                setIpodScreen('music-list');
              } else {
                setIpodScreen('menu');
              }
            }}
            className="ipod-wheel-btn ipod-wheel-center"
          />"""
content = content.replace(back_logic_old, back_logic_new)

# 6. Update NEXT button
next_old = """            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                setIpodMenu(m => (m + 1) % ipodMenuItems.length);
              }
            }}
            className="ipod-wheel-btn ipod-wheel-next\""""
next_new = """            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                setIpodMenu(m => (m + 1) % ipodMenuItems.length);
              } else if (ipodScreen === 'music-list') {
                setMusicMenuIndex(m => (m + 1) % musicList.length);
              } else if (ipodScreen === 'now-playing') {
                setCurrentMusicIndex(m => (m + 1) % musicList.length);
              }
            }}
            className="ipod-wheel-btn ipod-wheel-next\""""
content = content.replace(next_old, next_new)

# 7. Update PREV button
prev_old = """            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                setIpodMenu(m => (m - 1 + ipodMenuItems.length) % ipodMenuItems.length);
              }
            }}
            className="ipod-wheel-btn ipod-wheel-prev\""""
prev_new = """            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                setIpodMenu(m => (m - 1 + ipodMenuItems.length) % ipodMenuItems.length);
              } else if (ipodScreen === 'music-list') {
                setMusicMenuIndex(m => (m - 1 + musicList.length) % musicList.length);
              } else if (ipodScreen === 'now-playing') {
                setCurrentMusicIndex(m => (m - 1 + musicList.length) % musicList.length);
              }
            }}
            className="ipod-wheel-btn ipod-wheel-prev\""""
content = content.replace(prev_old, prev_new)

# 8. Update PLAY button behavior (should go to now-playing if playing, or toggle)
play_old = """            onClick={(e) => {
              e.stopPropagation();
              handleMusicToggle();
              if (ipodScreen === 'menu' && ipodMenu === 0) {
                setIpodScreen('now-playing');
              }
            }}
            className="ipod-wheel-btn ipod-wheel-play\""""
play_new = """            onClick={(e) => {
              e.stopPropagation();
              handleMusicToggle();
              if (ipodScreen === 'menu' && ipodMenu === 0) {
                setIpodScreen('music-list');
              } else if (ipodScreen === 'music-list') {
                setCurrentMusicIndex(musicMenuIndex);
                setIpodScreen('now-playing');
              }
            }}
            className="ipod-wheel-btn ipod-wheel-play\""""
content = content.replace(play_old, play_new)

# 9. Update MENU button behavior
menu_old = """            onClick={(e) => {
              e.stopPropagation();
              setIpodScreen('menu');
            }}
            className="ipod-wheel-btn ipod-wheel-menu\""""
menu_new = """            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'now-playing') {
                setIpodScreen('music-list');
              } else {
                setIpodScreen('menu');
              }
            }}
            className="ipod-wheel-btn ipod-wheel-menu\""""
content = content.replace(menu_old, menu_new)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)

