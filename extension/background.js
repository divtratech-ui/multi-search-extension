const DEFAULT_SITES = [
  { id: "google", name: "Google", url: "https://www.google.com/search?q={q}", enabled: true }
];

async function ensureDefaults() {
  const { sites } = await chrome.storage.sync.get("sites");
  if (!sites || !Array.isArray(sites) || sites.length === 0) {
    await chrome.storage.sync.set({ sites: DEFAULT_SITES });
  }
}

async function openPanel(tab) {
  if (!tab || tab.id == null) return;

  const openPromise = chrome.sidePanel.open({ tabId: tab.id }).catch(async () => {
    if (tab.windowId != null) {
      try { await chrome.sidePanel.open({ windowId: tab.windowId }); } catch (err) {}
    }
  });

  try {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: "sidepanel.html",
      enabled: true
    });
  } catch (e) {}

  await openPromise;
}

async function setQuery(text) {
  await chrome.storage.session.set({ currentQuery: text, queryAt: Date.now() });
  try {
    await chrome.runtime.sendMessage({ type: "QUERY_UPDATED", text });
  } catch (e) { /* no listeners yet */ }
}

chrome.runtime.onInstalled.addListener(async () => {
  await ensureDefaults();
  try {
    chrome.contextMenus.create({
      id: "multi-search-selection",
      title: 'Search "%s" in Multi-Search side panel',
      contexts: ["selection"]
    });
  } catch (e) { /* already exists */ }

  try {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch (e) {}
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "SELECTION" && typeof msg.text === "string" && msg.text.trim()) {
    setQuery(msg.text.trim());
    sendResponse({ ok: true });
  }
  return true;
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "multi-search-selection") return;
  const text = (info.selectionText || "").trim();
  if (!text) return;

  await openPanel(tab);
  await setQuery(text);
});

chrome.action.onClicked.addListener(async (tab) => {
  await openPanel(tab);
});


/* ==========================================================================
   ADVANCED AUTOMATED SEARCH QUERY PATTERN DETECTOR ENGINE
   ========================================================================== */
const TEST_SIGNATURE = "TEST_123456789";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.action === "DISCOVER_PATTERN") {
    runDiscoveryEngine(message.url)
      .then((pattern) => sendResponse({ success: true, pattern }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // Keep message channel open for async execution
  }
});

async function runDiscoveryEngine(targetUrl) {
  // 1. Opens the site in an inactive/hidden background tab so it doesn't interrupt the user
  const tab = await chrome.tabs.create({ url: targetUrl, active: false });

  return new Promise((resolve, reject) => {
    let hasResolved = false;

    // Safety timeout to prevent infinite loops if a site blocks scripts or doesn't redirect
    const timeoutGuard = setTimeout(() => {
      if (hasResolved) return;
      cleanup();
      reject(new Error("Pattern discovery timed out."));
    }, 12000);

    // Watcher tracking tab changes to detect if the URL switches to include our signature phrase
    const updateListener = (tabId, changeInfo) => {
      if (tabId !== tab.id) return;
      
      if (changeInfo.url && changeInfo.url.includes(TEST_SIGNATURE)) {
        hasResolved = true;
        const patternUrl = changeInfo.url.replace(TEST_SIGNATURE, "{q}");
        cleanup();
        resolve(patternUrl);
      }
    };

    // Watcher waiting for DOM to settle down before forcefully injecting automation scripts
    const loadListener = async (tabId, changeInfo) => {
      if (tabId !== tab.id || changeInfo.status !== "complete") return;
      
      // Brief delay to let client framework hydrate components safely
      await new Promise((r) => setTimeout(r, 1200));
      if (hasResolved) return;

      try {
        // 2. Injects custom execution context script securely into target tab frame
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: performFormInteractionDiscovery,
          args: [TEST_SIGNATURE]
        });
      } catch (err) {
        // Ignore execution exceptions; continue monitoring in case standard inputs post natively
      }
    };

    chrome.tabs.onUpdated.addListener(updateListener);
    chrome.tabs.onUpdated.addListener(loadListener);

    function cleanup() {
      clearTimeout(timeoutGuard);
      chrome.tabs.onUpdated.removeListener(updateListener);
      chrome.tabs.onUpdated.removeListener(loadListener);
      chrome.tabs.remove(tab.id).catch(() => {});
    }
  });
}

// 3, 4 & 5. Form Crawler running directly inside target page DOM context
function performFormInteractionDiscovery(testString) {
  const selectors = [
    'input[type="search"]',
    'input[name="q"]',
    'input[name="search"]',
    'input[name="query"]',
    'input[placeholder*="search" i]',
    'input[aria-label*="search" i]',
    'input[class*="search" i]'
  ];

  let searchBox = null;
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.tagName === "INPUT") {
      searchBox = element;
      break;
    }
  }

  if (!searchBox) {
    searchBox = document.querySelector('input[type="text"]');
  }

  if (!searchBox) return;

  searchBox.focus();
  searchBox.value = testString;

  // Emit data changes to satisfy modern frameworks (React/Vue) backing the elements
  searchBox.dispatchEvent(new Event("input", { bubbles: true }));
  searchBox.dispatchEvent(new Event("change", { bubbles: true }));

  // Simulate Keyboard enter tracking events
  const enterOptions = { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true };
  searchBox.dispatchEvent(new KeyboardEvent("keydown", enterOptions));
  searchBox.dispatchEvent(new KeyboardEvent("keypress", enterOptions));
  searchBox.dispatchEvent(new KeyboardEvent("keyup", enterOptions));

  // Fallback: forcefully call submit sequence directly on container form element
  if (searchBox.form) {
    searchBox.form.submit();
  }
}