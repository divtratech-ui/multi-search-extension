import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DkpHMm9F.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
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
							children: "A Chrome extension that turns any text selection into instant results from Google and your favourite sites — all in one side panel. No new tabs."
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
										children: "chrome://extensions"
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
						className: "text-2xl font-semibold",
						children: "Configure your sites"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-2xl text-slate-300",
						children: [
							"Right-click the extension icon → ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Options"
							}),
							" to add, reorder, or disable sites. Each site is a name plus a URL template containing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "rounded bg-slate-800 px-1.5 py-0.5 text-sm",
								children: "{q}"
							}),
							" where your highlighted text goes."
						]
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
