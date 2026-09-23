import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Eyebrow, s as outsourceServices } from "./router-5qNxrjpU.mjs";
import { l as InteriorHero, r as ContactSection } from "./sections-Cvl7Q-GJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/outsource-F1mhJdPM.js
var import_jsx_runtime = require_jsx_runtime();
function OutsourcePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			kicker: "For practices",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Outsource to us. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Keep the client." })] }),
			intro: "Hassle-free accounting, tax & bookkeeping — on your terms. We handle the numbers so your business or practice can take flight.",
			index: "07"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "outsource-belief",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Need extra capacity without hiring more staff?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Focus on serving your clients. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "We will handle the numbers." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You did not build a practice to live in working papers. Time spent catching up books, payroll and VAT is time you are not spending on the relationships that grow the firm. Outsource the production. Keep the client." })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "source-scope-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "source-scope-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "What we take on" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["A full-service team, behind your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "name." })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "source-scope-list",
					children: outsourceServices.map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-reveal": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "source-plan-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The 3-step plan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["The building blocks for extra ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "capacity." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "source-plan-grid",
						children: [
							["Call us", "Book a conversation. We learn the software, the review standard, and where the bottleneck is."],
							["We plan", "A package that suits the size of the file, the industry, and how you like work delivered."],
							["You sleep easy", "We get to work. You review. Your clients stay yours."]
						].map(([title, text], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
							]
						}, title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "source-benefits",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Overflow in peak VAT and year-end without a permanent hire" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Workpapers prepared to your review notes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sage Accounting, Sage Payroll and Xero — no software migration required" })
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {})
	] });
}
//#endregion
export { OutsourcePage as component };
