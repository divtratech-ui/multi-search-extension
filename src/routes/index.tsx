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
  const download = () => {
    fetch("/multi-search.zip")
      .then((res) => {
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "multi-search.zip";
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
          <link rel="icon" type="image/x-icon" href="/download.ico"></link>
        </header>

        <section className="mt-20 grid items-center gap-12 sm:mt-24 sm:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Highlight text. <span className="bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">Search everywhere.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              A Chrome extension that turns any text selection into instant results from Google and your favourite sites — all in one side panel. No new tabs.
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
            <li><span className="font-semibold text-slate-100">2.</span> Open <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">chrome://extensions</code> in your browser.</li>
            <li><span className="font-semibold text-slate-100">3.</span> Enable <span className="font-semibold">Developer mode</span> (top-right toggle).</li>
            <li><span className="font-semibold text-slate-100">4.</span> Click <span className="font-semibold">Load unpacked</span> and select the unzipped folder.</li>
            <li><span className="font-semibold text-slate-100">5.</span> Highlight text on any page — the side panel will appear with your results.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Requires permission to read and modify response headers on the sites you search, so they can be embedded in the side panel.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl font-semibold">Configure your sites</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Right-click the extension icon → <span className="font-semibold">Options</span> to add, reorder, or disable sites. Each site is a name plus a URL template containing <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">{"{q}"}</code> where your highlighted text goes.
          </p>
        </section>

        <footer className="mt-24 border-t border-slate-800 pt-8 text-xs text-slate-500">
          Built with Manifest V3.
        </footer>
      </div>
    </div>
  );
}
