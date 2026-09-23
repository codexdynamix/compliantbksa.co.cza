import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SITE, n as Eyebrow } from "./router-5qNxrjpU.mjs";
import { l as InteriorHero, r as ContactSection } from "./sections-Cvl7Q-GJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C8PIY0Zg.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			kicker: "Contact us",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Two addresses. Direct lines. A practice you can ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "reach." })] }),
			intro: "Write, call, or WhatsApp Compliant Bookkeeping SA — we love meeting new clients and practices.",
			index: "05"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "contact-note",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner contact-note-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "What happens next" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Tell us what is on the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "books." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "next-steps",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-reveal": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CAPE TOWN" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SITE.capeTown }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.mapsCapeTown,
								target: "_blank",
								rel: "noreferrer",
								children: "Open in Maps"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-reveal": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CERES" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SITE.ceres }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SITE.mapsCeres,
								target: "_blank",
								rel: "noreferrer",
								children: "Open in Maps"
							})
						]
					})]
				})]
			})
		})
	] });
}
//#endregion
export { ContactPage as component };
