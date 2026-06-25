# Multi-Search Side Panel (Website Connector)

A minimalist, ultra-efficient Chrome Extension designed for deep research workflows. Highlight any text on any webpage to immediately search across all your favorite curated platforms simultaneously inside a consolidated side panel layout—eliminating tab-switching distraction entirely.

## 🚀 Core Features

* **One-Page Research Hub:** Aggregates multi-source query results in a single, clean vertical column workspace.
* **Instant Highlight Sync:** Selecting a word or phrase anywhere instantly queues up and triggers real-time workspace lookups.
* **Smart Routing Architecture:** Uses a dual-engine structure to connect search bars across the web, bypassing traditional iframe security limitations seamlessly.

---

## 🛠️ How It Works (The Dual-Engine Search Strategy)

Websites handle searching in different ways. To guarantee that every added site correctly captures your highlighted text inside its panel iframe, this extension dynamically routes searches using two separate layers:

### 1. Automatic Search Query Pattern Matching (`mode: "auto"`)

When you submit a new platform domain on the Options page, the extension runs a background connection probe to see if the site supports a direct URL parameters string (e.g., `https://example.com/search?q=query`).

* **The Workflow:** If a pattern is discovered, the extension translates it into a flexible endpoint string layout (`{q}`).
* **The Execution:** When you open a panel card, it directly sets the source URL to that structured route. This is fast, highly stable, and works entirely independent of target page layouts.

### 2. Programmatic Background Injection (`mode: "injected"`)

If a platform uses deep javascript framework layers (like ChatGPT, Claude, or heavily routed single-page apps) where queries are not exposed in the web address bar, standard URL patterns fail. The extension automatically switches to an optimized injection pipeline:

* **The Workflow:** The platform is registered as an interactive script automation target.
* **The Execution:** The moment you open that site's dropdown card inside your side panel, the background worker bypasses Cross-Origin isolation guards by programmatically evaluating a secure, smart interaction function (`performProgrammaticSearch`) straight into that iframe context. It instantly:
1. Finds the platform's input or search element dynamically using resilient property scoring (IDs, names, or placeholders).
2. Sets your active selection string directly into the form fields.
3. Fires native React/framework input handlers and automatically dispatches submission key/click actions.



---

## 📂 Project Structure

```text
├── manifest.json         # Extension permissions, scopes, and script frames alignment
├── background.js        # Service worker managing context menus, pattern checks, & script injections
├── content.js           # Text highlight tracking context script matching global user frames
├── sidepanel.html/js    # Core user interface, iframe layout, and rendering loop controller
└── options.html/js      # Central hub for site management, testing, and workspace profile curation

```

---

## ⚙️ Installation & Developer Mode Setup

1. **Clone or Download** this repository to your machine.
2. Open your Google Chrome browser and navigate to `chrome://extensions/`.
3. Toggle the **"Developer mode"** switch located in the top-right corner.
4. Click **"Load unpacked"** in the top-left corner and select the project folder containing these files.
5. Pin the extension icon to your browser bar, select text anywhere on a webpage, and open the panel to watch your custom workspaces execute.

---

## 📝 Custom Site Presets

For complex web apps that require exact UI selectors to fire, you can append custom configuration maps directly inside the `BUILTIN_SELECTORS` array or add specialized framework DOM hooks right at the top of the `performProgrammaticSearch` function inside your `background.js` file. This lets you continuously extend support for custom dashboards effortlessly!
