import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as Eyebrow } from "./router-5qNxrjpU.mjs";
import { a as FaqSection, l as InteriorHero, r as ContactSection } from "./sections-Cvl7Q-GJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-msuOBqBH.js
var import_jsx_runtime = require_jsx_runtime();
function FaqPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			kicker: "Good to know",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The useful answers, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "up front." })] }),
			intro: "A first conversation should feel straightforward. Here are the questions we hear most often.",
			index: "04"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "faq-callout",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner callout-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Still wondering?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Bring the question. We'll bring the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "context." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "button button-accent",
					children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {})
	] });
}
//#endregion
export { FaqPage as component };
