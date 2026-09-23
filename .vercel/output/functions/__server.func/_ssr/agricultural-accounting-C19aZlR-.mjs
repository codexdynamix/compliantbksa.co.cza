import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as agriculturalServices, n as Eyebrow } from "./router-5qNxrjpU.mjs";
import { l as InteriorHero, r as ContactSection } from "./sections-Cvl7Q-GJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agricultural-accounting-C19aZlR-.js
var import_jsx_runtime = require_jsx_runtime();
function AgriculturalPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			kicker: "Specialist desk",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Agricultural ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "accounting." })] }),
			intro: "Helping farmers stay compliant, financially organised and finance-ready. Farming has its own calendar, its own cash cycle, and its own SARS questions.",
			index: "06"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "source-feature-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner source-feature-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "source-feature-copy",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Services include" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Built around the farming ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "year." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This is the specialist desk for agricultural accounting — from record keeping to funding proposals." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/site/farm-mast.webp",
							alt: "Western Cape farmland"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "source-ledger-list",
					children: agriculturalServices.map(([title, text], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-reveal": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })] })]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "source-season-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner source-season-inner",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Why it is different" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["The season is the real financial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "year." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Books that follow planting, livestock and payout cycles" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "VAT, diesel and farming tax treated as specialist work" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Lender-ready statements, models and cash-flow notes" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/site/farm-banner.webp",
						alt: "Western Cape farmland at dusk"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "band-light",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner band-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Farm packages" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Farm accounting packages from R1,500 per month" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pricing is based on farm size, transaction volume, payroll and services required." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "text-link",
						children: ["Agricultural enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {})
	] });
}
//#endregion
export { AgriculturalPage as component };
