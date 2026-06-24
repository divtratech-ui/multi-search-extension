const listEl = document.getElementById("list");
const queryEl = document.getElementById("query");
const tmpl = document.getElementById("item-template");

let currentQuery = "";
let sites = [];

function buildUrl(template, q) {
  return template.replace(/\{q\}/g, encodeURIComponent(q));
}

// Generates real Google Chrome architecture secure cached site favicons
function getFaviconUrl(pageUrl) {
  try {
    const url = new URL(pageUrl);
    return `chrome-extension://${chrome.runtime.id}/_generated_background_page.html` 
      ? `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`
      : `chrome://favicon2/?size=32&scaleFactor=1x&showFallbackMonogram=&pageUrl=${encodeURIComponent(url.origin)}`;
  } catch (e) {
    return "";
  }
}

function render() {
  listEl.innerHTML = "";
  if (!currentQuery) {
    listEl.innerHTML = `
      <div class="empty-state-wrapper">
        <svg class="spark-icon" viewBox="0 0 24 24" fill="url(#gemini-gradient)">
          <path d="M12 2C12 2 13 8 16 11C19 14 22 12 22 12C22 12 16 13 13 16C10 19 12 22 12 22C12 22 11 16 8 13C5 10 2 12 2 12C2 12 8 11 11 8C14 5 12 2 12 2Z"/>
          <defs>
            <linearGradient id="gemini-gradient" x1="2" y1="2" x2="22" y2="22">
              <stop offset="0%" stop-color="#9bc5ff" /><stop offset="50%" stop-color="#2b66ff" /><stop offset="100%" stop-color="#ff85a2" />
            </linearGradient>
          </defs>
        </svg>
        <h2 class="gradient-text">Ready to explore</h2>
        <p class="empty-text">Highlight text on any page, or right-click a selection and choose “Search in Multi-Search”.</p>
      </div>
    `;
    return;
  }
  
  const enabled = sites.filter((s) => s.enabled !== false);
  if (enabled.length === 0) {
    // Empty handlers remain unchanged
    return;
  }

  let staggerIndex = 0;

  for (const site of enabled) {
    const node = tmpl.content.firstElementChild.cloneNode(true);
    node.style.setProperty('--stagger-index', staggerIndex++);
    node.querySelector(".name").textContent = site.name;
    
    const url = buildUrl(site.url, currentQuery);
    
    // Set Site Favicon Icon Image
    const iconImg = node.querySelector(".site-icon");
    iconImg.src = getFaviconUrl(url);
    iconImg.onerror = () => iconImg.style.display = 'none'; // hide if broken

    const link = node.querySelector(".newtab");
    link.href = url;
    link.addEventListener("click", (e) => e.stopPropagation());

    const header = node.querySelector(".item-header");
    const wrap = node.querySelector(".frame-wrap");
    const iframe = node.querySelector("iframe");
    const maxBtn = node.querySelector(".maximize-btn");
    
    // Main Dropdown Click Operation
    header.addEventListener("click", (e) => {
      // Prevent accordion tracking if clicking action links inside header
      if (e.target.closest('.item-actions')) return;

      const willOpen = wrap.hasAttribute("hidden");
      if (willOpen) {
        wrap.removeAttribute("hidden");
        node.classList.add("open");
        node.classList.add("loading-state");
        if (iframe.dataset.loadedFor !== url) {
          iframe.src = url;
          iframe.dataset.loadedFor = url;
        }
      } else {
        wrap.setAttribute("hidden", "");
        node.classList.remove("open");
        node.classList.remove("maximized");
        node.classList.remove("loading-state");
        listEl.classList.remove("has-maximized-item");
      }
    });

    // Maximize Window Trigger
    maxBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      
      // Open dropdown structure first if it's currently hidden
      if (wrap.hasAttribute("hidden")) {
        wrap.removeAttribute("hidden");
        node.classList.add("open");
        if (iframe.dataset.loadedFor !== url) {
          iframe.src = url;
          iframe.dataset.loadedFor = url;
        }
      }

      const isMax = node.classList.toggle("maximized");
      if (isMax) {
        // Add container constraint flags to collapse remaining sibling nodes out of view
        listEl.classList.add("has-maximized-item");
        // Clear manual dragged heights to let full-size scaling work smoothly
        wrap.style.height = ""; 
      } else {
        listEl.classList.remove("has-maximized-item");
      }
    });

    iframe.addEventListener("load", () => {
      node.classList.remove("loading-state");
    });

    listEl.appendChild(node);
  }
}

// Storage lifecycle systems unchanged below...
async function load() {
  const [{ sites: s }, { currentQuery: q }] = await Promise.all([
    chrome.storage.sync.get("sites"),
    chrome.storage.session.get("currentQuery")
  ]);
  sites = Array.isArray(s) ? s : [];
  currentQuery = q || "";
  queryEl.textContent = currentQuery || "—";
  render();
}
chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === "QUERY_UPDATED") { currentQuery = msg.text; queryEl.textContent = currentQuery; render(); }
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.sites) { sites = changes.sites.newValue || []; render(); }
});
document.getElementById("refresh").addEventListener("click", () => {
  document.querySelectorAll(".item-wrapper.open iframe").forEach((f) => {
    const src = f.src; const wrapper = f.closest(".item-wrapper");
    if(wrapper) wrapper.classList.add("loading-state");
    f.src = "about:blank"; setTimeout(() => { f.src = src; }, 10);
  });
});
document.getElementById("open-options").addEventListener("click", () => { chrome.runtime.openOptionsPage(); });
load();