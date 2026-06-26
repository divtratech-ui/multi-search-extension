import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Multi-Search Side Panel — Chrome Extension" },
      { name: "description", content: "Highlight any text in Chrome to instantly search it across multiple sites in a single side panel." },
      { property: "og:title", content: "Multi-Search Side Panel" },
      { property: "og:description", content: "Highlight text, see results from Google and your favourite sites side-by-side — without opening new tabs." },
    ],
  }),
  component: Index,
});

function Index() {
  // PRESET FOR YOUR 7 LARGE IMAGES AND INSTRUCTIONS
  const visualInstructions = [
    { id: 1, text: "Click on the settings icon to get to add your sites", imgSrc: "/Screenshot 2026-06-26 110848.png" },
    { id: 2, text: "For manual addition, go to you desiresd site make a search and find the website URL. Note: this only works for sites that have search functionality available and a search query URL like 'https://www.google.com/search?q=' when searched. sites like steam, chatgpt and gemini don't have a search URL for sites like that use the auto method", imgSrc: "/Screenshot 2026-06-26 111016.png" },
    { id: 3, text: "Copy and paste the URL of the search query URL of the site and replace the word you searched with {q}, click add and your site will be added.", imgSrc: "/Screenshot 2026-06-26 110818.png" },
    { id: 4, text: "For automatic addition, simply enter the domain name of the site you want to add and click on it in the suggestion dropdown. Note: this method is preferred for sites that don't produce a search URL or have a search URL pattern. If your site has a URL pattern it is recommeded to use the first method.", imgSrc: "/Screenshot 2026-06-26 111041.png" },
    { id: 5, text: "Once you've selected your site, click the 'Add' button. Note: it is preferable to input the full URL instead of just the name .e.g. put in claude.ai instead of just claude.", imgSrc: "/Screenshot 2026-06-26 122035.png" },
    { id: 6, text: "Once you've clicked add, your site will be opened in a new tab to get the search query or find the search bar. please remain on the page to complete the process as the tab will not close automatically if you open and stay on it.", imgSrc: "/Screenshot 2026-06-26 111111.png" },
    { id: 7, text: "Once the extension has found the search query or has read the page, your site will be added. Once your sites are added you can export them to use in other browsers instead of recreating your site list.", imgSrc: "/Screenshot 2026-06-26 111217.png" },
  ];

  const download = () => {
    fetch("/multi-search v1.0.0.zip")
      .then((res) => {
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "multi-search v1.0.0.zip";
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400" />
            <span className="text-lg font-semibold">Multi-Search</span>
          </div>
        </header>

        <section className="mt-20 grid items-center gap-12 sm:mt-24 sm:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Highlight text. <span className="bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">Search everywhere.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              An extension that turns any text selection into instant results from Google and your favourite sites — all in one side panel. No new tabs.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={download}
                className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
              >
                Download extension
              </button>
              <a href="#install" className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
                Install instructions
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">Manifest V3 · Chrome, Edge, Brave, Arc</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl">
            <div className="flex items-center gap-1.5 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500">Searching</div>
              <div className="mt-1 font-semibold text-slate-100">“declarative net request”</div>
              <div className="mt-4 space-y-2">
                {["Google", "YouTube", "Wikipedia"].map((s) => (
                  <div key={s} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2">
                    <span className="font-medium">{s}</span>
                    <span className="text-xs text-slate-500">▶</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { n: "1", t: "Highlight", d: "Select any text on any page." },
              { n: "2", t: "Side panel opens", d: "Your selection is sent to the side panel." },
              { n: "3", t: "Browse", d: "Expand any site to load live results inline." },
            ].map((step) => (
              <div key={step.n} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="text-xs font-bold text-indigo-400">STEP {step.n}</div>
                <div className="mt-1 text-lg font-semibold">{step.t}</div>
                <p className="mt-1 text-sm text-slate-400">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="install" className="mt-24">
          <h2 className="text-2xl font-semibold">Install</h2>
          <ol className="mt-6 space-y-3 text-slate-300">
            <li><span className="font-semibold text-slate-100">1.</span> Download and unzip the extension.</li>
            <li><span className="font-semibold text-slate-100">2.</span> Open <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">manage extensions</code> in your browser.</li>
            <li><span className="font-semibold text-slate-100">3.</span> Enable <span className="font-semibold">Developer mode</span> (top-right toggle).</li>
            <li><span className="font-semibold text-slate-100">4.</span> Click <span className="font-semibold">Load unpacked</span> and select the unzipped folder.</li>
            <li><span className="font-semibold text-slate-100">5.</span> Highlight text on any page — the side panel will appear with your results.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Requires permission to read and modify response headers on the sites you search, so they can be embedded in the side panel.
          </p>
        </section>

        {/* UPDATED SECTION: FULL WIDTH SINGLE COLUMN LAYOUT FOR 1366x768 IMAGES */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-8">Detailed Setup Walkthrough</h2>
          <div className="space-y-12">
            {visualInstructions.map((step) => (
              <div key={step.id} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
                <div className="mb-4 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Step 0{step.id}
                </div>
                
                {/* Full-width Image Frame */}
                <div className="w-full rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden flex items-center justify-center shadow-inner">
                  {step.imgSrc ? (
                    <img 
                      src={step.imgSrc} 
                      alt={`Step ${step.id} detailed screenshot`} 
                      className="w-full h-auto block object-contain"
                    />
                  ) : (
                    <div className="py-20 text-sm italic text-slate-600">
                      Placeholder for 1366x768 Step {step.id} Image
                    </div>
                  )}
                </div>

                <p className="mt-6 text-base text-slate-200 leading-relaxed max-w-3xl">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-24 border-t border-slate-800 pt-8 text-xs text-slate-500">
          Built with Manifest V3.
        </footer>
      </div>
    </div>
  );
}
