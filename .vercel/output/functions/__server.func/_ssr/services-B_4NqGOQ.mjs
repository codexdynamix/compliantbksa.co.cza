import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Eyebrow } from "./router-5qNxrjpU.mjs";
import { d as ServicesList, l as InteriorHero, o as FitSection, r as ContactSection } from "./sections-Cvl7Q-GJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-B_4NqGOQ.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			kicker: "What we do",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The right detail. The wider ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "view." })] }),
			intro: "From the first transaction to a finished set of statements, we bring specialist focus to accuracy, deadlines and a pack you can take into the next conversation.",
			index: "02"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "services-section services-page-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading services-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Nine disciplines" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Less admin. More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "agency." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose the support your business needs now. We can grow the relationship as the picture changes." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesList, {})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {})
	] });
}
//#endregion
export { ServicesPage as component };
