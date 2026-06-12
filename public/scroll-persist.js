(function() {
  try {
    if (typeof window === 'undefined') return;
    
    var path = window.location.pathname;
    var storageKey = '';
    if (path === '/pixel' || path.endsWith('/pixel')) {
      storageKey = 'pixel-scroll-pos';
    }
    if (!storageKey) return;

    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    var saved = sessionStorage.getItem(storageKey);
    var pos = saved ? parseInt(saved, 10) : 0;
    console.log("[VanillaScroll] Path:", path, "Key:", storageKey, "Saved Pos:", pos);

    // Diagnostics on load
    window.addEventListener('DOMContentLoaded', function() {
      var docEl = document.documentElement;
      var body = document.body;
      console.log("[VanillaScroll] DOMContentLoaded heights: " +
        "window.innerHeight=" + window.innerHeight + ", " +
        "docEl.scrollHeight=" + (docEl ? docEl.scrollHeight : 'n/a') + ", " +
        "docEl.clientHeight=" + (docEl ? docEl.clientHeight : 'n/a') + ", " +
        "body.scrollHeight=" + (body ? body.scrollHeight : 'n/a') + ", " +
        "body.clientHeight=" + (body ? body.clientHeight : 'n/a')
      );
    });

    var hideStyle = null;
    if (pos > 0) {
      // Determine background color to match page theme and prevent white flash
      var bg = '#000000'; // Default black for pixel theme
      if (path === '/' || path === '') {
        bg = '#E9E3DE'; // Match main page background
      }
      hideStyle = document.createElement('style');
      hideStyle.id = 'scroll-persist-hide';
      hideStyle.textContent = 'html { background-color: ' + bg + ' !important; } body { opacity: 0 !important; }';
      document.head.appendChild(hideStyle);
      console.log("[VanillaScroll] Hiding body content, matched background:", bg);
    }

    function reveal() {
      if (hideStyle && hideStyle.parentNode) {
        hideStyle.parentNode.removeChild(hideStyle);
        hideStyle = null;
      }
      var extra = document.getElementById('scroll-persist-hide');
      if (extra && extra.parentNode) {
        extra.parentNode.removeChild(extra);
      }
      console.log("[VanillaScroll] Page revealed");
    }

    if (pos > 0) {
      var attempts = 0;
      var maxAttempts = 100;
      var interval = setInterval(function() {
        // Scroll all possible containers
        window.scrollTo(0, pos);
        if (document.documentElement) document.documentElement.scrollTop = pos;
        if (document.body) {
          document.body.scrollTop = pos;
          if (typeof document.body.scrollTo === 'function') {
            document.body.scrollTo(0, pos);
          }
        }

        // Read the current scroll position from the actual scrolling container (body)
        var current = window.scrollY || 
                      (document.documentElement ? document.documentElement.scrollTop : 0) || 
                      (document.body ? document.body.scrollTop : 0) || 
                      0;
        attempts++;

        // Check if we succeeded
        if (Math.abs(current - pos) < 10 || attempts >= maxAttempts) {
          clearInterval(interval);
          reveal();
          console.log("[VanillaScroll] Scroll restored to:", current, "after attempts:", attempts);
        }
      }, 10);

      window.addEventListener('load', function() {
        clearInterval(interval);
        reveal();
      });

      setTimeout(function() {
        clearInterval(interval);
        reveal();
      }, 1000); // 1s failsafe
    }

    var isRestoring = pos > 0;
    var isUnloading = false;
    
    setTimeout(function() {
      isRestoring = false;
      console.log("[VanillaScroll] isRestoring set to false");
    }, 1000);

    function saveScroll(e) {
      var target = e && e.target ? e.target : 'unknown';
      var targetName = (target === window) ? 'window' : (target === document) ? 'document' : (target.tagName || 'unknown');
      
      var docEl = document.documentElement;
      var body = document.body;
      
      var y = Math.round(
        window.scrollY || 
        (docEl ? docEl.scrollTop : 0) || 
        (body ? body.scrollTop : 0) || 
        (target && target.scrollTop ? target.scrollTop : 0) || 
        0
      );

      console.log("[VanillaScroll] Scroll event caught. Target:", targetName, "y:", y);

      if (isRestoring || isUnloading) return;

      sessionStorage.setItem(storageKey, String(y));
    }

    // Capture scroll events at the capture phase to intercept any container scrolling
    window.addEventListener('scroll', saveScroll, { passive: true, capture: true });
    document.addEventListener('scroll', saveScroll, { passive: true, capture: true });
    
    // Save on unload/beforeunload
    window.addEventListener('beforeunload', function() {
      console.log("[VanillaScroll] beforeunload triggered");
      saveScroll();
      isUnloading = true;
    });
    window.addEventListener('pagehide', function() {
      console.log("[VanillaScroll] pagehide triggered");
      saveScroll();
      isUnloading = true;
    });
  } catch (e) {
    console.error("[VanillaScroll] Error:", e);
  }
})();
