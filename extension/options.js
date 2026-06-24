const listEl = document.getElementById("list");
const errEl = document.getElementById("err");
const tabAuto = document.getElementById("tab-auto");
const tabManual = document.getElementById("tab-manual");
const inputName = document.getElementById("new-name");
const inputUrl = document.getElementById("new-url");
const addBtn = document.getElementById("add-btn");
const suggContainer = document.getElementById("suggestions-container");
const tickerEl = document.getElementById("ticker");
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const importFile = document.getElementById("import-file");

let activeMode = "auto";
let selectedDomainUrl = ""; 
let debounceTimer = null;

async function getSites() {
  const { sites } = await chrome.storage.sync.get("sites");
  return Array.isArray(sites) ? sites : [];
}

async function setSites(sites) {
  await chrome.storage.sync.set({ sites });
}

async function exportSites() {
  const sites = await getSites();
  const dataStr = JSON.stringify(sites, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "multi-search-sites.json";
  a.click();
  URL.revokeObjectURL(url);
}

async function importSitesFromFile(file) {
  try {
    const text = await file.text();
    const imported = JSON.parse(text);
    if (!Array.isArray(imported)) {
      errEl.textContent = "Invalid file format. Expected an array of sites.";
      return;
    }
    const existing = await getSites();
    const merged = [...existing, ...imported.filter(s => s.name && s.url)];
    await setSites(merged);
    render(merged);
    errEl.textContent = "";
  } catch (e) {
    errEl.textContent = "Failed to import: " + e.message;
  }
}

function uid() { return Math.random().toString(36).slice(2, 10); }

function getFavicon(url) {
  try {
    const domain = url.includes("://") ? new URL(url).hostname : url;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch (e) {
    return `https://www.google.com/s2/favicons?domain=google.com&sz=32`;
  }
}

/* --- Real Live Online Search via Google Query Extraction --- */
inputName.addEventListener("input", () => {
  if (activeMode !== "auto") {
    suggContainer.style.display = "none";
    return;
  }

  clearTimeout(debounceTimer);
  const text = inputName.value.trim();

  if (text.length < 2) {
    suggContainer.style.display = "none";
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchLiveWebSuggestions(text);
  }, 400);
});

async function fetchLiveWebSuggestions(query) {
  try {
    // Fetches live autocomplete results with high-fidelity site connections from Google's suggestions API
    const response = await fetch(`https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data && Array.isArray(data[1])) {
      const suggestions = [];
      const seenDomains = new Set();

      // Ensure a fast local direct matching baseline is appended
      const baselineGuess = query.toLowerCase().replace(/\s+/g, "") + ".com";
      suggestions.push({ name: query, domain: baselineGuess });
      seenDomains.add(baselineGuess);

      for (let i = 0; i < data[1].length; i++) {
        const itemText = data[1][i];
        
        // Dynamically detect phrases containing common internet domain structures (.com, .org, etc.)
        const domainMatch = itemText.toLowerCase().match(/([a-z0-9-]+)\.(com|org|net|edu|gov|io|co|ai|info|tv)/);
        if (domainMatch) {
          const matchedDomain = domainMatch[0];
          if (!seenDomains.has(matchedDomain) && suggestions.length < 5) {
            suggestions.push({
              name: itemText.split('.')[0].toUpperCase(),
              domain: matchedDomain
            });
            seenDomains.add(matchedDomain);
          }
        } else {
          // Alternative fallback processing: convert standard text suggestions into valid absolute domains
          const parsedWord = itemText.toLowerCase().replace(/[^a-z0-9]/g, "");
          if (parsedWord.length > 2) {
            const potentialDomain = `${parsedWord}.com`;
            if (!seenDomains.has(potentialDomain) && suggestions.length < 5) {
              suggestions.push({
                name: itemText,
                domain: potentialDomain
              });
              seenDomains.add(potentialDomain);
            }
          }
        }
      }
      renderSuggestions(suggestions);
    }
  } catch (err) {
    // Quietly fallback to direct query assumption layout if offline
    const cleanStr = query.toLowerCase().replace(/\s+/g, "");
    renderSuggestions([
      { name: query, domain: `${cleanStr}.com` }
    ]);
  }
}

function renderSuggestions(list) {
  suggContainer.innerHTML = "";
  if (list.length === 0) {
    suggContainer.style.display = "none";
    return;
  }

  list.forEach((item) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerHTML = `
      <img class="site-favicon" src="${getFavicon(item.domain)}" alt="" />
      <span class="sugg-text-main">${escapeHtml(item.name)}</span>
      <span class="sugg-text-domain">${item.domain}</span>
    `;

    div.addEventListener("click", () => {
      inputName.value = item.name;
      selectedDomainUrl = item.domain.startsWith("http") ? item.domain : `https://${item.domain}`;
      suggContainer.style.display = "none";
    });

    suggContainer.appendChild(div);
  });

  suggContainer.style.display = "flex";
}

