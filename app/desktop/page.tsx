"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'shadow-intensity'?: string;
        autoplay?: boolean | string;
        'animation-name'?: string;
        'camera-orbit'?: string;
        'disable-zoom'?: boolean | string;
        'interaction-prompt'?: string;
        ar?: boolean | string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

export default function DesktopThemePage() {
  const [stage, setStage] = useState<number>(1);
  const [narrationIndex, setNarrationIndex] = useState<number>(0);
  
  // Window states matching layout coordinates
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    terminal: { isOpen: false, isMinimized: false, isMaximized: false, x: 100, y: 150, w: 580, h: 380, zIndex: 10 },
    browser: { isOpen: false, isMinimized: false, isMaximized: false, x: 533, y: 35, w: 810, h: 627, zIndex: 11 },
    instagram: { isOpen: false, isMinimized: false, isMaximized: false, x: 564, y: 26, w: 847, h: 825, zIndex: 12 },
    editor: { isOpen: false, isMinimized: false, isMaximized: false, x: 530, y: 520, w: 680, h: 420, zIndex: 9 },
    resume: { isOpen: false, isMinimized: false, isMaximized: false, x: 160, y: 80, w: 640, h: 500, zIndex: 8 },
    anydesk: { isOpen: false, isMinimized: false, isMaximized: false, x: 250, y: 220, w: 420, h: 280, zIndex: 7 },
    intel: { isOpen: false, isMinimized: false, isMaximized: false, x: 280, y: 120, w: 380, h: 440, zIndex: 6 },
  });
  
  const [maxZIndex, setMaxZIndex] = useState<number>(15);
  const [activeWindow, setActiveWindow] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("dev");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [showToDoSection, setShowToDoSection] = useState<boolean>(false);
  
  // Terminal state
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "AnyDesk Remote OS Shell v2.4-stable initialized.",
    "Connected from: 198.51.100.42 (AnyDesk ID: 482-901-772)",
    "Type 'help' for a list of simulated tools.",
    "user@anydesk-remote:~$ "
  ]);
  const [terminalInput, setTerminalInput] = useState<string>("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  
  // Browser state
  const [activeBrowserTab, setActiveBrowserTab] = useState<string>("google");
  const [dorkSearchQuery, setDorkSearchQuery] = useState<string>("");
  const [dorkSearchSubmitted, setDorkSearchSubmitted] = useState<boolean>(false);
  const [emailExtracted, setEmailExtracted] = useState<boolean>(false);
  const [cookieInjected, setCookieInjected] = useState<boolean>(false);
  
  // Instagram App state
  const [instaUser, setInstaUser] = useState<string>("");
  const [instaPass, setInstaPass] = useState<string>("");
  const [instaLoggedIn, setInstaLoggedIn] = useState<boolean>(false);
  const [instaError, setInstaError] = useState<string>("");
  const [instaPostImgIndex, setInstaPostImgIndex] = useState<number>(0);
  const [instaPostLiked, setInstaPostLiked] = useState<boolean>(false);
  const [instaComments, setInstaComments] = useState<Array<{ user: string; text: string }>>([
    { user: "K_preet", text: "15 years with zero leaves? Bro's attendance aura is unmatched 🔥" },
    { user: "deep_ren101", text: "Bro was coding in QBasic, HTML, and CSS in 4th grade, then hopped on Java, Python, and JS by 6th grade. Peak dev grind." },
    { user: "mxn_shx", text: "Lowkey miss our LeetCode grind sessions from school, not gonna lie." }
  ]);
  const [newCommentInput, setNewCommentInput] = useState<string>("");
  const [selectedInstaPost, setSelectedInstaPost] = useState<boolean>(false);
  const [githubTab, setGithubTab] = useState<string>("repositories");
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  
  // Dragging state
  const [dragWindow, setDragWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper for sound alerts
  const playClick = () => {
    try {
      const audio = new Audio("/Blip93.wav");
      audio.volume = 0.15;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const playAlert = () => {
    try {
      const audio = new Audio("/freesound_community-camera-shutter-and-flash-combined-6827.mp3");
      audio.volume = 0.25;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const robotModelRef = useRef<any>(null);

  // Load model-viewer on client side
  useEffect(() => {
    import('@google/model-viewer').catch(() => {});
  }, []);

  // Ping-pong straight-reverse loop for 3D robot animation
  useEffect(() => {
    const mv = robotModelRef.current;
    if (!mv) return;

    let isReversed = false;

    const handleFinished = () => {
      isReversed = !isReversed;
      try {
        mv.timeScale = isReversed ? -1 : 1;
        requestAnimationFrame(() => {
          try {
            mv.play({ repetitions: 1 });
          } catch (e) {}
        });
      } catch (e) {}
    };

    const handleLoad = () => {
      try {
        mv.timeScale = 1;
        mv.play({ repetitions: 1 });
      } catch (e) {}
    };

    mv.addEventListener('finished', handleFinished);
    mv.addEventListener('load', handleLoad);

    if (mv.modelIsLoaded) {
      handleLoad();
    }

    return () => {
      if (mv) {
        mv.removeEventListener('finished', handleFinished);
        mv.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // Clock format to match mockup (e.g. Tue 10:32 PM)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      setCurrentDay(days[now.getDay()]);
      
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  const toggleFullScreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Window Focus Helper
  const focusWindow = (winKey: string) => {
    setActiveWindow(winKey);
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows(prev => ({
      ...prev,
      [winKey]: {
        ...prev[winKey],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    }));
  };

  // Open/Close helper
  const openWindow = (winKey: string) => {
    playClick();
    focusWindow(winKey);
  };

  const closeWindow = (winKey: string) => {
    playClick();
    setWindows(prev => ({
      ...prev,
      [winKey]: {
        ...prev[winKey],
        isOpen: false
      }
    }));
    if (activeWindow === winKey) {
      setActiveWindow("");
    }
  };

  const minimizeWindow = (winKey: string) => {
    playClick();
    setWindows(prev => ({
      ...prev,
      [winKey]: {
        ...prev[winKey],
        isMinimized: true
      }
    }));
  };

  const toggleMaximize = (winKey: string) => {
    playClick();
    setWindows(prev => ({
      ...prev,
      [winKey]: {
        ...prev[winKey],
        isMaximized: !prev[winKey].isMaximized
      }
    }));
  };

  // Dragging event handlers
  const startDrag = (winKey: string, e: React.MouseEvent) => {
    if (windows[winKey]?.isMaximized) return;
    focusWindow(winKey);
    setDragWindow(winKey);
    setDragOffset({
      x: e.clientX - windows[winKey].x,
      y: e.clientY - windows[winKey].y,
    });
    e.preventDefault();
  };

  const stopDrag = () => {
    setDragWindow(null);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!dragWindow || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    
    // Clamp inside desktop shell area
    newX = Math.max(0, Math.min(newX, rect.width - 200));
    newY = Math.max(0, Math.min(newY, rect.height - 100));

    setWindows(prev => ({
      ...prev,
      [dragWindow]: {
        ...prev[dragWindow],
        x: newX,
        y: newY
      }
    }));
  };

  // Resizing state & handlers
  const [resizeWindow, setResizeWindow] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const startResize = (winKey: string, e: React.MouseEvent) => {
    if (windows[winKey]?.isMaximized) return;
    focusWindow(winKey);
    setResizeWindow(winKey);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: windows[winKey].w,
      h: windows[winKey].h
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragWindow) {
      onDrag(e);
    }
    if (resizeWindow) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newW = Math.max(300, resizeStart.w + deltaX);
      const newH = Math.max(180, resizeStart.h + deltaY);

      setWindows(prev => ({
        ...prev,
        [resizeWindow]: {
          ...prev[resizeWindow],
          w: newW,
          h: newH
        }
      }));
    }
  };

  const handleMouseUp = () => {
    stopDrag();
    setResizeWindow(null);
  };

  // Simulated commands execution inside Terminal
  const runTerminalCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;
    
    playClick();
    let newLines = [...terminalLines, `user@anydesk-remote:~$ ${cmd}`];
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "help") {
      newLines.push(
        "Available commands:",
        "  osint-tool --email [EMAIL]   - Run platforms recon",
        "  holehe [EMAIL]                - Alias for email footprint scraper",
        "  volatility --dump clipboard  - Dump volatile memory clipboard block",
        "  haveibeenpwned --email [EM]  - Check deep web credential breaches",
        "  sqlite3 [DB_PATH] [QUERY]    - Query local SQLite database files",
        "  clear                        - Clear the screen"
      );
    } else if (lowerCmd === "clear") {
      newLines = ["user@anydesk-remote:~$ "];
    } else if (lowerCmd.startsWith("osint-tool --email") || lowerCmd.startsWith("holehe ")) {
      const match = cmd.match(/(?:--email\s+|holehe\s+)(\S+)/i);
      const email = match ? match[1] : "";
      
      if (email === "ranjit@dhunna.com") {
        newLines.push(
          "[*] Querying HoleHe footprint engine for ranjit@dhunna.com...",
          "[+] Platform Match found: GitHub (Username: Ranjit-Singh-Dhunna - Active)",
          "[+] Platform Match found: Instagram (Username: ranjit_dhunna - Private)",
          "[+] DarkWeb Dump leak detected: Coursera Breach Database (Status: Pwned)",
          "[+] Execution completed successfully."
        );
        if (stage === 1 && narrationIndex === 4) {
          setStage(2);
          setNarrationIndex(5);
        }
      } else {
        newLines.push(
          `[*] Querying HoleHe for: ${email || "unknown"}`,
          "[-] No match found in standard email OSINT indexes. Try checking target's primary email."
        );
      }
    } else if (lowerCmd.includes("volatility")) {
      if (lowerCmd.includes("clipboard")) {
        newLines.push(
          "[*] Loading Memory Dump: WIN10x64_SYSTEM_DUMP.raw",
          "[*] Searching memory spaces for process: clipboard-history.exe",
          "[+] Extracting volatile clipboard history buffer (100 logs)...",
          "----------------------------------------",
          "Index | Timestamp           | Data Content",
          "----------------------------------------",
          "097   | 2026-07-01 10:14:02 | Concordia University assignment draft docx",
          "098   | 2026-07-01 12:45:19 | https://github.com/Ranjit-Singh-Dhunna/Flux",
          "099   | 2026-07-01 14:09:42 | git commit -m 'added pixel aesthetics'",
          "100   | 2026-07-01 18:22:11 | Insta_Pass_2026!",
          "----------------------------------------",
          "[+] Volatility dump process complete."
        );
        if (stage === 2 && narrationIndex === 7) {
          setNarrationIndex(8);
        }
      } else {
        newLines.push(
          " volatility-cli v2.6",
          " Usage: volatility --dump [plugin]",
          " Available plugins: clipboard, processes, connections, registry"
        );
      }
    } else if (lowerCmd.includes("haveibeenpwned")) {
      newLines.push(
        "[*] Contacting HaveIBeenPwned API v3 endpoint (hibp-api.pwned.org)...",
        "[+] MATCH FOUND: Coursera Leaks Database (2026 Breach Dump)",
        "[+] Compromised Target Email: rs00dhunna@gmail.com",
        "[+] Raw JSON Breach Record & Credential Dump Retrieved:",
        JSON.stringify({
          breach_source: "Coursera.org Data Leak",
          breach_date: "2026-02-14",
          compromised_data: ["email", "hashed_passwords", "achievements", "verified_certifications"],
          certifications: [
            { title: "Technical Communication and Soft Skills for Engineers", instructor: "Alex Genadinik", issued: "2025-05", ver_hash: "hash_alex_genadinik_9921a" },
            { title: "Introduction to Technical Writing", instructor: "Dr. Katharina Grimm", issued: "2025-05", ver_hash: "hash_katharina_grimm_8812b" },
            { title: "Human Centred Artificial Intelligence", organization: "Deakin University", issued: "2025-06", ver_hash: "hash_deakin_ai_7731c" },
            { title: "Ethical Hacking in IoT and CyberSpace", organization: "UPES etalk", issued: "2025-04", ver_hash: "hash_upes_ethical_hacking_6614d" },
            { title: "Artificial Intelligence and its Marketing", organization: "UPES etalk", issued: "2025-04", ver_hash: "hash_upes_ai_marketing_5515e" }
          ]
        }, null, 2),
        "[+] Extracted 5 Verified Certifications from Breach Dump:",
        '    1. "Technical Communication and Soft Skills for Engineers" by Alex Genadinik',
        '    2. "Introduction to Technical Writing" by Dr. Katharina Grimm',
        '    3. "Human Centred Artificial Intelligence" by Deakin University',
        '    4. "Ethical Hacking in IoT and CyberSpace" by UPES etalk',
        '    5. "Artificial Intelligence and its Marketing" by UPES etalk',
        "[+] Dump finished successfully."
      );
      if (stage === 4 && narrationIndex === 13) {
        setNarrationIndex(14);
      }
    } else if (lowerCmd.startsWith("sqlite3")) {
      if (lowerCmd.includes("cookies") && lowerCmd.includes("ctf-portal.io")) {
        newLines.push(
          "host_key          | name       | value",
          "----------------------------------------------------------",
          ".ctf-portal.io    | session_id | ctf_session_59a2df308",
          "----------------------------------------------------------"
        );
        if (stage === 5 && narrationIndex === 16) {
          setNarrationIndex(17);
        }
      } else {
        newLines.push("Usage error: sqlite3 [file_path] \"[query]\"");
      }
    } else {
      newLines.push(`command not found: ${cmd}. Type 'help' for instructions.`);
    }

    newLines.push("user@anydesk-remote:~$ ");
    setTerminalLines(newLines);
    setTerminalInput("");
  };

  const getAutofillCommand = () => {
    if (stage === 1) {
      if (narrationIndex === 4) return "holehe ranjit@dhunna.com";
    }
    if (stage === 2) {
      if (narrationIndex === 7) return "volatility --dump clipboard";
    }
    if (stage === 4) {
      if (narrationIndex === 13) return "haveibeenpwned --email rs00dhunna@gmail.com";
    }
    if (stage === 5) {
      if (narrationIndex === 16) return `sqlite3 "C:\\Users\\Ranjit\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cookies" "SELECT host_key, name, value FROM cookies WHERE host_key LIKE '%ctf-portal.io%';"`;
    }
    return "";
  };

  const handleAutofillExecute = () => {
    const fill = getAutofillCommand();
    if (fill) {
      runTerminalCommand(fill);
    }
  };

  // Instagram login verification
  const handleInstagramLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (instaUser.toLowerCase() === "ranjit_dhunna" && instaPass === "Insta_Pass_2026!") {
      setInstaLoggedIn(true);
      setInstaError("");
      if (stage === 2 && narrationIndex === 9) {
        setNarrationIndex(10);
      }
    } else {
      setInstaError("Invalid credentials. Hint: Password is in Stage 2 clipboard logs.");
    }
  };

  // Google Search Action in Browser
  const handleDorkSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setDorkSearchSubmitted(true);
    if (stage === 1 && narrationIndex === 1) {
      setNarrationIndex(2);
    }
  };

  // Dialogue steps controlling narration state
  const narrationDialogueList = [
    // --- STAGE 1 ---
    {
      text: "ACCESS GRANTED! Remote connection successful. We have hijacked Ranjit's PC via AnyDesk (ID: 482-901-772). Let's gather OSINT reconnaissance on him.",
      btnText: "Start Recon",
      action: () => {}
    },
    {
      text: "First step: Open the Brave Browser from the Sidebar Dock and search site:linkedin.com \"Ranjit Singh Dhunna\" on Google to locate his professional profile.",
      btnText: "Open Browser",
      action: () => { openWindow("browser"); setActiveBrowserTab("google"); }
    },
    {
      text: "Nice search query. Click on his LinkedIn profile link in the search results to inspect his details.",
      btnText: "Open LinkedIn Link",
      action: () => { setActiveBrowserTab("linkedin"); }
    },
    {
      text: "Great! We extracted his email: ranjit@dhunna.com. Now open the Terminal from the Sidebar Dock to run a platform footprint scanner.",
      btnText: "Open Terminal",
      action: () => { openWindow("terminal"); }
    },
    {
      text: "Run HoleHe in the terminal to scraper associated platforms: holehe ranjit@dhunna.com",
      btnText: "Execute Scanner",
      action: () => { handleAutofillExecute(); }
    },
    // --- STAGE 2 ---
    {
      text: "HoleHe scanned successfully! Renders GitHub (Active), private Instagram (ranjit_dhunna), and a DarkWeb dump leak. Wait, he's running a Clipboard Sync utility active in memory. Let's dump volatile logs to search for synched credentials.",
      btnText: "Next Steps",
      action: () => {}
    },
    {
      text: "We will use Volatility to query memory structures. Select the terminal window.",
      btnText: "Focus Terminal",
      action: () => { openWindow("terminal"); }
    },
    {
      text: "Run the Volatility clipboard dumper plugin in terminal: volatility --dump clipboard",
      btnText: "Run Dump Command",
      action: () => { handleAutofillExecute(); }
    },
    {
      text: "Look at index 100 in the dumped history buffer! It contains a string that looks like a password: 'Insta_Pass_2026!'. Let's exploit this. Open the simulated Instagram app from the Sidebar Dock.",
      btnText: "Open Instagram App",
      action: () => { openWindow("instagram"); }
    },
    {
      text: "Log in to Instagram using account: ranjit_dhunna and password: Insta_Pass_2026!",
      btnText: "Verify Credentials",
      action: () => {}
    },
    {
      text: "Authenticated successfully! His Instagram posts give us a personal introduction: he represents Concordia University, lives in Montreal, and codes fullstack systems. Perfect. Let's inspect code next.",
      btnText: "Next Stage",
      action: () => { setStage(3); setNarrationIndex(11); }
    },
    // --- STAGE 3 ---
    {
      text: "We found his GitHub name from Stage 1 recon ('Ranjit-Singh-Dhunna'). Let's view his public code repositories to examine his projects. Open Brave Browser (or focus it) and navigate to the GitHub tab.",
      btnText: "Inspect GitHub",
      action: () => { openWindow("browser"); setActiveBrowserTab("github"); }
    },
    {
      text: "Amazing projects listed! Machine learning skin classifiers, churn predictors, full-stack ticketing engines. Let's query the leaked breach logs next.",
      btnText: "Next Stage",
      action: () => { setStage(4); setNarrationIndex(13); }
    },
    // --- STAGE 4 ---
    {
      text: "Assistant: Based on the Coursera data breach, target's data was floating on the deep web. Let's install and run HaveIBeenPwned API in the terminal to inspect all extracted certificates.",
      btnText: "Open Terminal",
      action: () => { openWindow("terminal"); }
    },
    {
      text: "Run the HaveIBeenPwned leak search tool in the terminal: haveibeenpwned --email rs00dhunna@gmail.com",
      btnText: "Run HaveIBeenPwned",
      action: () => { 
        openWindow("terminal");
        handleAutofillExecute(); 
      }
    },
    {
      text: "We dumped a raw JSON block! It contains all his Coursera breach credentials and verified certificates: 'Technical Communication and Soft Skills for Engineers', 'Introduction to Technical Writing', 'Human Centred Artificial Intelligence', 'Ethical Hacking in IoT and CyberSpace', and 'Artificial Intelligence and its Marketing'.",
      btnText: "Next Stage",
      action: () => { setStage(5); setNarrationIndex(15); }
    },
    // --- STAGE 5 ---
    {
      text: "In the browser, he has a session active for 'CTF Portal', but it is locked. Chrome stores active session keys in a local SQLite database. We can query it to steal the token.",
      btnText: "Open Terminal",
      action: () => { openWindow("terminal"); }
    },
    {
      text: "Execute the sqlite3 cookie db scraper query in the terminal to dump ctf-portal session cookies.",
      btnText: "Steal Session Cookie",
      action: () => { handleAutofillExecute(); }
    },
    {
      text: "Token retrieved: ctf_session_59a2df308. Go to the Brave browser, select the CTF Portal tab, and click 'Inject Session Cookie' to authenticate on his behalf.",
      btnText: "Open Browser Tab",
      action: () => { openWindow("browser"); setActiveBrowserTab("ctf"); }
    },
    {
      text: "Authenticated! The session is bypassed. Now click the Achievements API endpoint link to extract his CTF records in raw JSON format.",
      btnText: "Query API Tab",
      action: () => {}
    },
    {
      text: "Awesome! The endpoint output confirms his CTF wins (1st Place @hack 2025 CTF). All data collected! Click 'Compile Dossier Resume' in my window to view the full profile.",
      btnText: "Compile Intelligence Resume",
      action: () => { 
        openWindow("resume"); 
        setStage(6);
        setNarrationIndex(20);
      }
    },
    // --- STAGE 6 (COMPILE RESUME & ALERT WARNING) ---
    {
      text: "The full dossier has been compiled. Wait... red flashing alarms! Remote interrupt detected! The user is logging back in!",
      btnText: "Alert!",
      action: () => {
        playAlert();
        setTimeout(() => {
          setNarrationIndex(21);
        }, 1500);
      }
    },
    {
      text: "AnyDesk session terminated by target. Connection lost. However, he left a file Note.txt open on the desktop! Let's check what it is.",
      btnText: "Open Note.txt",
      action: () => { openWindow("editor"); setNarrationIndex(22); }
    },
    {
      text: "The hacking simulation is complete! Ranjit was aware of our intrusion. You can connect with him on LinkedIn or email. Click 'Exit Remote Terminal' in the sidebar or menu to return home.",
      btnText: "Exit AnyDesk Session",
      action: () => {}
    }
  ];

  const handleNextNarration = () => {
    const currentNarration = narrationDialogueList[narrationIndex];
    if (currentNarration.action) {
      currentNarration.action();
    }
    if (narrationIndex < narrationDialogueList.length - 1) {
      setNarrationIndex(prev => prev + 1);
    }
  };

  const handlePrevNarration = () => {
    if (narrationIndex > 0) {
      setNarrationIndex(prev => prev - 1);
    }
  };

  // Helper to render sidebar dock app launchers
  const renderDockApp = (winKey: string, icon: React.ReactNode, title: string) => {
    const isOpen = windows[winKey]?.isOpen;
    const isActive = activeWindow === winKey && isOpen && !windows[winKey]?.isMinimized;
    
    return (
      <div key={winKey} className="desk-sidebar-btn-wrapper">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) {
              if (windows[winKey].isMinimized) {
                focusWindow(winKey);
              } else if (activeWindow === winKey) {
                minimizeWindow(winKey);
              } else {
                focusWindow(winKey);
              }
            } else {
              openWindow(winKey);
            }
          }}
          className={`desk-sidebar-btn ${isActive ? "active" : ""} ${isOpen ? "is-open" : ""}`} 
          title={title}
        >
          {isActive && <div className="desk-sidebar-active-indicator" />}
          <div className="desk-sidebar-icon-container">
            {icon}
          </div>
          {isOpen && !isActive && <div className="desk-sidebar-open-dot" />}
        </button>
      </div>
    );
  };

  return (
    <div className="desk-shell" ref={containerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Embedded CSS stylesheet for full layouts and disabling custom cursor */}
      <style>{`
        *, *::before, *::after, html, body {
          cursor: default !important;
        }

        .desk-shell {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          background-image: url("/walpaper.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #070b19;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #ffffff;
          box-sizing: border-box;
        }

        /* Status bar overlay spanning 100% width of screen, with z-index less than sidebar and drawer */
        .desk-status-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 24px;
          background: rgba(10, 10, 10, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0 16px;
          box-sizing: border-box;
          z-index: 80; /* z-axis less than desk-sidebar-dock (100) and desk-app-drawer (90) */
          font-size: 11px;
          color: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Spans the full height of the shell (100vh) to align elements to the top border */
        .desk-main-body {
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        /* Right container for desktop views */
        .desk-right-container {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        /* Horizontal Cylindrical Floating Glassmorphic Bottom Dock */
        .desk-sidebar-dock {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          height: 68px;
          width: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: rgba(10, 14, 26, 0.45);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          border-radius: 40px; /* Long horizontal cylindrical capsule curvature */
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(6, 182, 212, 0.12);
          z-index: 100;
          box-sizing: border-box;
          padding: 0 24px;
          gap: 24px;
          overflow-x: auto;
          overflow-y: hidden;
        }

        .desk-sidebar-dock::-webkit-scrollbar {
          display: none;
        }
        .desk-sidebar-dock {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .desk-sidebar-btn-wrapper {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .desk-sidebar-btn {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          outline: none;
          padding: 0;
        }

        .desk-sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px) scale(1.04);
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .desk-sidebar-btn.active {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(30, 41, 59, 0.8));
          border: 1.5px solid rgba(34, 211, 238, 0.6);
          color: #22d3ee;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.35), inset 0 0 10px rgba(6, 182, 212, 0.2);
          transform: translateY(-1px);
        }

        .desk-sidebar-active-indicator {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 3.5px;
          background: #22d3ee;
          border-radius: 4px 4px 0 0;
          box-shadow: 0 0 10px #22d3ee, 0 0 20px #22d3ee;
        }

        .desk-sidebar-open-dot {
          position: absolute;
          bottom: -6px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #22d3ee;
          box-shadow: 0 0 6px #22d3ee;
        }

        .desk-sidebar-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 0;
          box-sizing: border-box;
        }

        .desk-sidebar-icon-container svg {
          width: 100%;
          height: 100%;
        }

        .desk-drawer-title {
          font-size: 18px;
          font-weight: 400;
          color: #ffffff;
          margin: 4px 0 8px 0;
          letter-spacing: 0.5px;
        }

        /* App list: stack format centered label underneath icon */
        .desk-drawer-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
          padding-bottom: 20px;
          align-items: center;
        }

        .desk-app-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          gap: 8px; /* Spacing between icon and label */
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
          padding: 8px;
          border-radius: 10px;
          text-align: center;
        }
        .desk-app-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
          color: #ffffff;
        }

        .desk-app-label {
          font-size: 11px;
          font-weight: 500;
          text-align: center;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        /* Desktop Wallpaper viewport area, starts below status bar */
        .desk-content-desktop {
          flex: 1;
          width: 100%;
          height: 100%;
          position: relative;
          padding: 44px 20px 20px 20px; /* 44px top padding prevents status bar overlap */
          box-sizing: border-box;
        }

        /* Windows glassmorphism layout */
        .desk-window {
          position: absolute;
          border-radius: 10px;
          background: rgba(20, 27, 43, 0.65);
          backdrop-filter: blur(25px) saturate(160%);
          -webkit-backdrop-filter: blur(25px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-sizing: border-box;
        }
        .desk-window.focused {
          border-color: rgba(6, 182, 212, 0.35);
          box-shadow: 0 25px 50px rgba(6, 182, 212, 0.12);
        }

        .desk-window-header {
          height: 36px;
          background: rgba(15, 22, 36, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          cursor: move;
          user-select: none;
        }

        .desk-window-controls {
          display: flex;
          align-items: center;
          gap: 7px;
          width: 70px;
        }

        .desk-window-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
          opacity: 0.85;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.75);
          user-select: none;
        }
        .desk-window-dot:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        .desk-window-dot.red { background-color: #ff5f56; border: 1px solid #e0443e; }
        .desk-window-dot.yellow { background-color: #ffbd2e; border: 1px solid #dea123; }
        .desk-window-dot.green { background-color: #27c93f; border: 1px solid #1aab29; }

        .desk-window-dot span {
          display: none;
          line-height: 1;
        }
        .desk-window-dot:hover span {
          display: block;
        }

        .desk-window-close-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid transparent;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .desk-window-close-btn:hover {
          background: rgba(239, 68, 68, 0.25);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ef4444;
        }

        .desk-window-title {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          font-family: inherit;
          text-align: center;
          flex: 1;
        }

        .desk-window-title-placeholder {
          width: 24px;
        }

        .desk-window-content {
          flex: 1;
          overflow: auto;
          position: relative;
        }

        /* Terminal styling */
        .desk-terminal-body {
          flex: 1;
          padding: 16px;
          background: rgba(10, 15, 24, 0.85);
          color: #39ff14;
          font-family: monospace;
          font-size: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          line-height: 1.5;
          box-sizing: border-box;
          height: 100%;
        }

        .desk-terminal-line {
          white-space: pre-wrap;
          word-break: break-all;
        }

        .desk-terminal-input-line {
          display: flex;
          align-items: center;
        }

        .desk-terminal-prompt {
          color: #39ff14;
          margin-right: 8px;
          font-weight: bold;
        }

        .desk-terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #39ff14;
          font-family: monospace;
          font-size: 12px;
        }

        /* Browser styling */
        .desk-browser-tabs {
          background: rgba(10, 15, 26, 0.7);
          padding: 6px 8px 0 8px;
          display: flex;
          gap: 3px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .desk-browser-tab {
          padding: 5px 12px;
          border-radius: 6px 6px 0 0;
          font-size: 10px;
          font-family: monospace;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .desk-browser-tab.active {
          background: rgba(20, 27, 43, 0.7);
          color: #ffffff;
          border-bottom: 1.5px solid #22d3ee;
        }

        .desk-browser-address-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(15, 22, 34, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 6px 12px;
          font-size: 10px;
          font-family: monospace;
        }

        .desk-browser-url {
          flex: 1;
          background: rgba(10, 12, 20, 0.7);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1.5px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .desk-browser-viewport {
          flex: 1;
          background: rgba(20, 26, 40, 0.85);
          padding: 20px;
          overflow-y: auto;
          box-sizing: border-box;
          height: calc(100% - 66px);
        }

        /* Instagram styling */
        .desk-insta-login {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 280px;
          margin: 40px auto;
          gap: 14px;
          width: 100%;
        }

        .desk-insta-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .desk-insta-input-group label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
        }

        .desk-insta-input {
          background: #141a27;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 7px 10px;
          color: white;
          font-family: monospace;
          font-size: 11px;
          outline: none;
        }

        .desk-insta-btn {
          background: #db2777;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          padding: 8px;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 11px;
          margin-top: 8px;
        }
        .desk-insta-btn:hover {
          background: #be185d;
        }

        .desk-insta-posts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-top: 12px;
        }

        .desk-insta-post {
          aspect-ratio: 1;
          background: #141a27;
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          font-size: 20px;
        }

        .desk-insta-post-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-family: monospace;
          padding: 2px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.2s;
          color: white;
        }
        .desk-insta-post:hover .desk-insta-post-overlay {
          opacity: 1;
        }

        /* Code Notepad editor styling */
        .desk-editor-tree {
          width: 120px;
          border-right: 1px solid rgba(255,255,255,0.05);
          background: rgba(10, 10, 15, 0.4);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 9px;
          text-transform: uppercase;
          font-weight: bold;
          color: rgba(255,255,255,0.3);
          box-sizing: border-box;
          height: 100%;
        }

        .desk-editor-viewport {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          box-sizing: border-box;
          height: 100%;
          background: rgba(15, 20, 34, 0.85);
        }

        .desk-editor-note {
          font-family: monospace;
          font-size: 11px;
          line-height: 1.5;
          color: #14b8a6;
        }

        .desk-editor-buttons {
          margin: 12px 0;
          padding: 12px;
          background: rgba(10, 10, 15, 0.7);
          border: 1px solid rgba(20, 184, 166, 0.15);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .desk-editor-btn-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .desk-editor-link-btn {
          padding: 5px 12px;
          border-radius: 4px;
          font-weight: bold;
          font-family: sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 10px;
          text-decoration: none;
          text-align: center;
        }

        /* 3D Robot Assistant Container */
        .desk-robot-assistant-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: flex-end;
          gap: 16px;
          z-index: 10000;
          pointer-events: auto;
        }

        /* 3D Robot Speech Box */
        .desk-robot-speech-box {
          width: 380px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(25px) saturate(170%);
          -webkit-backdrop-filter: blur(25px) saturate(170%);
          border: 1.5px solid rgba(6, 182, 212, 0.35);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          margin-bottom: 24px;
        }

        /* Sci-Fi speech tail pointing right toward the robot */
        .desk-robot-speech-box::after {
          content: "";
          position: absolute;
          right: -10px;
          bottom: 40px;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 10px solid rgba(15, 23, 42, 0.85);
        }

        /* 3D Robot Model Viewport */
        .desk-robot-model-viewport {
          width: 170px;
          height: 220px;
          position: relative;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6));
          flex-shrink: 0;
          cursor: grab;
        }
        .desk-robot-model-viewport:active {
          cursor: grabbing;
        }

        .desk-assistant-header {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(6, 182, 212, 0.15);
          background: rgba(6, 182, 212, 0.08);
        }

        .desk-assistant-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .desk-assistant-text {
          font-family: inherit;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
        }

        .desk-assistant-guidance {
          background: rgba(10, 15, 26, 0.85);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 6px;
          padding: 6px 10px;
          font-family: monospace;
          font-size: 10px;
          color: #22d3ee;
          word-break: break-all;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .desk-assistant-footer {
          padding: 10px 16px;
          background: rgba(2, 6, 23, 0.35);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .desk-assistant-nav-btn {
          font-family: inherit;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .desk-assistant-nav-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.04);
        }
        .desk-assistant-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .desk-assistant-action-btn {
          font-family: inherit;
          font-size: 11px;
          font-weight: bold;
          padding: 5px 14px;
          border-radius: 6px;
          background: #06b6d4;
          border: 1px solid #22d3ee;
          color: #020617;
          cursor: pointer;
          transition: all 0.2s;
        }
        .desk-assistant-action-btn:hover {
          background: #22d3ee;
        }

        .file-item-hover:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .desktop-icon-btn {
          transition: transform 0.2s, background-color 0.2s, border-color 0.2s;
        }
        .desktop-icon-btn:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }

        /* Code colorizer */
        .code-keyword { color: #f43f5e; }
        .code-string { color: #eab308; }
        .code-comment { color: #6b7280; font-style: italic; }
        .code-function { color: #3b82f6; }
        .code-number { color: #a855f7; }
      `}</style>

      {/* --- TOP STATUS BAR --- */}
      <div className="desk-status-bar">
        {/* Left Side Empty */}
        <div style={{ flex: 1 }} />
        
        {/* Date and Time centered */}
        <div style={{ 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', 
          color: 'rgba(255,255,255,0.85)', 
          fontSize: '11px',
          fontWeight: 'normal',
          textAlign: 'center'
        }}>
          <span>{currentDay || "Tue"} {currentTime || "10:32 PM"}</span>
        </div>
        
        {/* Clean System Status Icons on Right */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          flex: 1, 
          justifyContent: 'flex-end',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <button 
            onClick={toggleFullScreen}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '4px',
              color: 'white',
              fontSize: '10px',
              padding: '2px 8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            Fullscreen
          </button>
          {/* Cast/Screen Share SVG */}
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
            <rect x="2" y="2" width="20" height="20" rx="3" />
            <rect x="5" y="14" width="6" height="5" rx="1" fill="currentColor" />
          </svg>
          {/* Mobile phone SVG */}
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
            <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          {/* Sound SVG */}
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          {/* WiFi SVG */}
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="currentColor" />
          </svg>
          {/* Bluetooth SVG */}
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
            <path d="M7 7l10 10-5 5V2l5 5L7 17" />
          </svg>
          <span style={{ fontSize: '10px', fontWeight: '500', fontFamily: 'sans-serif' }}>100%</span>
          {/* Battery Icon */}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
            <rect x="2" y="7" width="16" height="10" rx="2" ry="2" fill="currentColor" />
            <line x1="22" y1="11" x2="22" y2="13" />
          </svg>
        </div>
      </div>

      {/* --- MAIN DESKTOP BODY --- */}
      <div className="desk-main-body">
        
        {/* --- RIGHT CONTAINER (DESKTOP WORKSPACE VIEWS) --- */}
        <div className="desk-right-container">
          
          <div className="desk-content-desktop">

            {/* Desktop Shortcut Icons Grid */}
            <div style={{
              position: 'absolute',
              top: '64px',
              left: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              zIndex: 5
            }}>
              {/* 1. Brave Browser Shortcut */}
              <div 
                onClick={() => openWindow("browser")}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '76px',
                  cursor: 'pointer',
                  gap: '6px'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))'
                }}
                className="desktop-icon-btn"
                >
                  <svg viewBox="0 0 100 100" width="46" height="46" fill="none">
                    <path d="M50 5 L88 22 L78 72 L50 95 L22 72 L12 22 Z" fill="#ff2f00" />
                    <path d="M50 20 L76 29 L70 56 L64 56 L61 46 L50 52 L39 46 L36 56 L30 56 L24 29 Z" fill="#ffffff" />
                    <polygon points="32,36 46,38 43,42 34,40" fill="#ff2f00" />
                    <polygon points="68,36 54,38 57,42 66,40" fill="#ff2f00" />
                    <polygon points="46,47 50,44 54,47 50,55" fill="#ff2f00" />
                    <polygon points="41,60 50,57 59,60 50,70" fill="#ff2f00" />
                  </svg>
                </div>
                <span style={{ fontSize: '11px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.9)', fontWeight: '500', textAlign: 'center' }}>Browser</span>
              </div>

              {/* 4. Terminal Shortcut */}
              <div 
                onClick={() => openWindow("terminal")}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '76px',
                  cursor: 'pointer',
                  gap: '6px'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))'
                }}
                className="desktop-icon-btn"
                >
                  <svg viewBox="0 0 24 24" width="44" height="44" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#3f3f46" />
                    <path d="M8 8l4 4-4 4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15h4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontSize: '11px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.9)', fontWeight: '500', textAlign: 'center' }}>Terminal</span>
              </div>

              {/* 5. Instagram Shortcut */}
              <div 
                onClick={() => openWindow("instagram")}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '76px',
                  cursor: 'pointer',
                  gap: '6px'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))'
                }}
                className="desktop-icon-btn"
                >
                  <svg viewBox="0 0 24 24" width="44" height="44" fill="none">
                    <circle cx="12" cy="12" r="10" fill="url(#instaGradDesktop)" />
                    <rect x="7" y="7" width="10" height="10" rx="2.5" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="14.5" cy="9.5" r="0.5" fill="#ffffff" />
                    <defs>
                      <linearGradient id="instaGradDesktop" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span style={{ fontSize: '11px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.9)', fontWeight: '500', textAlign: 'center' }}>Instagram</span>
              </div>

              {/* 6. AnyDesk Shortcut */}
              <div 
                onClick={() => openWindow("anydesk")}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '76px',
                  cursor: 'pointer',
                  gap: '6px'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))'
                }}
                className="desktop-icon-btn"
                >
                  <svg viewBox="0 0 24 24" width="44" height="44" fill="none">
                    <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#ef4444" />
                    <path d="M12 6l6 6-6 6-6-6 6-6z" fill="#ffffff" />
                    <path d="M12 9l3 3-3 3-3-3 3-3z" fill="#ef4444" />
                  </svg>
                </div>
                <span style={{ fontSize: '11px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.9)', fontWeight: '500', textAlign: 'center' }}>AnyDesk</span>
              </div>
            </div>

            {/* --- 3D ROBOT ASSISTANT & MESSAGE BOX --- */}
            {narrationDialogueList[narrationIndex] && (
              <div className="desk-robot-assistant-container">
                {/* Speech Bubble / Message Box */}
                <div 
                  className="desk-robot-speech-box"
                  style={{
                    borderColor: stage === 6 ? '#ef4444' : '#06b6d4',
                    boxShadow: stage === 6 ? '0 0 35px rgba(239, 68, 68, 0.4)' : '0 0 30px rgba(6, 182, 212, 0.25)',
                    maxHeight: showToDoSection ? '500px' : 'none',
                    overflowY: showToDoSection ? 'auto' : 'visible'
                  }}
                >
                  {/* Body Text */}
                  <div className="desk-assistant-body">
                    <p className="desk-assistant-text">
                      {narrationDialogueList[narrationIndex].text}
                    </p>

                    {/* Autofill guidance */}
                    {getAutofillCommand() && (
                      <div className="desk-assistant-guidance">
                        <code style={{ flex: 1, paddingRight: '10px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{getAutofillCommand()}</code>
                        <button 
                          onClick={() => {
                            playClick();
                            setTerminalInput(getAutofillCommand());
                            openWindow("terminal");
                          }} 
                          style={{
                            padding: '3px 10px',
                            borderRadius: '4px',
                            background: 'rgba(6, 182, 212, 0.2)',
                            border: '1.5px solid rgba(6, 182, 212, 0.4)',
                            color: '#22d3ee',
                            fontSize: '10px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontWeight: 'bold'
                          }}
                        >
                          Autofill
                        </button>
                      </div>
                    )}

                    {/* OSINT Intel / To Do Tasks Section */}
                    {showToDoSection && (
                      <div style={{
                        marginTop: '8px',
                        padding: '12px',
                        background: 'rgba(2, 6, 23, 0.85)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#22d3ee'
                      }}>
                        <div style={{ borderBottom: '1px solid rgba(6, 182, 212, 0.2)', paddingBottom: '6px' }}>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', margin: '0 0 2px 0' }}>OSINT TARGET DOSSIER</p>
                          <p style={{ fontWeight: 'bold', color: 'white', fontSize: '13px', margin: 0 }}>Ranjit Singh Dhunna</p>
                          <p style={{ color: emailExtracted ? '#eab308' : 'rgba(255,255,255,0.3)', fontSize: '10px', margin: '2px 0 0 0' }}>
                            Email: {emailExtracted ? "ranjit@dhunna.com" : "[REDACTED]"}
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', margin: '0 0 2px 0' }}>HARVESTED INTEL & TO-DO PROGRESS</p>
                          <p style={{ margin: 0, color: emailExtracted ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                            {emailExtracted ? "✓ LinkedIn Profile: Inspected (rs00dhunna@gmail.com)" : "• LinkedIn Profile: Pending Inspection"}
                          </p>
                          <p style={{ margin: 0, color: stage >= 3 ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                            {stage >= 3 ? "✓ GitHub: Ranjit-Singh-Dhunna" : "• GitHub: Pending Survey"}
                          </p>
                          <p style={{ margin: 0, color: instaLoggedIn ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                            {instaLoggedIn ? "✓ Instagram: Password Stolen" : "• Instagram: Locked"}
                          </p>
                          <p style={{ margin: 0, color: cookieInjected ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                            {cookieInjected ? "✓ SQLite Cookie: ctf_session_59a2df308" : "• SQLite Cookie: Locked"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Nav */}
                  <div className="desk-assistant-footer">
                    <button 
                      onClick={() => { playClick(); setShowToDoSection(!showToDoSection); }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: showToDoSection ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255,255,255,0.08)',
                        border: '1px solid ' + (showToDoSection ? '#22d3ee' : 'rgba(255,255,255,0.15)'),
                        color: showToDoSection ? '#22d3ee' : 'rgba(255,255,255,0.85)',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        cursor: 'pointer'
                      }}
                    >
                      To Do
                    </button>

                    {narrationIndex === narrationDialogueList.length - 1 ? (
                      <Link 
                        href="/"
                        style={{
                          fontFamily: 'inherit',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          padding: '5px 14px',
                          borderRadius: '6px',
                          background: '#ef4444',
                          border: '1px solid #f87171',
                          color: 'white',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        Disconnect
                      </Link>
                    ) : (
                      <button 
                        onClick={handleNextNarration}
                        className="desk-assistant-action-btn"
                      >
                        {narrationDialogueList[narrationIndex].btnText} &gt;
                      </button>
                    )}
                  </div>
                </div>

                {/* 3D Robot Model Viewport */}
                <div className="desk-robot-model-viewport">
                  <model-viewer
                    ref={robotModelRef}
                    src="/friendly-sci-fi-robot-with-animations/source/robot.glb"
                    alt="3D Assistant Robot"
                    camera-controls
                    autoplay
                    animation-name={stage === 6 ? "Free_Fall" : "Look_Wave"}
                    camera-orbit="0deg 75deg auto"
                    shadow-intensity="1"
                    disable-zoom
                    interaction-prompt="none"
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
              </div>
            )}

            {/* --- DRAG WINDOWS --- */}

            {/* 1. TERMINAL WINDOW */}
            {windows.terminal.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "terminal" ? "focused" : ""}`}
                style={{
                  display: windows.terminal.isMinimized ? 'none' : 'flex',
                  width: windows.terminal.isMaximized ? '100%' : `${windows.terminal.w}px`,
                  height: windows.terminal.isMaximized ? '100%' : `${windows.terminal.h}px`,
                  left: windows.terminal.isMaximized ? '0' : `${windows.terminal.x}px`,
                  top: windows.terminal.isMaximized ? '0' : `${windows.terminal.y}px`,
                  zIndex: windows.terminal.zIndex,
                }}
                onClick={() => focusWindow("terminal")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("terminal", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("terminal"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                  </div>
                  <span className="desk-window-title">Terminal - user@anydesk-remote:~</span>
                </div>

                <div className="desk-window-content">
                  <div className="desk-terminal-body">
                    {terminalLines.map((line, idx) => (
                      <div key={idx} className="desk-terminal-line">{line}</div>
                    ))}
                    
                    <form 
                      onSubmit={(e) => { e.preventDefault(); runTerminalCommand(terminalInput); }}
                      className="desk-terminal-input-line"
                    >
                      <span className="desk-terminal-prompt">user@anydesk-remote:~$</span>
                      <input 
                        type="text" 
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="desk-terminal-input"
                        autoFocus
                      />
                    </form>
                    <div ref={terminalBottomRef} />
                  </div>
                </div>

                <div style={{ height: '36px', background: 'rgba(10, 15, 26, 0.9)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', boxSizing: 'border-box' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                    {getAutofillCommand() ? "Suggested OSINT Payload:" : "Terminal Status: Active Session"}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {getAutofillCommand() && (
                      <button 
                        onClick={handleAutofillExecute}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          background: '#16a34a',
                          border: 'none',
                          color: 'white',
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Auto-type & Run Cmd
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Right Resize Handle */}
                <div 
                  onMouseDown={(e) => startResize("terminal", e)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '20px',
                    height: '20px',
                    cursor: 'nwse-resize',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderTopLeftRadius: '4px',
                    userSelect: 'none'
                  }}
                  title="Drag to resize window"
                >
                  <svg viewBox="0 0 16 16" width="10" height="10" fill="rgba(255,255,255,0.7)">
                    <path d="M14 14H10V12H14V14ZM14 10H6V8H14V10ZM14 6H2V4H14V6Z" />
                  </svg>
                </div>
              </div>
            )}

            {/* 2. BRAVE BROWSER WINDOW */}
            {windows.browser.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "browser" ? "focused" : ""}`}
                style={{
                  display: windows.browser.isMinimized ? 'none' : 'flex',
                  width: windows.browser.isMaximized ? '100%' : `${windows.browser.w}px`,
                  height: windows.browser.isMaximized ? '100%' : `${windows.browser.h}px`,
                  left: windows.browser.isMaximized ? '0' : `${windows.browser.x}px`,
                  top: windows.browser.isMaximized ? '0' : `${windows.browser.y}px`,
                  zIndex: windows.browser.zIndex,
                }}
                onClick={() => focusWindow("browser")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("browser", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("browser"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                  </div>
                  <span className="desk-window-title">Google - Browser</span>
                </div>

                <div className="desk-browser-tabs">
                  <button 
                    onClick={() => { playClick(); setActiveBrowserTab("google"); }}
                    className={`desk-browser-tab ${activeBrowserTab === "google" ? "active" : ""}`}
                  >
                    Google
                  </button>
                  {activeBrowserTab === "linkedin" && (
                    <button className="desk-browser-tab active">
                      LinkedIn
                    </button>
                  )}
                  {activeBrowserTab === "github" && (
                    <button className="desk-browser-tab active">
                      GitHub
                    </button>
                  )}
                  {activeBrowserTab === "ctf" && (
                    <button className="desk-browser-tab active">
                      CTF Portal
                    </button>
                  )}
                  {activeBrowserTab === "api" && (
                    <button className="desk-browser-tab active" style={{ color: '#22d3ee' }}>
                      Achievements API
                    </button>
                  )}
                </div>

                <div className="desk-browser-address-bar">
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>🔒 Incognito</span>
                  <div className="desk-browser-url">
                    {activeBrowserTab === "google" ? "https://www.google.com" :
                     activeBrowserTab === "linkedin" ? "https://www.linkedin.com/in/ranjit-singh-dhunna" :
                     activeBrowserTab === "github" ? "https://github.com/Ranjit-Singh-Dhunna" :
                     activeBrowserTab === "ctf" ? "https://ctf-portal.io/dashboard" :
                     "https://ctf-portal.io/api/v1/user/achievements"}
                  </div>
                </div>

                <div className="desk-browser-viewport" style={{ background: activeBrowserTab === "google" ? '#fbf6f0' : activeBrowserTab === "linkedin" ? '#f4f2ee' : 'inherit', padding: activeBrowserTab === "google" ? 0 : '16px', overflowY: 'auto' }}>
                  {activeBrowserTab === "google" && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100%',
                      width: '100%',
                      background: '#fbf6f0',
                      padding: '40px 20px',
                      boxSizing: 'border-box',
                      color: '#4a240c'
                    }}>
                      {/* Google Logo matching user image */}
                      <h1 style={{
                        fontSize: '72px',
                        fontWeight: '500',
                        color: '#8c4d1e',
                        fontFamily: '"Google Sans", Roboto, system-ui, sans-serif',
                        margin: '0 0 28px 0',
                        letterSpacing: '-1px',
                        lineHeight: 1
                      }}>
                        Google
                      </h1>
                      
                      {!dorkSearchSubmitted ? (
                        <form onSubmit={handleDorkSearch} style={{ width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                          {/* Search Capsule Bar */}
                          <div style={{
                            width: '100%',
                            height: '52px',
                            background: '#ffffff',
                            border: '1px solid #efe4dc',
                            borderRadius: '28px',
                            boxShadow: '0 2px 8px rgba(140, 77, 30, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 10px 0 16px',
                            gap: '12px',
                            boxSizing: 'border-box'
                          }}>
                            {/* Left Plus icon */}
                            <span style={{ fontSize: '20px', color: '#6e4429', fontWeight: '300', userSelect: 'none' }}>+</span>

                            <input 
                              type="text" 
                              placeholder="Ask Google" 
                              value={dorkSearchQuery}
                              onChange={(e) => setDorkSearchQuery(e.target.value)}
                              style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: '#3c2415',
                                fontSize: '15px',
                                fontFamily: 'inherit'
                              }}
                            />

                            {/* Right side icons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {/* Mic SVG */}
                              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5c3821" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                <line x1="12" y1="19" x2="12" y2="22"/>
                              </svg>

                              {/* Camera / Lens SVG */}
                              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5c3821" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                <circle cx="12" cy="13" r="4"/>
                              </svg>

                              {/* AI Mode Capsule Pill */}
                              <button
                                type="button"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  background: '#f4ece4',
                                  border: 'none',
                                  borderRadius: '20px',
                                  padding: '6px 14px',
                                  color: '#4a240c',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>✨</span> AI Mode
                              </button>
                            </div>
                          </div>

                          {/* Add shortcut button matching image */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => setDorkSearchQuery("site:linkedin.com \"Ranjit Singh Dhunna\"")}
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: '#eee4dc',
                                border: 'none',
                                color: '#4a240c',
                                fontSize: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.15s'
                              }}
                              title="Autofill Dork"
                            >
                              +
                            </button>
                            <span style={{ fontSize: '12px', color: '#4a240c', fontWeight: '500' }}>Add shortcut</span>
                          </div>
                        </form>
                      ) : (
                        /* Search Results */
                        <div style={{ width: '100%', maxWidth: '640px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '20px', color: '#2d180c' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ebdcd0', paddingBottom: '8px', fontSize: '11px', color: '#8c6d58' }}>
                            <span>Search results for: "{dorkSearchQuery}"</span>
                            <span onClick={() => setDorkSearchSubmitted(false)} style={{ color: '#8c4d1e', cursor: 'pointer', fontWeight: 'bold' }}>Reset</span>
                          </div>

                          <div style={{ padding: '18px', background: '#ffffff', border: '1px solid #efe4dc', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                            <span style={{ fontSize: '11px', color: '#16a34a' }}>https://www.linkedin.com › ranjit-singh-dhunna</span>
                            <button 
                              type="button"
                              onClick={() => { playClick(); setActiveBrowserTab("linkedin"); if (stage === 1 && narrationIndex === 1) setNarrationIndex(2); }} 
                              style={{ background: 'transparent', border: 'none', color: '#1d4ed8', fontWeight: 'bold', fontSize: '15px', textAlign: 'left', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                            >
                              Ranjit Singh Dhunna - Software Intern - Immense Star Solutions | LinkedIn
                            </button>
                            <p style={{ color: '#4b5563', margin: '4px 0 0 0', lineHeight: '1.5', fontSize: '12px' }}>
                              Software Developer & Applied AI builder. Montreal, QC. Education: Concordia University. Experience with Django REST Framework, React, Next.js, and PyTorch...
                            </p>
                          </div>

                          <div style={{ padding: '18px', background: '#ffffff', border: '1px solid #efe4dc', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.85, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                            <span style={{ fontSize: '11px', color: '#6b7280' }}>https://github.com › Ranjit-Singh-Dhunna</span>
                            <button 
                              type="button"
                              onClick={() => { playClick(); setActiveBrowserTab("github"); }} 
                              style={{ background: 'transparent', border: 'none', color: '#1d4ed8', fontWeight: 'bold', fontSize: '15px', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                            >
                              Ranjit-Singh-Dhunna (Ranjit Singh Dhunna) · GitHub
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeBrowserTab === "linkedin" && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: '#f4f2ee', color: '#191919', fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      {/* 1. LINKEDIN PROFILE HEADER CARD */}
                      <div style={{ background: '#ffffff', border: '1px solid #dedede', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        {/* Banner accent bar (clean solid gradient, no image) */}
                        <div style={{
                          height: '110px',
                          background: 'linear-gradient(135deg, #0a66c2, #004182)',
                          position: 'relative'
                        }} />

                        {/* Profile Details Container */}
                        <div style={{ padding: '0 24px 20px 24px', position: 'relative' }}>
                          
                          {/* Clean Avatar Circle (no avatar image) */}
                          <div style={{
                            marginTop: '-50px',
                            width: '110px',
                            height: '110px',
                            borderRadius: '50%',
                            border: '4px solid #ffffff',
                            background: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '36px',
                            fontWeight: '700',
                            color: '#0a66c2',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                          }}>
                            RD
                          </div>

                          {/* Profile Main Row */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '12px' }}>
                            <div>
                              {/* Name & Badge */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#191919', margin: 0 }}>Ranjit Singh Dhunna</h1>
                                <span style={{ background: '#0a66c2', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</span>
                                <span style={{ color: '#666666', fontSize: '14px' }}>He/Him</span>
                              </div>

                              {/* Headline */}
                              <p style={{ fontSize: '15px', color: '#191919', margin: '4px 0 0 0', fontWeight: '400' }}>
                                '28 SWE @ ConU | Prev: Dev @ SofiaPulse
                              </p>

                              {/* Location */}
                              <p style={{ fontSize: '14px', color: '#666666', margin: '4px 0 0 0' }}>
                                Montreal, Quebec, Canada &bull; <span style={{ color: '#0a66c2', fontWeight: '600', cursor: 'pointer' }}>Contact info</span>
                              </p>

                              {/* Connections */}
                              <p style={{ fontSize: '14px', color: '#0a66c2', fontWeight: '700', margin: '6px 0 0 0', cursor: 'pointer' }}>
                                500+ connections
                              </p>
                            </div>

                            {/* Right side Logos */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#7e22ce' }}>S</div>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#191919' }}>SofiaPulse</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#800020', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>C</div>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#191919' }}>Concordia University</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                            <button 
                              onClick={() => { playClick(); setEmailExtracted(true); if (stage === 1 && narrationIndex === 2) setNarrationIndex(3); }} 
                              style={{ padding: '6px 16px', borderRadius: '20px', background: '#0a66c2', border: 'none', color: '#ffffff', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
                            >
                              Contact Details
                            </button>
                            <a 
                              href="mailto:rs00dhunna@gmail.com"
                              style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #0a66c2', color: '#0a66c2', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}
                            >
                              Email me
                            </a>
                          </div>

                          {/* CONTACT CARD MATCHING IMAGE 2 EXACTLY */}
                          {emailExtracted && (
                            <div style={{ marginTop: '16px', padding: '14px', background: 'rgb(239, 246, 255)', border: '1px solid rgb(191, 219, 254)', borderRadius: '8px', fontSize: '13px', color: 'rgb(30, 58, 138)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#191919" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-10 7L2 7" />
                              </svg>
                              <div>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#191919', margin: '0 0 2px 0' }}>Email</h4>
                                <a href="mailto:rs00dhunna@gmail.com" style={{ fontSize: '15px', fontWeight: '700', color: '#0a66c2', textDecoration: 'none' }}>
                                  rs00dhunna@gmail.com
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. ABOUT SECTION CARD */}
                      <div style={{ background: '#ffffff', border: '1px solid #dedede', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#191919', margin: '0 0 12px 0' }}>About</h2>
                        <p style={{ fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: 0 }}>
                          This interactive desktop workspace serves as a gamified OSINT (Open Source Intelligence) & cybersecurity experience. Rather than viewing a standard static resume, visitors step into a simulated investigator workstation where they uncover my background, technical projects, credentials, and footprint by investigating simulated endpoints, terminal tools, and harvested data trails.
                        </p>
                      </div>

                      {/* 3. EXPERIENCE SECTION CARD */}
                      <div style={{ background: '#ffffff', border: '1px solid #dedede', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#191919', margin: 0 }}>Experience</h2>
                        
                        {/* Experience 1: Immense Star Solutions */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>
                            ★
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#191919', margin: 0 }}>Software Intern</h3>
                            <p style={{ fontSize: '14px', color: '#191919', margin: '2px 0 0 0' }}>Immense Star Solutions &bull; Internship</p>
                            <p style={{ fontSize: '13px', color: '#666666', margin: '2px 0 0 0' }}>May 2026 – Aug 2026 &bull; 4 mos</p>
                            <p style={{ fontSize: '13px', color: '#666666', margin: '2px 0 0 0' }}>Montreal, Quebec, Canada &bull; Hybrid</p>
                            <p style={{ fontSize: '14px', color: '#333333', marginTop: '8px', lineHeight: '1.5' }}>
                              &bull; Developed web APIs and backend microservices using Django REST framework and PostgreSQL.<br />
                              &bull; Integrated automated unit testing, API rate limiting, and Git release workflows.
                            </p>
                          </div>
                        </div>

                        <div style={{ height: '1px', background: '#e5e7eb' }} />

                        {/* Experience 2: SofiaPulse */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>
                            S
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#191919', margin: 0 }}>Fullstack & Applied AI Developer</h3>
                            <p style={{ fontSize: '14px', color: '#191919', margin: '2px 0 0 0' }}>SofiaPulse &bull; Full-time</p>
                            <p style={{ fontSize: '13px', color: '#666666', margin: '2px 0 0 0' }}>Dec 2025 – Jan 2026 &bull; 2 mos</p>
                            <p style={{ fontSize: '13px', color: '#666666', margin: '2px 0 0 0' }}>Montreal, Quebec, Canada &bull; Remote</p>
                            <p style={{ fontSize: '14px', color: '#333333', marginTop: '8px', lineHeight: '1.5' }}>
                              &bull; Architected interactive editor integrating GenAI image generation models.<br />
                              &bull; Built real-time canvas UI components and responsive template rendering engines.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 4. EDUCATION SECTION CARD */}
                      <div style={{ background: '#ffffff', border: '1px solid #dedede', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#191919', margin: '0 0 16px 0' }}>Education</h2>

                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: '#800020', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '24px', flexShrink: 0 }}>
                            C
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#191919', margin: 0 }}>Concordia University</h3>
                            <p style={{ fontSize: '14px', color: '#191919', margin: '2px 0 0 0' }}>Bachelor of Engineering - BE, Computer Software Engineering</p>
                            <p style={{ fontSize: '14px', color: '#666666', margin: '2px 0 0 0' }}>2024 – 2028</p>
                            <p style={{ fontSize: '14px', color: '#333333', marginTop: '8px', lineHeight: '1.5' }}>
                              Through out the course, I got exposure to Object oriented programming, Web development, System hardware, DSA ,Operating systems, software architecture and design, UID , Software Testing and cyber security.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontWeight: '700', fontSize: '14px', color: '#191919' }}>
                              <span>💎</span>
                              <span>Web Development, Software Development and +1 skill</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. LICENSES & CERTIFICATIONS SECTION CARD */}
                      <div style={{ background: '#ffffff', border: '1px solid #dedede', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#191919', margin: 0 }}>Licenses & certifications</h2>

                        {/* Entry 1 */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: '#000000', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontWeight: 'bold', fontSize: '24px', flexShrink: 0 }}>
                            U
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#191919', margin: 0 }}>Technical Writing</h3>
                            <p style={{ fontSize: '14px', color: '#191919', margin: 0 }}>Udemy</p>
                            <p style={{ fontSize: '14px', color: '#666666', margin: 0 }}>Issued May 2025</p>
                            <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>Credential ID UC-c58db9ce-9786-45c5-97a9-b3134e9535a2</p>
                            <button style={{ alignSelf: 'flex-start', marginTop: '6px', padding: '6px 16px', borderRadius: '20px', border: '1px solid #333333', background: 'transparent', color: '#191919', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>Show credential</span>
                              <span>↗</span>
                            </button>
                          </div>
                        </div>

                        <div style={{ height: '1px', background: '#e5e7eb' }} />

                        {/* Entry 2 */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: '#000000', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontWeight: 'bold', fontSize: '24px', flexShrink: 0 }}>
                            U
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#191919', margin: 0 }}>Technical Communication and Soft Skills for Engineers</h3>
                            <p style={{ fontSize: '14px', color: '#191919', margin: 0 }}>Udemy</p>
                            <p style={{ fontSize: '14px', color: '#666666', margin: 0 }}>Issued May 2025</p>
                            <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>Credential ID UC-ae7a1aac-6de5-4542-b219-15575838d84c</p>
                            <button style={{ alignSelf: 'flex-start', marginTop: '6px', padding: '6px 16px', borderRadius: '20px', border: '1px solid #333333', background: 'transparent', color: '#191919', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>Show credential</span>
                              <span>↗</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeBrowserTab === "github" && (
                    /* 1-TO-1 EXACT GITHUB PROFILE & REPOSITORIES PAGE REPLICA */
                    <div style={{ background: '#0d1117', color: '#c9d1d9', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', minHeight: '100%', margin: '-16px', padding: 0 }}>
                      
                      {/* Top Header Bar */}
                      <div style={{ background: '#010409', borderBottom: '1px solid #30363d', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontSize: '18px', color: '#8b949e', cursor: 'pointer' }}>☰</span>
                          <svg viewBox="0 0 16 16" width="24" height="24" fill="#f0f6fc">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
                          </svg>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#f0f6fc' }}>Ranjit-Singh-Dhunna</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '10px', width: '220px' }}>
                            <span style={{ fontSize: '13px', color: '#8b949e' }}>🔍 Type <kbd style={{ background: '#21262d', padding: '1px 4px', borderRadius: '3px', border: '1px solid #30363d', fontSize: '10px' }}>/</kbd> to search</span>
                          </div>
                          <span style={{ color: '#8b949e', fontSize: '13px', cursor: 'pointer' }}>+ ▾</span>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#21262d', color: '#58a6ff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>RD</div>
                        </div>
                      </div>

                      {/* Sub-Header Navigation Tabs */}
                      <div style={{ background: '#010409', borderBottom: '1px solid #30363d', padding: '0 24px', display: 'flex', gap: '24px', fontSize: '14px' }}>
                        <div style={{ padding: '12px 0', color: '#8b949e', cursor: 'default', display: 'flex', alignItems: 'center' }}>
                          <span>Overview</span>
                        </div>

                        <div 
                          onClick={() => setSelectedRepo(null)}
                          style={{ padding: '12px 0', borderBottom: '2px solid #f78166', color: '#f0f6fc', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <span>Repositories</span>
                        </div>

                        <div style={{ padding: '12px 0', color: '#8b949e', cursor: 'default', display: 'flex', alignItems: 'center' }}>
                          <span>Projects</span>
                        </div>

                        <div style={{ padding: '12px 0', color: '#8b949e', cursor: 'default', display: 'flex', alignItems: 'center' }}>
                          <span>Packages</span>
                        </div>

                        <div style={{ padding: '12px 0', color: '#8b949e', cursor: 'default', display: 'flex', alignItems: 'center' }}>
                          <span>Stars</span>
                        </div>
                      </div>

                      {/* Main Profile Grid View */}
                      <div style={{ padding: '24px', display: 'flex', gap: '24px' }}>
                        
                        {/* Left Sidebar */}
                        <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
                          {/* Circular Avatar */}
                          <div style={{ position: 'relative', width: '230px', height: '230px' }}>
                            <div style={{ width: '230px', height: '230px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px', fontWeight: 'bold', color: '#58a6ff' }}>
                              RD
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', background: '#21262d', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                              🟡
                            </div>
                          </div>

                          {/* Profile Titles */}
                          <div>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#f0f6fc', margin: 0 }}>Ranjit Singh Dhunna</h1>
                            <p style={{ fontSize: '14px', color: '#8b949e', margin: '2px 0 0 0' }}>Ranjit-Singh-Dhunna</p>
                          </div>

                          {/* Followers */}
                          <div style={{ fontSize: '13px', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>👥</span>
                            <span style={{ color: '#f0f6fc', fontWeight: '600' }}>2</span> followers &bull; <span style={{ color: '#f0f6fc', fontWeight: '600' }}>0</span> following
                          </div>

                          {/* Details Links */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#c9d1d9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>✉️</span>
                              <span>rs00dhunna@gmail.com</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>🔗</span>
                              <a href="https://ranjitsinghdhunna.dev/" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', textDecoration: 'none' }}>https://ranjitsinghdhunna.dev/</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>💼</span>
                              <span style={{ color: '#58a6ff' }}>in/ranjit-singh-dhunna-772790307</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Content Column */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          
                          {selectedRepo ? (
                            /* REPOSITORY DETAIL VIEW WITH UNCLICKABLE FILES & README */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {/* Breadcrumb Header */}
                              <div style={{ borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                  <span style={{ color: '#58a6ff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setSelectedRepo(null)}>Ranjit-Singh-Dhunna</span>
                                  <span style={{ color: '#8b949e' }}>/</span>
                                  <span style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{selectedRepo.name}</span>
                                  <span style={{ border: '1px solid #30363d', color: '#8b949e', borderRadius: '12px', padding: '1px 8px', fontSize: '12px' }}>Public</span>
                                </div>
                              </div>

                              {/* Unclickable Files and Folder Table */}
                              <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ background: '#161b22', padding: '10px 16px', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#8b949e' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#30363d', color: '#58a6ff', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>RD</div>
                                    <span style={{ color: '#c9d1d9', fontWeight: '600' }}>Ranjit-Singh-Dhunna</span>
                                    <span>Initial repository release and documentation</span>
                                  </div>
                                  <span>{selectedRepo.year}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px' }}>
                                  {[
                                    { icon: "📁", name: "src", msg: "Core source code implementation", time: "2 weeks ago" },
                                    { icon: "📁", name: "docs", msg: "Add technical specifications & research metrics", time: "1 month ago" },
                                    { icon: "📁", name: "config", msg: "Add environment configuration schemas", time: "3 weeks ago" },
                                    { icon: "📄", name: ".gitignore", msg: "Initial gitignore rules", time: "2 months ago" },
                                    { icon: "📄", name: "README.md", msg: "Update detailed project overview", time: "3 days ago" },
                                    { icon: "📄", name: selectedRepo.tech.includes("Python") ? "requirements.txt" : "package.json", msg: "Configure build dependencies", time: "1 month ago" }
                                  ].map((f, idx) => (
                                    <div key={idx} style={{ padding: '8px 16px', borderBottom: idx < 5 ? '1px solid #21262d' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#c9d1d9' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '220px' }}>
                                        <span>{f.icon}</span>
                                        <span style={{ color: f.icon === "📁" ? "#58a6ff" : "#c9d1d9" }}>{f.name}</span>
                                      </div>
                                      <div style={{ flex: 1, color: '#8b949e', fontSize: '12px' }}>{f.msg}</div>
                                      <div style={{ color: '#8b949e', fontSize: '12px' }}>{f.time}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* README.md Container */}
                              <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '20px' }}>
                                <div style={{ borderBottom: '1px solid #30363d', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span>📖</span>
                                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f0f6fc' }}>README.md</span>
                                </div>

                                <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f0f6fc', margin: '0 0 8px 0' }}>{selectedRepo.name}</h1>
                                
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                  <span style={{ background: '#1f6beb', color: 'white', borderRadius: '12px', padding: '2px 10px', fontSize: '11px', fontWeight: 'bold' }}>{selectedRepo.badge}</span>
                                  <span style={{ background: '#238636', color: 'white', borderRadius: '12px', padding: '2px 10px', fontSize: '11px', fontWeight: 'bold' }}>{selectedRepo.year}</span>
                                  <span style={{ background: '#30363d', color: '#c9d1d9', borderRadius: '12px', padding: '2px 10px', fontSize: '11px' }}>{selectedRepo.tech}</span>
                                </div>

                                <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#c9d1d9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  {selectedRepo.bullets.map((b: string, idx: number) => (
                                    <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                                      <span style={{ color: '#58a6ff' }}>•</span>
                                      <span>{b}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* 14 REPOSITORIES LIST VIEW */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              
                              {/* Repository Search & Filter Controls */}
                              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #30363d', paddingBottom: '16px' }}>
                                <input 
                                  type="text"
                                  placeholder="Find a repository..."
                                  style={{ flex: 1, background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 12px', color: '#c9d1d9', fontSize: '13px', outline: 'none' }}
                                />
                                <button style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 12px', color: '#c9d1d9', fontSize: '13px', cursor: 'pointer' }}>Type ▾</button>
                                <button style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 12px', color: '#c9d1d9', fontSize: '13px', cursor: 'pointer' }}>Language ▾</button>
                                <button style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 12px', color: '#c9d1d9', fontSize: '13px', cursor: 'pointer' }}>Sort ▾</button>
                                <button style={{ background: '#238636', border: 'none', borderRadius: '6px', padding: '6px 16px', color: 'white', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>New</button>
                              </div>

                              {/* Repositories List (14 Full Repos) */}
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {[
                                  {
                                    name: "Predicting Customer Churn",
                                    badge: "Academic and Team",
                                    tech: "Python, scikit-learn, pandas, seaborn",
                                    year: "2026",
                                    type: "Repo link",
                                    lang: "Python",
                                    langColor: "#3572A5",
                                    bullets: [
                                      "Built an end-to-end churn prediction pipeline on 1,001 StreamFlex subscriber records, training a DecisionTreeClassifier tuned via GridSearchCV across 224 hyperparameter combinations, achieving 81.5% accuracy and 92.75% recall on a held-out test set.",
                                      "Conducted full EDA with 14 custom visualisations and surfaced the top 3 churn drivers: complaint volume, payment issues and membership tier, translating model findings into 3 concrete business recommendations targeting retention."
                                    ]
                                  },
                                  {
                                    name: "Skin Lesion CNN Classifier",
                                    badge: "Academic and Team",
                                    tech: "PyTorch, ResNet-18, VGG-16, MobileNetV2",
                                    year: "2026",
                                    type: "Repo link",
                                    lang: "Python",
                                    langColor: "#3572A5",
                                    bullets: [
                                      "Engineered a full deep learning pipeline to classify skin lesions across 3 dermoscopic datasets (ISIC 2017, HAM10000, DERM12345), benchmarking 3 CNN architectures: ResNet-18, VGG-16 and MobileNetV2, in both from-scratch and transfer learning modes for early melanoma detection.",
                                      "Implemented Grad-CAM visual explainability, inverse-frequency weighted loss to handle class imbalance across up to 40 lesion categories, and a YAML-driven experiment system enabling reproducible, config-controlled training runs."
                                    ]
                                  },
                                  {
                                    name: "Health Companion App",
                                    badge: "Academic",
                                    tech: "Figma, Mixed-Methods Research",
                                    year: "2026",
                                    type: "Repo link",
                                    lang: "Figma",
                                    langColor: "#ea4c89",
                                    bullets: [
                                      "Spearheaded mixed-methods research with 60 participants to engineer an Adaptive UI system with three distinct interface modes, successfully bridging the tech-literacy gap for senior users.",
                                      "Developed OCR-based onboarding flow in Figma, optimizing patient logistics to save an average of 2 hours in travel time while ensuring 100% WCAG AA accessibility compliance with high-fidelity prototype."
                                    ]
                                  },
                                  {
                                    name: "FLUX: Collaborative Scheduling App",
                                    badge: "Academic and Team",
                                    tech: "React, TypeScript, Supabase",
                                    year: "2026",
                                    type: "Demo link",
                                    lang: "TypeScript",
                                    langColor: "#3178c6",
                                    bullets: [
                                      "Developed scheduling platform as a team of 5, leveraging Gemini AI to automate the extraction of structured availability from timetable screenshots, reducing manual data entry and coordination effort.",
                                      "Utilized dimensional graph analysis to model cognitive load and peak focus hours, enabling 83% of users to finalize meeting times in under 5 minutes during a 42-participant validation study."
                                    ]
                                  },
                                  {
                                    name: "MediVault",
                                    badge: "Hackathon",
                                    tech: "OpenRouter, Dialogue, MongoDB, ElevenLabs, Snowflake, Vultr, Solana",
                                    year: "2026",
                                    type: "Demo link",
                                    lang: "TypeScript",
                                    langColor: "#3178c6",
                                    bullets: [
                                      "Built a decentralized marketplace enabling patients to securely digitize, own, and monetize their medical records, as a team of 4.",
                                      "Integrated OpenRouter and ElevenLabs for AI engagement, supported by Solana for crypto and Snowflake and MongoDB for secure data infrastructure, Vultr for privacy layer."
                                    ]
                                  },
                                  {
                                    name: "Events & Ticketing App",
                                    badge: "Academic and Team",
                                    tech: "React, TypeScript, Supabase (PostgreSQL)",
                                    year: "2025",
                                    type: "Demo link",
                                    lang: "TypeScript",
                                    langColor: "#3178c6",
                                    bullets: [
                                      "Lead 7 person team as Scrum Master and Lead Developer to build campus events and ticketing platform.",
                                      "Developed app enabling event discovery, QR code ticketing, social connections, organizer analytics dashboards, and admin moderation tools."
                                    ]
                                  },
                                  {
                                    name: "INTERBU: AI Interview Coach",
                                    badge: "Personal",
                                    tech: "React, Flask, Whisper",
                                    year: "2025",
                                    type: "Demo link",
                                    lang: "Python",
                                    langColor: "#3572A5",
                                    bullets: [
                                      "Built an AI interview coach for personalized, resume and job description-based practice app.",
                                      "Added local data storage and offline LLM fallback for privacy and reliability."
                                    ]
                                  },
                                  {
                                    name: "DRIP GENIUS: Outfit Recommendation System",
                                    badge: "Personal",
                                    tech: "Roboflow, K-means Clustering",
                                    year: "2025",
                                    type: "Demo link",
                                    lang: "Python",
                                    langColor: "#3572A5",
                                    bullets: [
                                      "Fashion recommendation app to analyze clothing images and generate personalized outfit suggestions.",
                                      "Implemented computer vision-based clothing detection, K-means colour analysis, and responsive UI."
                                    ]
                                  },
                                  {
                                    name: "Code Buddy: Code Review Tool",
                                    badge: "Personal",
                                    tech: "React, Vite, Node.js, Express",
                                    year: "2025",
                                    type: "Demo link",
                                    lang: "JavaScript",
                                    langColor: "#f1e05a",
                                    bullets: [
                                      "Built an AI-powered code review tool, providing instant, syntax-aware feedback for learners.",
                                      "Integrated a live code editor and markdown-rendered responses for beginner-friendly code guidance."
                                    ]
                                  },
                                  {
                                    name: "Universal Resume Parser",
                                    badge: "Personal",
                                    tech: "Python, Ollama LLM, PDFPlumber, LangChain",
                                    year: "2025",
                                    type: "Repo link",
                                    lang: "Python",
                                    langColor: "#3572A5",
                                    bullets: [
                                      "Built a resume parser using Ollama LLM to extract employability-specific data from any resume.",
                                      "Implemented hyperlink detection, multi-domain support, and context-aware parsing for tech, business, healthcare, and creative resumes."
                                    ]
                                  },
                                  {
                                    name: "Hospital Database Management System",
                                    badge: "Academic and Team",
                                    tech: "PostgreSQL and MongoDB",
                                    year: "2025",
                                    type: "Repo link",
                                    lang: "PL/pgSQL",
                                    langColor: "#336791",
                                    bullets: [
                                      "Developed hospital database management system handling patient records, appointments, staff schedules, billing, and medical histories.",
                                      "Designed 2 flexible architectures for both SQL and NoSQL databases."
                                    ]
                                  },
                                  {
                                    name: "Click2Bill: Automated Invoice System",
                                    badge: "Personal",
                                    tech: "Google Sheets, Apps Script, PDF-Email Integration",
                                    year: "2024",
                                    type: "Demo link",
                                    lang: "JavaScript",
                                    langColor: "#f1e05a",
                                    bullets: [
                                      "Developed a service request and invoicing system, streamlining form submissions, invoice generation, and email delivery used by Real User (Shop owner).",
                                      "Implemented end-to-end workflow automation with searchable records, timestamped logs, and PDF invoice templates, reducing manual data entry by 70%."
                                    ]
                                  },
                                  {
                                    name: "Scénix: AI-Powered Biomechanics Coach",
                                    badge: "Personal",
                                    tech: "React, Vite, Google GenAI, Supabase, MediaPipe BlazePose, Tailwind CSS",
                                    year: "2026",
                                    type: "Repo link",
                                    lang: "TypeScript",
                                    langColor: "#3178c6",
                                    bullets: [
                                      "Built an end-to-end athletic performance analysis platform leveraging Google's BlazePose CNN for real-time joint tracking and Gemini 2.5 Flash AI for biomechanical assessment, enabling users to capture movement data via webcam or video upload and receive detailed coaching feedback on form, symmetry, and technique.",
                                      "Implemented full-stack architecture with Supabase for authentication, data persistence, and media storage, designed a structured feedback system generating performance scores (0-100) with symmetry analysis and form corrections, and developed social features including community feed and user dashboards for progress tracking."
                                    ]
                                  },
                                  {
                                    name: "CANHEALTH: Healthcare FinTech Platform",
                                    badge: "Hackathon and Team",
                                    tech: "Python, FastAPI, React, TypeScript, Google Gemini, ElevenLabs, BRIM Financial",
                                    year: "2026",
                                    type: "Repo link",
                                    lang: "Python",
                                    langColor: "#3572A5",
                                    bullets: [
                                      "Architected a full-stack healthcare fintech platform combining AI-powered fraud detection and a patient credit line system, integrating Google Gemini for real-time anomaly tracking and ElevenLabs voice agents for conversational financial support.",
                                      "Built a comprehensive fraud monitoring dashboard with preventative risk forecasting, spending analytics, and automated compliance reporting, enabling healthcare providers to identify fraudulent activity before financial loss occurs.",
                                      "Implemented a natural language query interface allowing operators to extract instant financial insights through conversational prompts, reducing administrative overhead for financial data analysis.",
                                      "Leveraged BRIM Financial infrastructure to provide enterprise-grade financial controls including programmable corporate cards, real-time spending limits, and policy automation for small-to-medium healthcare businesses.",
                                      "Developed dual-sided value proposition simultaneously improving patient accessibility through flexible credit repayment options while protecting provider margins through advanced fraud prevention and chargeback mitigation."
                                    ]
                                  }
                                ].map((repo, index) => (
                                  <div key={index} style={{ padding: '16px 0', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1, paddingRight: '16px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <h3 
                                          onClick={() => setSelectedRepo(repo)}
                                          style={{ fontSize: '17px', fontWeight: '600', color: '#58a6ff', margin: 0, cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                          {repo.name}
                                        </h3>
                                        <span style={{ border: '1px solid #30363d', color: '#8b949e', borderRadius: '12px', padding: '1px 7px', fontSize: '11px' }}>{repo.badge}</span>
                                      </div>

                                      <p style={{ color: '#8b949e', fontSize: '12px', margin: '4px 0 0 0' }}>
                                        {repo.tech} &bull; <span style={{ color: '#58a6ff' }}>{repo.type}</span> &bull; {repo.year}
                                      </p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                      <button style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: '6px', padding: '5px 10px', color: '#c9d1d9', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span>⭐️ Star</span>
                                        <span style={{ borderLeft: '1px solid #30363d', paddingLeft: '6px' }}>▾</span>
                                      </button>
                                      {/* Mini activity graph line */}
                                      <svg viewBox="0 0 100 25" width="80" height="20">
                                        <path 
                                          d={[
                                            "M0 22 L15 22 L30 14 L45 20 L60 8 L75 16 L90 4 L100 22",
                                            "M0 20 L12 18 L25 5 L40 15 L55 10 L70 20 L85 2 L100 18",
                                            "M0 24 L18 20 L35 12 L50 22 L65 14 L80 6 L100 20",
                                            "M0 20 L15 10 L30 18 L45 6 L60 14 L75 4 L90 16 L100 10",
                                            "M0 22 L20 22 L35 15 L50 5 L65 18 L80 10 L100 22",
                                            "M0 18 L15 22 L30 10 L45 16 L60 6 L75 14 L90 8 L100 20",
                                            "M0 20 L10 15 L25 22 L40 8 L55 18 L70 5 L85 12 L100 22",
                                            "M0 22 L16 16 L32 8 L48 20 L64 12 L80 4 L100 18",
                                            "M0 18 L20 18 L35 8 L50 20 L65 4 L80 16 L100 10",
                                            "M0 20 L14 12 L28 22 L42 10 L56 18 L70 6 L84 14 L100 4",
                                            "M0 22 L15 18 L30 8 L45 14 L60 4 L75 20 L90 10 L100 18",
                                            "M0 20 L18 12 L36 20 L54 6 L72 16 L90 8 L100 22",
                                            "M0 24 L15 16 L30 6 L45 18 L60 10 L75 4 L90 14 L100 20",
                                            "M0 20 L12 10 L24 20 L36 4 L48 16 L60 8 L72 22 L84 12 L100 6"
                                          ][index % 14]} 
                                          fill="none" 
                                          stroke="#2ea043" 
                                          strokeWidth="2" 
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                ))}
                              </div>

                            </div>
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                  {activeBrowserTab === "ctf" && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
                      <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.2)', background: 'rgba(6, 182, 212, 0.05)', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#22d3ee', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Concordia CTF Competition Dashboard</h2>
                      </div>

                      {!cookieInjected ? (
                        <div style={{ padding: '32px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                          <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>🔒 ACCESS DENIED: SESSION COOKIE EXPIRED</p>
                          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '360px', fontSize: '11px', margin: 0, lineHeight: '1.4' }}>
                            Your browser does not have the required session cookie for ctf-portal.io. Authentication is required.
                          </p>
                          
                          {stage === 5 && narrationIndex === 18 && (
                            <button 
                              onClick={() => { playClick(); setCookieInjected(true); setNarrationIndex(19); }}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                background: '#06b6d4',
                                border: '1.5px solid #22d3ee',
                                color: '#020617',
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                cursor: 'pointer',
                                marginTop: '8px'
                              }}
                            >
                              Inject Stolen Session Cookie (ctf_session_59a2df308)
                            </button>
                          )}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>✅ SQLite Cookie Injected: ctf_session_59a2df308 verified</span>
                            <span style={{ fontWeight: 'bold' }}>[LOGGED IN]</span>
                          </div>

                          <div style={{ padding: '16px', background: 'rgba(2,6,23,0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>🏆 Ranjit's CTF & Hackathon Logbook:</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', marginTop: '6px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                                <span style={{ fontWeight: 'bold', color: '#22d3ee' }}>@hack 2025 CTF</span>
                                <span style={{ color: '#4ade80', fontWeight: 'bold' }}>1st Place Winner</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                                <span>SofiaPulse AI Hackathon</span>
                                <span style={{ color: '#facc15', fontWeight: 'bold' }}>2nd Place</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                                <span>ConcordiHacks 2025</span>
                                <span>Participant / Best UI Nominee</span>
                              </div>
                            </div>

                            <button 
                              onClick={() => { playClick(); setActiveBrowserTab("api"); if (stage === 5 && narrationIndex === 19) setNarrationIndex(20); }}
                              style={{
                                padding: '6px 14px',
                                borderRadius: '6px',
                                background: '#06b6d4',
                                border: 'none',
                                color: '#020617',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontFamily: 'monospace',
                                alignSelf: 'start',
                                marginTop: '8px'
                              }}
                            >
                              Query Achievements API &rarr;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeBrowserTab === "api" && (
                    <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#22d3ee' }}>
                      <p style={{ color: 'rgba(255,255,255,0.4)', paddingBottom: '8px', fontSize: '10px', margin: 0 }}>Response: HTTP/1.1 200 OK | Content-Type: application/json</p>
                      <pre style={{ padding: '16px', background: 'rgba(2,6,23,0.7)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflowX: 'auto', fontSize: '11px', margin: 0, color: '#22d3ee' }}>
{JSON.stringify({
  status: "success",
  user: "Ranjit-Singh-Dhunna",
  achievements: [
    {
      competition: "@hack 2025 CTF",
      role: "Security Engineer",
      rank: 1,
      score: 4200,
      timestamp: "2025-05-18",
      proof_hash: "ctf_proof_882fa71x00938"
    },
    {
      competition: "SofiaPulse Hackathon",
      role: "Fullstack AI Builder",
      rank: 2,
      score: 95.8,
      timestamp: "2025-12-10",
      proof_hash: "sp_ai_991f82ha7a82"
    }
  ]
}, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Bottom Right Resize Handle */}
                <div 
                  onMouseDown={(e) => startResize("browser", e)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '20px',
                    height: '20px',
                    cursor: 'nwse-resize',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderTopLeftRadius: '4px',
                    userSelect: 'none'
                  }}
                  title="Drag to resize window"
                >
                  <svg viewBox="0 0 16 16" width="10" height="10" fill="rgba(255,255,255,0.7)">
                    <path d="M14 14H10V12H14V14ZM14 10H6V8H14V10ZM14 6H2V4H14V6Z" />
                  </svg>
                </div>
              </div>
            )}

            {/* 3. INSTAGRAM MOBILE WINDOW */}
            {windows.instagram.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "instagram" ? "focused" : ""}`}
                style={{
                  display: windows.instagram.isMinimized ? 'none' : 'flex',
                  width: windows.instagram.w,
                  height: windows.instagram.h,
                  left: windows.instagram.x,
                  top: windows.instagram.y,
                  zIndex: windows.instagram.zIndex,
                }}
                onClick={() => focusWindow("instagram")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("instagram", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("instagram"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                  </div>
                  <span className="desk-window-title" style={{ color: '#ec4899' }}>Instagram Feed</span>
                </div>

                <div className="desk-window-content" style={{ background: '#000000', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                    {!instaLoggedIn ? (
                      <div className="desk-insta-login">
                        <h2 style={{ textAlign: 'center', fontFamily: 'serif', fontSize: '28px', margin: '0 0 10px 0', background: 'linear-gradient(to right, #eab308, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>Instagram</h2>
                        
                        <form onSubmit={handleInstagramLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {instaError && (
                            <p style={{ color: '#ef4444', fontSize: '11px', textAlign: 'center', fontWeight: 'bold', margin: 0 }}>{instaError}</p>
                          )}
                          
                          <div className="desk-insta-input-group">
                            <label>Username</label>
                            <input 
                              type="text" 
                              placeholder="Instagram ID from OSINT..." 
                              value={instaUser}
                              onChange={(e) => setInstaUser(e.target.value)}
                              className="desk-insta-input"
                            />
                          </div>
                          
                          <div className="desk-insta-input-group">
                            <label>Password</label>
                            <input 
                              type="password" 
                              placeholder="Harvested password..." 
                              value={instaPass}
                              onChange={(e) => setInstaPass(e.target.value)}
                              className="desk-insta-input"
                            />
                          </div>

                          <button type="submit" className="desk-insta-btn">
                            LOG IN
                          </button>
                        </form>
                      </div>
                    ) : (
                      /* 1-TO-1 INSTAGRAM PROFILE GRID & MODAL VIEW MATCHING IMAGE 1 AND IMAGE 2 */
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
                        
                        {/* 1. INSTAGRAM PROFILE HEADER NAV */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #262626' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px', fontWeight: '700', color: '#f5f5f5' }}>ranjitdhunna2213</span>
                            <span style={{ background: '#0095f6', color: 'white', borderRadius: '50%', width: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' }}>✓</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '18px', cursor: 'pointer', color: '#f5f5f5' }}>⚙️</span>
                          </div>
                        </div>

                        {/* 2. PROFILE INFO HEADER */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '0 8px' }}>
                          {/* Story Avatar Circle */}
                          <div style={{
                            width: '76px',
                            height: '76px',
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#000000', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#0095f6' }}>
                                RD
                              </div>
                            </div>
                          </div>

                          {/* Stats Row */}
                          <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', textAlign: 'center' }}>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: '700', color: '#f5f5f5' }}>1</div>
                              <div style={{ fontSize: '13px', color: '#a8a8a8' }}>posts</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: '700', color: '#f5f5f5' }}>1.4k</div>
                              <div style={{ fontSize: '13px', color: '#a8a8a8' }}>followers</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: '700', color: '#f5f5f5' }}>850</div>
                              <div style={{ fontSize: '13px', color: '#a8a8a8' }}>following</div>
                            </div>
                          </div>
                        </div>

                        {/* Bio Text */}
                        <div style={{ fontSize: '13px', lineHeight: '1.4', padding: '0 8px' }}>
                          <div style={{ fontWeight: '700', color: '#f5f5f5', fontSize: '14px' }}>Ranjit Singh Dhunna</div>
                          <div style={{ color: '#a8a8a8', marginTop: '2px' }}>Software Engineering @ Concordia University '28 🇨🇦</div>
                          <div style={{ color: '#f5f5f5', marginTop: '2px' }}>📍 Based in Montreal, Quebec, Canada</div>
                        </div>

                        {/* 3. NEW HIGHLIGHT CIRCLE MATCHING IMAGE 1 */}
                        <div style={{ display: 'flex', gap: '20px', padding: '6px 8px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #363636', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '28px', color: '#a8a8a8', fontWeight: '300' }}>+</span>
                            </div>
                            <span style={{ fontSize: '12px', color: '#f5f5f5', fontWeight: '600' }}>New</span>
                          </div>
                        </div>

                        {/* 4. GRID ICON NAVIGATION HEADER MATCHING IMAGE 1 */}
                        <div style={{ display: 'flex', borderTop: '1px solid #262626', borderBottom: '1px solid #262626', marginTop: '4px' }}>
                          <div style={{ flex: 1, padding: '12px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #f5f5f5', color: '#f5f5f5', cursor: 'pointer' }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z" />
                            </svg>
                          </div>
                          <div style={{ flex: 1, padding: '12px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#a8a8a8', cursor: 'pointer' }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                          </div>
                          <div style={{ flex: 1, padding: '12px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#a8a8a8', cursor: 'pointer' }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M23 4v6h-6M1 20v-6h6" />
                              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                          </div>
                          <div style={{ flex: 1, padding: '12px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#a8a8a8', cursor: 'pointer' }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                        </div>

                        {/* 5. PHOTO THUMBNAILS GRID (SINGLE 1 POST THUMBNAIL) - CLICKING OPENS POST MODAL (IMAGE 2) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '6px' }}>
                          <div 
                            onClick={() => setSelectedInstaPost(true)}
                            style={{ position: 'relative', aspectRatio: '1/1', background: '#121212', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
                          >
                            <img src="/trops.jpeg" alt="Post 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', padding: '4px' }}>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* 6. POST MODAL POPUP OVERLAY (IMAGE 2 REPLICA) */}
                        {selectedInstaPost && (
                          <div 
                            onClick={() => setSelectedInstaPost(false)}
                            style={{
                              position: 'fixed',
                              inset: 0,
                              background: 'rgba(0, 0, 0, 0.85)',
                              zIndex: 9999,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '20px'
                            }}
                          >
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                width: '100%',
                                maxWidth: '920px',
                                maxHeight: '85vh',
                                background: '#000000',
                                border: '1px solid #262626',
                                borderRadius: '8px',
                                display: 'flex',
                                overflow: 'hidden',
                                position: 'relative'
                              }}
                            >

                              {/* Left Side: Photo Carousel */}
                              <div style={{ flex: '1.3', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '380px' }}>
                                <img 
                                  src={instaPostImgIndex === 0 ? "/trops.jpeg" : "/certis.jpeg"} 
                                  alt="Modal Post Content"
                                  style={{ width: '100%', maxHeight: '520px', objectFit: 'contain' }}
                                />

                                {instaPostImgIndex > 0 && (
                                  <button 
                                    onClick={() => setInstaPostImgIndex(0)}
                                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', color: 'black', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                                  >
                                    &#10094;
                                  </button>
                                )}

                                {instaPostImgIndex < 1 && (
                                  <button 
                                    onClick={() => setInstaPostImgIndex(1)}
                                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', color: 'black', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                                  >
                                    &#10095;
                                  </button>
                                )}

                                <div style={{ position: 'absolute', bottom: '12px', display: 'flex', gap: '6px' }}>
                                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: instaPostImgIndex === 0 ? '#0095f6' : 'rgba(255,255,255,0.4)' }} />
                                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: instaPostImgIndex === 1 ? '#0095f6' : 'rgba(255,255,255,0.4)' }} />
                                </div>
                              </div>

                              {/* Right Side: Comments & Standard Vector Action Bar */}
                              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #262626', background: '#000000' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #262626' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0095f6' }}>
                                      RD
                                    </div>
                                    <div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#f5f5f5' }}>ranjitdhunna2213</span>
                                        <span style={{ background: '#0095f6', color: 'white', borderRadius: '50%', width: '13px', height: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 'bold' }}>✓</span>
                                      </div>
                                      <span style={{ fontSize: '11px', color: '#a8a8a8' }}>Montreal, Quebec</span>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '18px', color: '#f5f5f5', cursor: 'pointer' }}>&bull;&bull;&bull;</span>
                                </div>

                                <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                  <div style={{ fontSize: '13px', lineHeight: '1.4', color: '#f5f5f5' }}>
                                    <span style={{ fontWeight: '700', marginRight: '6px' }}>ranjitdhunna2213</span>
                                    Stacking Ws Since DAY 1  🏆📜 #achivments
                                  </div>

                                  {instaComments.map((c, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '13px' }}>
                                      <div>
                                        <span style={{ fontWeight: '700', color: '#f5f5f5', marginRight: '6px' }}>{c.user}</span>
                                        <span style={{ color: '#d4d4d4' }}>{c.text}</span>
                                      </div>
                                      <span style={{ fontSize: '11px', color: '#a8a8a8', cursor: 'pointer' }}>🤍</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Standard Vector SVG Action Bar */}
                                <div style={{ padding: '12px 16px', borderTop: '1px solid #262626', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                      <button 
                                        onClick={() => setInstaPostLiked(!instaPostLiked)} 
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                      >
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill={instaPostLiked ? "#ef4444" : "none"} stroke={instaPostLiked ? "#ef4444" : "#f5f5f5"} strokeWidth="2">
                                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                      </button>
                                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f5f5f5" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                      </svg>
                                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f5f5f5" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                      </svg>
                                    </div>
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f5f5f5" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                    </svg>
                                  </div>

                                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f5f5f5' }}>
                                    Liked by <span style={{ fontWeight: '600' }}>ekam_preet_215</span> and <span style={{ fontWeight: '700' }}>{instaPostLiked ? 349 : 348} others</span>
                                  </div>

                                  <div style={{ fontSize: '10px', color: '#a8a8a8', textTransform: 'uppercase' }}>
                                    JULY 13, 2024
                                  </div>

                                  <form 
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      if (newCommentInput.trim()) {
                                        setInstaComments([...instaComments, { user: "you", text: newCommentInput.trim() }]);
                                        setNewCommentInput("");
                                      }
                                    }}
                                    style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #1a1a1a', paddingTop: '10px', marginTop: '4px' }}
                                  >
                                    <input 
                                      type="text"
                                      placeholder="Add a comment..."
                                      value={newCommentInput}
                                      onChange={(e) => setNewCommentInput(e.target.value)}
                                      style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '13px', outline: 'none' }}
                                    />
                                    {newCommentInput.trim() && (
                                      <button type="submit" style={{ background: 'none', border: 'none', color: '#0095f6', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                                        Post
                                      </button>
                                    )}
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Right Resize Handle */}
                <div 
                  onMouseDown={(e) => startResize("instagram", e)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '20px',
                    height: '20px',
                    cursor: 'nwse-resize',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderTopLeftRadius: '4px',
                    userSelect: 'none'
                  }}
                  title="Drag to resize window"
                >
                  <svg viewBox="0 0 16 16" width="10" height="10" fill="rgba(255,255,255,0.7)">
                    <path d="M14 14H10V12H14V14ZM14 10H6V8H14V10ZM14 6H2V4H14V6Z" />
                  </svg>
                </div>
              </div>
            )}

            {/* 4. CODE EDITOR WINDOW */}
            {windows.editor.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "editor" ? "focused" : ""}`}
                style={{
                  display: windows.editor.isMinimized ? 'none' : 'flex',
                  width: windows.editor.isMaximized ? '100%' : `${windows.editor.w}px`,
                  height: windows.editor.isMaximized ? '100%' : `${windows.editor.h}px`,
                  left: windows.editor.isMaximized ? '0' : `${windows.editor.x}px`,
                  top: windows.editor.isMaximized ? '0' : `${windows.editor.y}px`,
                  zIndex: windows.editor.zIndex,
                }}
                onClick={() => focusWindow("editor")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("editor", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("editor"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                  </div>
                  <span className="desk-window-title">Text Editor - Note.txt</span>
                </div>

                <div className="desk-window-content" style={{ display: 'flex' }}>
                  <div className="desk-editor-tree">
                    <p style={{ color: 'white', margin: '0 0 10px 0' }}>workspace</p>
                    <p style={{ color: '#14b8a6', margin: 0, cursor: 'pointer' }}>📄 Note.txt</p>
                  </div>

                  <div className="desk-editor-viewport">
                    {narrationIndex >= 21 ? (
                      <div className="desk-editor-note">
                        <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 6px 0', fontWeight: 'bold' }}>&bull; Note.txt</p>
                        <p style={{ color: '#f97316', fontWeight: 'bold', margin: '0 0 16px 0' }}>// INTERCONNECTION TERMINATED BY REMOTE SYSTEM OWNER</p>
                        
                        <p style={{ margin: '0 0 8px 0' }}>Hey there, Hacker!</p>
                        <p style={{ margin: '0 0 8px 0' }}>I noticed you remote into my AnyDesk desktop session, harvested clipboard history buffers, extracted SQLite cookies, and read my breach dossier logs.</p>
                        <p style={{ margin: '0 0 16px 0' }}>You did an excellent job. I actually designed this entire workspace as an interactive cybersecurity-themed portfolio to showcase my full-stack and deep learning engineering skills.</p>
                        
                        <div className="desk-editor-buttons">
                          <div className="desk-editor-btn-row">
                            <span style={{ color: 'white', fontSize: '11px' }}>👔 Professional network:</span>
                            <a 
                              href="https://www.linkedin.com/in/ranjit-singh-dhunna-772790307" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="desk-editor-link-btn"
                              style={{ background: '#14b8a6', color: '#09090b' }}
                            >
                              LinkedIn Connect
                            </a>
                          </div>
                          <div className="desk-editor-btn-row">
                            <span style={{ color: 'white', fontSize: '11px' }}>📧 Direct contact:</span>
                            <a 
                              href="mailto:ranjit@dhunna.com"
                              className="desk-editor-link-btn"
                              style={{ border: '1px solid #14b8a6', color: '#14b8a6' }}
                            >
                              ranjit@dhunna.com
                            </a>
                          </div>
                          <div className="desk-editor-btn-row">
                            <span style={{ color: 'white', fontSize: '11px' }}>🐙 Public code repos:</span>
                            <a 
                              href="https://github.com/Ranjit-Singh-Dhunna" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="desk-editor-link-btn"
                              style={{ background: '#27272a', color: '#14b8a6', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              GitHub Profile
                            </a>
                          </div>
                        </div>
                        <p style={{ margin: '16px 0 4px 0', fontWeight: 'bold', color: 'white' }}>Cheers,</p>
                        <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '13px' }}>Ranjit Singh Dhunna</p>
                      </div>
                    ) : (
                      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9cdcfe', lineHeight: '1.5' }}>
                        <span className="code-comment">// Text Editor - Active Workspace</span><br />
                        <span className="code-keyword">var</span> taskAreaCounter = <span className="code-number">0</span>;<br />
                        <span className="code-keyword">var</span> timeDivIdCounter = <span className="code-number">0</span>;<br />
                        <span className="code-keyword">var</span> focusedTextArea;<br />
                        <span className="code-keyword">var</span> outputTime;<br /><br />
                        <span className="code-keyword">function</span> <span className="code-function">textToTime</span>(input) &#125;<br />
                        &nbsp;&nbsp;<span className="code-keyword">var</span> pm = <span className="code-keyword">false</span>;<br />
                        &nbsp;&nbsp;<span className="code-keyword">var</span> colonLocation;<br />
                        &nbsp;&nbsp;<span className="code-keyword">var</span> inputArray = Array.from(input);<br />
                        &nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-keyword">let</span> index = <span className="code-number">0</span>; index &lt; inputArray.length; index++) &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">const</span> element = inputArray[index];<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (!isNaN(inputArray[index])) &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">switch</span> (<span className="code-keyword">true</span>) &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> (inputArray[index] === <span className="code-string">'p'</span> || inputArray[index] === <span className="code-string">'P'</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pm = <span className="code-keyword">true</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inputArray.splice(index, <span className="code-number">1</span>);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index = index - <span className="code-number">1</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> (inputArray[index] === <span className="code-string">'a'</span> || inputArray[index] === <span className="code-string">'A'</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inputArray.splice(index, <span className="code-number">1</span>);<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index = index - <span className="code-number">1</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> (inputArray[index] === <span className="code-string">':'</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;colonLocation = index;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        &nbsp;&nbsp;&#125;<br />
                        &nbsp;&nbsp;&#125;<br />
                        &#125;
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. RESUME DOSSIER WINDOW */}
            {windows.resume.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "resume" ? "focused" : ""}`}
                style={{
                  display: windows.resume.isMinimized ? 'none' : 'flex',
                  width: windows.resume.isMaximized ? '100%' : `${windows.resume.w}px`,
                  height: windows.resume.isMaximized ? '100%' : `${windows.resume.h}px`,
                  left: windows.resume.isMaximized ? '0' : `${windows.resume.x}px`,
                  top: windows.resume.isMaximized ? '0' : `${windows.resume.y}px`,
                  zIndex: windows.resume.zIndex,
                }}
                onClick={() => focusWindow("resume")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("resume", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("resume"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                  </div>
                  <span className="desk-window-title">Target Dossier Resume - Ranjit</span>
                </div>

                <div className="desk-window-content" style={{ padding: '24px', boxSizing: 'border-box', background: '#070c18', overflowY: 'auto' }}>
                  <div style={{ borderBottom: '1px solid rgba(6, 182, 212, 0.2)', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'start', fontFamily: 'monospace', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0, letterSpacing: '1px' }}>RANJIT SINGH DHUNNA</h2>
                      <p style={{ fontSize: '10px', color: '#06b6d4', margin: '4px 0 0 0' }}>COMPILATION DUMP &bull; SYSTEM HACK DOSSIER</p>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '2px 8px', borderRadius: '4px' }}>CONFIDENTIAL</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#06b6d4', fontSize: '11px', textTransform: 'uppercase' }}>1. Personal Profile</h4>
                      <p style={{ margin: '0 0 4px 0' }}><strong style={{ color: 'rgba(255,255,255,0.6)' }}>Email:</strong> ranjit@dhunna.com</p>
                      <p style={{ margin: '0 0 4px 0' }}><strong style={{ color: 'rgba(255,255,255,0.6)' }}>Location:</strong> Montreal, QC, Canada &bull; Concordia Uni represent</p>
                      <p style={{ margin: 0 }}><strong style={{ color: 'rgba(255,255,255,0.6)' }}>LinkedIn:</strong> linkedin.com/in/ranjit-singh-dhunna-772790307</p>
                    </div>

                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <h4 style={{ margin: 0, color: '#06b6d4', fontSize: '11px', textTransform: 'uppercase' }}>2. Experience History</h4>
                      <div>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>SofiaPulse &bull; Fullstack & Applied AI Developer</p>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>Dec 2025 - Jan 2026</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>Immense Star Solutions &bull; Software Intern</p>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>May 2026 - Aug 2026</p>
                      </div>
                    </div>

                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#06b6d4', fontSize: '11px', textTransform: 'uppercase' }}>3. Public Repositories (GitHub)</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '10px' }}>
                        <p style={{ margin: 0 }}>&bull; skin-lesion-cnn</p>
                        <p style={{ margin: 0 }}>&bull; Predicting-Churn-DTC-RFC</p>
                        <p style={{ margin: 0 }}>&bull; HEALTH-COMPANION-APP-</p>
                        <p style={{ margin: 0 }}>&bull; Events-TicketingApp</p>
                        <p style={{ margin: 0 }}>&bull; Flux</p>
                        <p style={{ margin: 0 }}>&bull; Outfit-Recommendation-System</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. ANYDESK CONNECTION DETAILS WINDOW */}
            {windows.anydesk?.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "anydesk" ? "focused" : ""}`}
                style={{
                  display: windows.anydesk.isMinimized ? 'none' : 'flex',
                  width: `${windows.anydesk.w}px`,
                  height: `${windows.anydesk.h}px`,
                  left: `${windows.anydesk.x}px`,
                  top: `${windows.anydesk.y}px`,
                  zIndex: windows.anydesk.zIndex,
                }}
                onClick={() => focusWindow("anydesk")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("anydesk", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("anydesk"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                  </div>
                  <span className="desk-window-title">AnyDesk - Target Status</span>
                </div>
                <div className="desk-window-content" style={{ padding: '20px', fontFamily: 'monospace', fontSize: '11px', color: '#f87171', background: '#0e0b16' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '10px', marginBottom: '14px' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                      <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#ef4444" />
                      <path d="M12 6l6 6-6 6-6-6 6-6z" fill="#ffffff" />
                    </svg>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '13px', color: 'white', fontWeight: 'bold' }}>AnyDesk Controller</h3>
                      <p style={{ margin: 0, color: '#4ade80', fontSize: '9px' }}>STATUS: CONNECTED &bull; ACTIVE SHIFT</p>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 6px 0' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>Target Host:</span> Ranjit-Singh-Dhunna-PC</p>
                  <p style={{ margin: '0 0 6px 0' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>IP Address:</span> 198.51.100.42 (Concordia network node)</p>
                  <p style={{ margin: '0 0 6px 0' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>Tunnel ID:</span> 482-901-772</p>
                  <p style={{ margin: '0 0 12px 0' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>Security:</span> TLS 1.3 / AES-256 GCM encrypted link</p>
                  <div style={{ padding: '8px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '6px', color: '#4ade80', fontSize: '10px' }}>
                    ✅ Remote control session stable. Ready for payloads.
                  </div>
                </div>
              </div>
            )}

            {/* 7. CREDENTIALS & OSINT LOGBOOK WINDOW */}
            {windows.intel?.isOpen && (
              <div 
                className={`desk-window ${activeWindow === "intel" ? "focused" : ""}`}
                style={{
                  display: windows.intel.isMinimized ? 'none' : 'flex',
                  width: `${windows.intel.w}px`,
                  height: `${windows.intel.h}px`,
                  left: `${windows.intel.x}px`,
                  top: `${windows.intel.y}px`,
                  zIndex: windows.intel.zIndex,
                }}
                onClick={() => focusWindow("intel")}
              >
                <div className="desk-window-header" onMouseDown={(e) => startDrag("intel", e)}>
                  <div className="desk-window-controls">
                    <div className="desk-window-dot red" onClick={(e) => { e.stopPropagation(); closeWindow("intel"); }} onMouseDown={(e) => e.stopPropagation()} title="Close Window">
                      <span>✕</span>
                    </div>
                    <div className="desk-window-dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow("intel"); }} onMouseDown={(e) => e.stopPropagation()} title="Minimize">
                      <span>−</span>
                    </div>
                    <div className="desk-window-dot green" onClick={(e) => { e.stopPropagation(); toggleMaximize("intel"); }} onMouseDown={(e) => e.stopPropagation()} title="Maximize">
                      <span>+</span>
                    </div>
                  </div>
                  <span className="desk-window-title">Credentials & OSINT Dossier</span>
                  <button 
                    className="desk-window-close-btn" 
                    onClick={(e) => { e.stopPropagation(); closeWindow("intel"); }}
                    onMouseDown={(e) => e.stopPropagation()}
                    title="Close Window"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="desk-window-content" style={{ padding: '20px', fontFamily: 'monospace', fontSize: '11px', color: '#22d3ee', background: '#080f1a', overflowY: 'auto' }}>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', marginBottom: '14px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', margin: '0 0 4px 0' }}>OSINT PROFILE</p>
                    <p style={{ fontWeight: 'bold', color: 'white', fontSize: '13px', margin: '0 0 6px 0' }}>Ranjit Singh Dhunna</p>
                    {emailExtracted ? (
                      <p style={{ color: '#eab308', margin: 0 }}>Email: ranjit@dhunna.com</p>
                    ) : (
                      <p style={{ color: 'rgba(255,255,255,0.25)', margin: 0 }}>Email: [REDACTED]</p>
                    )}
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', margin: '0 0 4px 0' }}>HARVESTED PLOT INTEL</p>
                    <p style={{ margin: 0, color: emailExtracted ? '#4ade80' : 'rgba(255,255,255,0.3)' }}>
                      {emailExtracted ? "✓ LinkedIn: Stalked Email" : "• LinkedIn: Pending"}
                    </p>
                    <p style={{ margin: 0, color: stage >= 3 ? '#4ade80' : 'rgba(255,255,255,0.3)' }}>
                      {stage >= 3 ? "✓ GitHub: Ranjit-Singh-Dhunna" : "• GitHub: Pending"}
                    </p>
                    <p style={{ margin: 0, color: instaLoggedIn ? '#4ade80' : 'rgba(255,255,255,0.3)' }}>
                      {instaLoggedIn ? "✓ Instagram: Password Stolen" : "• Instagram: Locked"}
                    </p>
                    <p style={{ margin: 0, color: cookieInjected ? '#4ade80' : 'rgba(255,255,255,0.3)' }}>
                      {cookieInjected ? "✓ SQLite Cookie: ctf_session_59a2df308" : "• SQLite Cookie: Locked"}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
