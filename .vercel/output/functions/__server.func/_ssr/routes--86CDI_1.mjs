import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--86CDI_1.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const visualInstructions = [
		{
			id: 1,
			text: "Click on the settings icon to get to add your sites",
			imgSrc: "/Screenshot 2026-06-26 110848.png"
		},
		{
			id: 2,
			text: "For manual addition, go to you desiresd site make a search and find the website URL. Note: this only works for sites that have search functionality available and a search query URL like 'https://www.google.com/search?q=' when searched. sites like steam, chatgpt and gemini don't have a search URL for sites like that use the auto method",
			imgSrc: "/Screenshot 2026-06-26 111016.png"
		},
		{
			id: 3,
			text: "Copy and paste the URL of the search query URL of the site and replace the word you searched with {q}, click add and your site will be added.",
			imgSrc: "/Screenshot 2026-06-26 110818.png"
		},
		{
			id: 4,
			text: "For automatic addition, simply enter the domain name of the site you want to add and click on it in the suggestion dropdown. Note: this method is preferred for sites that don't produce a search URL or have a search URL pattern. If your site has a URL pattern it is recommeded to use the first method.",
			imgSrc: "/Screenshot 2026-06-26 111041.png"
		},
		{
			id: 5,
			text: "Once you've selected your site, click the 'Add' button. Note: it is preferable to input the full URL instead of just the name .e.g. put in claude.ai instead of just claude.",
			imgSrc: "/Screenshot 2026-06-26 122035.png"
		},
		{
			id: 6,
			text: "Once you've clicked add, your site will be opened in a new tab to get the search query or find the search bar. please remain on the page to complete the process as the tab will not close automatically if you open and stay on it.",
			imgSrc: "/Screenshot 2026-06-26 111111.png"
		},
		{
			id: 7,
			text: "Once the extension has found the search query or has read the page, your site will be added. Once your sites are added you can export them to use in other browsers instead of recreating your site list.",
			imgSrc: "/Screenshot 2026-06-26 111217.png"
		}
	];
	const download = () => {
		fetch("/multi-search v1.0.0.zip").then((res) => {
			if (!res.ok) throw new Error(`Download failed: ${res.status}`);
			return res.blob();
		}).then((blob) => {
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = "multi-search v1.0.0.zip";
			a.click();
			URL.revokeObjectURL(a.href);
		}).catch((err) => alert(err.message));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-6 py-16 sm:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold",
							children: "Multi-Search"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20 grid items-center gap-12 sm:mt-24 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl font-bold leading-tight tracking-tight sm:text-5xl",
							children: ["Highlight text. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent",
								children: "Search everywhere."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg text-slate-300",
							children: "An extension that turns any text selection into instant results from Google and your favourite sites — all in one side panel. No new tabs."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: download,
								className: "rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400",
								children: "Download extension"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#install",
								className: "rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800",
								children: "Install instructions"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-slate-500",
							children: "Manifest V3 · Chrome, Edge, Brave, Arc"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 pb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-red-400/80" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-yellow-400/80" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-green-400/80" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Searching"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-semibold text-slate-100",
									children: "“declarative net request”"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 space-y-2",
									children: [
										"Google",
										"YouTube",
										"Wikipedia"
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: s
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-slate-500",
											children: "▶"
										})]
									}, s))
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-3",
						children: [
							{
								n: "1",
								t: "Highlight",
								d: "Select any text on any page."
							},
							{
								n: "2",
								t: "Side panel opens",
								d: "Your selection is sent to the side panel."
							},
							{
								n: "3",
								t: "Browse",
								d: "Expand any site to load live results inline."
							}
						].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-800 bg-slate-900/50 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold text-indigo-400",
									children: ["STEP ", step.n]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-lg font-semibold",
									children: step.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-slate-400",
									children: step.d
								})
							]
						}, step.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "install",
					className: "mt-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "Install"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-6 space-y-3 text-slate-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-slate-100",
									children: "1."
								}), " Download and unzip the extension."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-slate-100",
										children: "2."
									}),
									" Open ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded bg-slate-800 px-1.5 py-0.5 text-sm",
										children: "manage extensions"
									}),
									" in your browser."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-slate-100",
										children: "3."
									}),
									" Enable ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Developer mode"
									}),
									" (top-right toggle)."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-slate-100",
										children: "4."
									}),
									" Click ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Load unpacked"
									}),
									" and select the unzipped folder."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-slate-100",
									children: "5."
								}), " Highlight text on any page — the side panel will appear with your results."] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-slate-500",
							children: "Requires permission to read and modify response headers on the sites you search, so they can be embedded in the side panel."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold mb-8",
						children: "Detailed Setup Walkthrough"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-12",
						children: visualInstructions.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 text-xs font-bold text-indigo-400 uppercase tracking-widest",
									children: ["Step 0", step.id]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden flex items-center justify-center shadow-inner",
									children: step.imgSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: step.imgSrc,
										alt: `Step ${step.id} detailed screenshot`,
										className: "w-full h-auto block object-contain"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-20 text-sm italic text-slate-600",
										children: [
											"Placeholder for 1366x768 Step ",
											step.id,
											" Image"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-base text-slate-200 leading-relaxed max-w-3xl",
									children: step.text
								})
							]
						}, step.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "mt-24 border-t border-slate-800 pt-8 text-xs text-slate-500",
					children: "Built with Manifest V3."
				})
			]
		})
	});
}
//#endregion
export { Index as component };