/* --- Tab Swapping Management --- */
tabAuto.addEventListener("click", () => {
  activeMode = "auto";
  tabAuto.classList.add("active");
  tabManual.classList.remove("active");
  inputName.placeholder = "enter site name (e.g. YouTube)";
  inputUrl.style.display = "none";
  errEl.textContent = "";
});

tabManual.addEventListener("click", () => {
  activeMode = "manual";
  tabManual.classList.add("active");
  tabAuto.classList.remove("active");
  inputName.placeholder = "Name (e.g. Wikipedia)";
  inputUrl.style.display = "block";
  suggContainer.style.display = "none";
  errEl.textContent = "";
});

/* --- UI Workspace Engine Render Loop --- */
function render(sites) {
  listEl.innerHTML = "";
  if (sites.length === 0) {
    listEl.innerHTML = `<div style="color:var(--muted); font-size:13px; padding:10px 0;">No workspace engines assigned.</div>`;
    return;
  }

  sites.forEach((site, i) => {
    const card = document.createElement("div");
    card.className = "site-card";
    card.innerHTML = `
      <input type="checkbox" class="cb-toggle" ${site.enabled !== false ? "checked" : ""} title="Toggle Availability" />
      <img class="site-favicon" src="${getFavicon(site.url)}" onerror="this.style.display='none'" alt="" />
      <div class="site-name-text">${escapeHtml(site.name)}</div>
      <div class="site-url-text">${escapeHtml(site.url)}</div>
      <div class="control-group">
        <button class="action-icon move-up" title="Move up" ${i === 0 ? "disabled" : ""}>↑</button>
        <button class="action-icon move-down" title="Move down" ${i === sites.length - 1 ? "disabled" : ""}>↓</button>
        <button class="action-icon del-type delete-btn" title="Remove Destination">✕</button>
      </div>
    `;

    card.querySelector(".cb-toggle").addEventListener("change", async (e) => {
      sites[i].enabled = e.target.checked;
      await setSites(sites);
    });

    card.querySelector(".move-up").addEventListener("click", async () => {
      if (i > 0) {
        [sites[i - 1], sites[i]] = [sites[i], sites[i - 1]];
        await setSites(sites);
        render(sites);
      }
    });

    card.querySelector(".move-down").addEventListener("click", async () => {
      if (i < sites.length - 1) {
        [sites[i + 1], sites[i]] = [sites[i], sites[i + 1]];
        await setSites(sites);
        render(sites);
      }
    });

    card.querySelector(".delete-btn").addEventListener("click", async () => {
      sites.splice(i, 1);
      await setSites(sites);
      render(sites);
    });

    listEl.appendChild(card);
  });
}

function escapeHtml(s) { 
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
}

/* --- Submission Action Trigger Listeners --- */
addBtn.addEventListener("click", async () => {
  errEl.textContent = "";
  const nameVal = inputName.value.trim();
  const currentSites = await getSites();

  if (!nameVal) {
    errEl.textContent = "A workspace entry identifier name is required.";
    return;
  }

  if (activeMode === "manual") {
    const urlVal = inputUrl.value.trim();
    if (!urlVal || !urlVal.includes("{q}")) {
      errEl.textContent = "Manual configuration URLs must explicitly include a target '{q}' expression placeholder.";
      return;
    }
    
    currentSites.push({ id: uid(), name: nameVal, url: urlVal, enabled: true });
    await setSites(currentSites);
    inputName.value = "";
    inputUrl.value = "";
    render(currentSites);
  } else {
    let targetUrl = selectedDomainUrl;
    if (!targetUrl) {
      let guess = nameVal.toLowerCase().replace(/\s+/g, "");
      if (!guess.includes(".")) guess += ".com";
      targetUrl = guess.startsWith("http") ? guess : "https://" + guess;
    }

    // Freeze inputs and show the animated waiting ticker text cleanly
    addBtn.disabled = true;
    tickerEl.style.display = "flex";
    suggContainer.style.display = "none";

    chrome.runtime.sendMessage({
      action: "DISCOVER_PATTERN",
      url: targetUrl
    }, async (response) => {
      addBtn.disabled = false;
      tickerEl.style.display = "none";
      selectedDomainUrl = ""; 

      if (chrome.runtime.lastError || !response || !response.success) {
        errEl.textContent = `Pattern matching missed for ${targetUrl}. Try adding via Manual tab mode instead!`;
        return;
      }

      currentSites.push({ id: uid(), name: nameVal, url: response.pattern, enabled: true });
      await setSites(currentSites);
      inputName.value = "";
      render(currentSites);
    });
  }
});

(async () => { 
  render(await getSites()); 
})();

exportBtn.addEventListener("click", exportSites);
importBtn.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) importSitesFromFile(file);
  e.target.value = "";
});