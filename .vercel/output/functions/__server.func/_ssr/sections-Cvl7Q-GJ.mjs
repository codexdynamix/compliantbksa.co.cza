import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Phone, c as Landmark, d as ChevronDown, f as Check, g as ArrowRight, h as ArrowUpRight, i as ShieldCheck, l as FileSpreadsheet, m as Calculator, p as ChartColumn, r as TrendingUp, s as MapPin, u as Clock3 } from "../_libs/lucide-react.mjs";
import { i as SITE, l as services, n as Eyebrow, o as faqs, r as HeroDock } from "./router-5qNxrjpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sections-Cvl7Q-GJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactForm() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const submitForm = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "form-success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": "true" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Message received" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "That’s a good first step." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Thank you for reaching out. We’ll review your note and come back with a useful next step." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSubmitted(false),
				className: "reset-button",
				children: "Send another note"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submitForm,
		className: "consultation-form",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Send a note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Tell us what’s on the books." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-fields-two",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field-label",
					children: "Your name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "name",
					type: "text",
					placeholder: "First and last name",
					autoComplete: "name",
					suppressHydrationWarning: true
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field-label",
					children: "Phone number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "phone",
					type: "tel",
					inputMode: "tel",
					placeholder: SITE.phone,
					autoComplete: "tel",
					suppressHydrationWarning: true
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "field-label",
				children: "Email address"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				required: true,
				name: "email",
				type: "email",
				placeholder: SITE.email,
				autoComplete: "email",
				suppressHydrationWarning: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "field-label",
				children: "What would you like help with?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				required: true,
				name: "focus",
				defaultValue: "",
				suppressHydrationWarning: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						disabled: true,
						children: "Select a focus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "bookkeeping",
						children: "Bookkeeping and reporting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "tax",
						children: "VAT and tax"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "payroll",
						children: "Payroll"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "agricultural",
						children: "Agricultural accounting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "outsource",
						children: "Outsourcing for my firm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "pricing",
						children: "Pricing for my business"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "other",
						children: "Something else"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "field-label",
				children: ["A little context ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "(optional)" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				name: "message",
				rows: 3,
				placeholder: "Share the software you use, the deadlines that worry you, and what “done” looks like.",
				suppressHydrationWarning: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "button button-dark form-submit",
				children: ["Send enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "privacy-note",
				children: [
					"Your note can also be sent directly to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${SITE.email}`,
						children: SITE.email
					}),
					"."
				]
			})
		]
	});
}
var serviceIcons = [
	Calculator,
	ChartColumn,
	Landmark,
	FileSpreadsheet,
	FileSpreadsheet,
	TrendingUp,
	ShieldCheck,
	ChartColumn,
	Landmark
];
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hero-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Professional accounting" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "hero-title animate-rise delay-1",
						children: ["Keeping your books ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "compliant." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hero-intro animate-rise delay-2",
						children: "Compliant Bookkeeping SA is your finance and compliance partner, providing accurate accounting and reliable financial support. We handle SARS, CIPC, VAT, PAYE, UIF/uFiling, COIDA and payroll, keeping your business compliant and your numbers in order."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-taglines animate-rise delay-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keeping your books compliant." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Strengthening your numbers." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Supporting your growth." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hero-actions animate-rise delay-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "button button-dark",
							children: ["Request a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-rise delay-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDock, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-visual animate-rise delay-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "hero-source-visual",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/site/books.webp",
						alt: "Printed annual financial statements, a fountain pen and a laptop on a desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "The numbers, in order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bookkeeping · Reporting · Financial statements" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hero-widget",
					"aria-label": "Compliance snapshot",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-widget-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-widget-live" }), "Live activity"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "On track" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VAT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "25 Sep" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PAYE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Current" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CIPC" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Filed" })] })
						] })
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero-footerline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "hero-scroll",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " Scroll to explore"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hero-location",
				children: "Cape Town · South Africa"
			})]
		})]
	});
}
function PracticeProof() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "practice-proof",
		"aria-label": "Practice highlights",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "practice-proof-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Built for the real work" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Professional standards. Clear ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "support." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Two Western Cape offices, one standard of work. Reach the practice by the channel that suits you." })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "practice-proof-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "practice-proof-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { "aria-hidden": "true" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Reachable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Phone, WhatsApp or email" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A practice you can actually reach — by the channel that suits you." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "practice-proof-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { "aria-hidden": "true" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Affiliated" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Professional bodies" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SAICA, SAIPA and CIBA — professional bodies your clients already recognise." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "practice-proof-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { "aria-hidden": "true" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Software" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Familiar ledgers" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sage, Sage Payroll and Xero — we work in the ledgers you already run." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "practice-proof-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { "aria-hidden": "true" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Places" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Cape Town & Ceres" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Two Western Cape offices, one standard of work." })
						]
					})
				]
			})]
		})
	});
}
function AffiliationsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "affiliations-section",
		"aria-labelledby": "affiliations-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-heading affiliations-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Affiliated to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "affiliations-title",
					children: ["Professional bodies your clients already ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "recognise." })]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The supplied affiliation badges are shown as provided, without recolouring or recreating them." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "affiliation-badge-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "affiliation-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/saica.svg",
							alt: "South African Institute of Chartered Accountants"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "South African Institute of Chartered Accountants" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "affiliation-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "affiliation-badge-saipa",
							src: "/brand/saipa.webp",
							alt: "South African Institute of Professional Accountants"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "South African Institute of Professional Accountants" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "affiliation-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/ciba.png",
							alt: "CIBA — Chartered Institute for Business Accountants NPC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Professional body your clients already recognise" })]
					})
				]
			})]
		})
	});
}
function SoftwareSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "software-section",
		"aria-labelledby": "software-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner software-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "software-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Software" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						id: "software-title",
						children: ["We use the following ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "software." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cloud accounting, payroll and bank feeds in the systems your business or practice already runs." })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "software-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "software-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/sage.svg",
								alt: "Sage Accounting"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sage Accounting" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accounting and bank feeds" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "software-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/sage.svg",
								alt: "Sage Payroll"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sage Payroll" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payslips and payroll returns" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "software-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/xero.svg",
								alt: "Xero"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Xero" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cloud reporting and reconciliations" })
						]
					})
				]
			})]
		})
	});
}
function HomePricingBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "home-pricing-band",
		"aria-labelledby": "home-pricing-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner home-pricing-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Pricing" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "home-pricing-title",
					children: ["R1,000 a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "month." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Example monthly starting points. Final fees depend on entity size, transaction volume, payroll and the services you need." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pricing",
				className: "button button-dark",
				children: ["See example pricing ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
			})]
		})
	});
}
function ApproachSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "approach",
		className: "approach-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner approach-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-marker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Our approach" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "marker-number",
					children: "01"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "approach-content",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your numbers should answer questions, not create more of them." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "approach-notes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We bring structure to the everyday and perspective to the important moments. No jargon wall. No mysterious month-end." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Just accurate financial foundations, a clear view of what is changing, and a partner who knows when to zoom in." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "approach-signoff",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "initials",
							"aria-hidden": "true",
							children: [
								"C",
								"M",
								"N"
							].map((initial, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: index === 1 ? "initial-accent" : "",
								children: initial
							}, initial))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A steady hand for the decisions ahead." })]
					})
				]
			})]
		})
	});
}
function EditorialSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "visual-break-section",
		"aria-label": "A closer look at the Compliant Bookkeeping SA approach",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner visual-break-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "visual-break-copy",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Start with a conversation" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Clear books. Thoughtful ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "reporting." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "At Compliant Bookkeeping SA, the work starts with a conversation. We bring professional accounting, payroll and compliance to clients who want the numbers handled — and explained — without the noise." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "visual-break-caption",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "caption-dot",
							"aria-hidden": "true"
						}), "No mystery month-end"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "visual-break-gallery",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "visual-break-photo visual-break-photo-wide",
					"data-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/site/meeting.webp",
						alt: "Advisors reviewing management accounts together"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "01 / A better conversation about the numbers" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "visual-break-photo visual-break-photo-detail",
					"data-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/site/planning.webp",
						alt: "Advisor reviewing a funding proposal with a client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "02 / Details, handled" })]
				})]
			})]
		})
	});
}
function ServicesList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "service-list",
		children: services.map((service, index) => {
			const Icon = serviceIcons[index] ?? Calculator;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "service-row",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "service-number",
						children: service.number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "service-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { "aria-hidden": "true" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "service-main",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: service.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: service.text })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "service-tag",
						children: service.tag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "service-arrow",
						"aria-hidden": "true"
					})
				]
			}, service.number);
		})
	});
}
function ServicesSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "services-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-heading services-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The useful stuff" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Finance that ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "moves" }),
					" with you."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The right support changes as your business changes. Start where the friction is." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesList, {})]
		})
	});
}
function FitSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "fit",
		className: "fit-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner fit-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fit-copy",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "A good fit looks like" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["You want a finance partner, not a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "filing cabinet." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You care about doing things properly, but you have a business to run. You want answers that arrive before the deadline — and advice that respects the real-world trade-offs." })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fit-list",
				"data-reveal": true,
				children: [[
					"A founder making the first serious hires",
					"An SME ready for cleaner management information",
					"An established business navigating a new chapter",
					"A professional with more moving parts than time"
				].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fit-item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: `0${index + 1}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item })]
				}, item)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "text-link fit-link",
					children: ["Let's see if we fit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
				})]
			})]
		})
	});
}
function StandardSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "standard-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner standard-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "standard-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The Compliant standard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The work is practical. The difference is how it feels." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "standard-list",
				children: [
					[
						"01",
						"Keep you compliant",
						"SARS, CIPC and payroll dates are our calendar — so they never become yours."
					],
					[
						"02",
						"Strengthen the numbers",
						"Books that answer questions, not another month-end you have to decode."
					],
					[
						"03",
						"Support your growth",
						"We start with what is actually happening in the business, not a template."
					]
				].map(([number, title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "standard-item",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: number }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
					]
				}, number))
			})]
		})
	});
}
function FaqList() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "faq-list",
		"data-reveal": true,
		children: faqs.map(({ question, answer }, index) => {
			const isOpen = openFaq === index;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpenFaq(isOpen ? -1 : index),
					className: "faq-trigger",
					"aria-expanded": isOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: isOpen ? "faq-chevron faq-chevron-open" : "faq-chevron",
						"aria-hidden": "true"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `faq-content ${isOpen ? "open" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "faq-answer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: answer })
					})
				})]
			}, question);
		})
	});
}
function FaqSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "faq-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner faq-inner-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Good to know" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Before we ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "talk." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, {})]
		})
	});
}
function ContactSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "contact-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner contact-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "contact-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						muted: true,
						children: "Make the numbers useful"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["A clearer next step starts ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "here." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Write, call, or WhatsApp Compliant Bookkeeping SA. Tell us what is on the books and we will come back with a practical next step — never a hard sell." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-details",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { "aria-hidden": "true" }), " Two offices in the Western Cape"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { "aria-hidden": "true" }), " No obligation, no hard sell"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-directory",
						"aria-label": "Contact details",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "contact-directory-item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${SITE.email}`,
									children: SITE.email
								}) })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "contact-directory-item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Accounts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${SITE.accountsEmail}`,
									children: SITE.accountsEmail
								}) })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "contact-directory-item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Primary · Alternate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: SITE.phoneHref,
										children: SITE.phone
									}),
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: SITE.phoneAltHref,
										children: SITE.phoneAlt
									})
								] })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "contact-directory-item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Offices" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cape Town · Ceres" })] })
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-panel",
				"data-reveal": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})
			})]
		})
	});
}
function InteriorHero({ kicker, title, intro, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "interior-hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner interior-hero-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "interior-index",
				children: index
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: kicker }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: intro })
			] })]
		})
	});
}
//#endregion
export { FaqSection as a, HomePricingBand as c, ServicesList as d, ServicesSection as f, EditorialSection as i, InteriorHero as l, StandardSection as m, ApproachSection as n, FitSection as o, SoftwareSection as p, ContactSection as r, Hero as s, AffiliationsSection as t, PracticeProof as u };
