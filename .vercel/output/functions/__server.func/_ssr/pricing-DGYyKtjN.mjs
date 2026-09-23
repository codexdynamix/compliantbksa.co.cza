import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Check, g as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as priceTiers, n as Eyebrow } from "./router-5qNxrjpU.mjs";
import { l as InteriorHero, r as ContactSection } from "./sections-Cvl7Q-GJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-DGYyKtjN.js
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			kicker: "Pricing",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Clear packages. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Scoped to the books." })] }),
			intro: "Monthly accounting starts from R1,000. The right package depends on the size of the entity, transaction volume, payroll and the services you need — we confirm that before any work begins.",
			index: "08"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pricing-tiers",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-inner pricing-grid",
				children: priceTiers.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: tier.featured ? "pricing-card pricing-card-featured" : "pricing-card",
					"data-reveal": true,
					children: [
						tier.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pricing-flag",
							children: "Typical starting range"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: tier.size }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tier.price }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tier.detail }),
						"quote" in tier && tier.quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "button button-dark",
							children: ["Request a quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "text-link",
							children: ["Talk about this package ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
						})
					]
				}, tier.size))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-inner pricing-note",
				children: "Figures are example monthly starting points, excluding VAT where applicable. Final fees are confirmed after we see the software, the volume and the deadlines."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pricing-includes",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner pricing-includes-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "What a package typically covers" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["The work that keeps you ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "compliant." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every engagement is scoped. The list below is the core of most monthly retainers — we add or leave out according to the entity." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: [
					"Monthly bookkeeping and bank reconciliations",
					"SARS, VAT, PAYE and related returns as scoped",
					"CIPC housekeeping kept on the calendar",
					"Payroll, UIF/uFiling and COIDA where required",
					"A pack you can actually use — not just a file dump"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": "true" }), item] }, item)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "band-dark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner band-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Farm packages" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Farm accounting packages from R1,500 per month" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pricing is based on farm size, transaction volume, payroll and services required." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/agricultural-accounting",
						className: "text-link text-link-light",
						children: ["See agricultural accounting ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {})
	] });
}
//#endregion
export { PricingPage as component };
