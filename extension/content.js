(() => {
  let timer = null;
  let lastSent = "";

  function handle() {
    const sel = window.getSelection && window.getSelection();
    if (!sel) return;
    const text = String(sel.toString() || "").trim();
    if (!text || text.length < 2 || text === lastSent) return;
    lastSent = text;
    try {
      chrome.runtime.sendMessage({ type: "SELECTION", text });
    } catch (e) { /* extension context invalidated */ }
  }

  function schedule() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(handle, 250);
  }

  document.addEventListener("mouseup", schedule, true);
  document.addEventListener("keyup", (e) => {
    if (e.shiftKey || e.ctrlKey || e.metaKey) schedule();
  }, true);
})();