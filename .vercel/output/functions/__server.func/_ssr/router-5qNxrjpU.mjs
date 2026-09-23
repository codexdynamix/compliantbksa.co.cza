import { i as __toESM } from "../_runtime.mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowUpRight, n as TriangleAlert, o as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-5qNxrjpU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/** Official third-party marks — colours are the brand-specified values. */
var WA_GLYPH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z";
function WhatsAppGlyph({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		width: "24",
		height: "24",
		className,
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			d: WA_GLYPH
		})
	});
}
function WhatsAppAppIcon({ size = 52 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "ios-app-icon ios-app-icon-whatsapp",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		focusable: "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "24",
			height: "24",
			rx: "5.4",
			fill: "#25D366"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			fillRule: "evenodd",
			d: WA_GLYPH
		})]
	});
}
function GmailAppIcon({ size = 52 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "ios-app-icon ios-app-icon-gmail",
		width: size,
		height: size,
		viewBox: "0 0 48 48",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "48",
				height: "48",
				rx: "10.8",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4caf50",
				d: "M45 16.2 40 18.95 35 23.7 35 40h7c1.657 0 3-1.343 3-3V16.2z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#1e88e5",
				d: "M3 16.2 6.614 17.91 13 23.25V40H6c-1.657 0-3-1.343-3-3V16.2z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				fill: "#e53935",
				points: "35,11.2 24,17.75 13,11.2 12,17 13,23.25 24,29.75 35,23.25 36,17"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#c62828",
				d: "M3 12.298V16.2l10 7.05V11.2L9.876 8.862C9.132 8.301 8.228 8 7.298 8h0C4.619 8 3 9.619 3 12.298z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#fbc02d",
				d: "M45 12.298V16.2l-10 7.05V11.2l3.124-2.338C38.868 8.301 39.772 8 40.702 8h0C43.381 8 45 9.619 45 12.298z"
			})
		]
	});
}
function MapsAppIcon({ size = 52 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "ios-app-icon ios-app-icon-maps",
		width: size,
		height: size,
		viewBox: "0 0 64 64",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				rx: "14.4",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M0 14C0 6.268 6.268 0 14 0h18v30L14 52H0V14z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC04",
				d: "M32 0h18c7.732 0 14 6.268 14 14v18L44 54 32 30V0z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M0 48l18-14 22 18v.5C40 60.09 33.09 64 25.5 64H14C6.268 64 0 57.732 0 50v-2z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M32 8c-8.284 0-15 6.716-15 15 0 11.25 15 28 15 28s15-16.75 15-28c0-8.284-6.716-15-15-15z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				fill: "#F6D95C",
				cx: "32",
				cy: "23",
				r: "6.4"
			})
		]
	});
}
var SITE = {
	name: "Compliant Bookkeeping SA",
	shortName: "Compliant",
	tagline: "Keeping your books compliant.",
	phone: "083 411 9467",
	phoneHref: "tel:+27834119467",
	phoneAlt: "074 206 3255",
	phoneAltHref: "tel:+27742063255",
	email: "info@compliantbksa.co.za",
	accountsEmail: "accounting@compliantbksa.co.za",
	whatsappHref: "https://wa.me/27834119467?text=Hello%20Compliant%20Bookkeeping%20SA%2C%20I%20would%20like%20to%20talk%20about%20bookkeeping%20support.",
	mapsCapeTown: "https://www.google.com/maps/search/?api=1&query=23+Bridge+Street%2C+Rosebank%2C+Cape+Town%2C+7700",
	mapsCeres: "https://www.google.com/maps/search/?api=1&query=8+Rietvalley+Street%2C+Ceres%2C+Western+Cape%2C+6835",
	capeTown: "23 Bridge Street, Rosebank, Cape Town, Western Cape, 7700",
	ceres: "8 Rietvalley Street, Ceres, Western Cape, 6835"
};
var navigation = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "Services",
		to: "/services"
	},
	{
		label: "Agriculture",
		to: "/agricultural-accounting"
	},
	{
		label: "Outsource",
		to: "/outsource"
	},
	{
		label: "Pricing",
		to: "/pricing"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
var services = [
	{
		number: "01",
		title: "Bookkeeping",
		text: "Monthly bookkeeping and reconciliations that turn a pile of transactions into a picture your business can actually use.",
		tag: "Reliable books"
	},
	{
		number: "02",
		title: "Management accounts",
		text: "Meaningful monthly packs, reviewed and interpreted, so decisions are made with visibility rather than guesswork.",
		tag: "Monthly packs"
	},
	{
		number: "03",
		title: "VAT & tax support",
		text: "VAT, PAYE and income tax handled on time, with a calm hand for queries so SARS is never a surprise.",
		tag: "SARS support"
	},
	{
		number: "04",
		title: "Payroll",
		text: "Sage Payroll run properly — payslips, EMP201s and the monthly rhythm taken off your desk.",
		tag: "People paid"
	},
	{
		number: "05",
		title: "Financial statements",
		text: "Annual financial statements prepared with care, ready for review, lenders, or the next conversation that matters.",
		tag: "Year-end"
	},
	{
		number: "06",
		title: "Cash-flow planning",
		text: "Cash-flow forecasts that show what is coming, so you can move with intention rather than react under pressure.",
		tag: "Forecasts"
	},
	{
		number: "07",
		title: "CIPC compliance",
		text: "Annual returns, beneficial ownership and company secretarial housekeeping scheduled and done — off your mental load.",
		tag: "Statutory work"
	},
	{
		number: "08",
		title: "Models & budgets",
		text: "Financial models and budgets built for the actual business — not a template that pretends every client is the same.",
		tag: "Decision support"
	},
	{
		number: "09",
		title: "Loan & funding proposals",
		text: "Clear packs for banks and funders: the numbers, the story, and the supporting schedules they actually ask for.",
		tag: "Finance-ready"
	}
];
var faqs = [
	{
		question: "Who do you work best with?",
		answer: "Founder-led businesses, growing SMEs and established teams that want a finance function they can actually use. We also support professionals with personal and business tax needs."
	},
	{
		question: "Can you take over from our current accountant?",
		answer: "Yes. We make the handover methodical: we review the current state, map open items, agree a clean starting point and give you a practical first-month plan."
	},
	{
		question: "Do you only work with businesses in South Africa?",
		answer: "Our advisory is built around the South African operating context. We work primarily with local businesses and can coordinate with an existing team when an owner operates across borders."
	},
	{
		question: "What happens in the first consultation?",
		answer: "It is a focused 30-minute conversation about where the numbers feel unclear, what is coming up next and what support would make the biggest difference. There is no obligation."
	}
];
var agriculturalServices = [
	["Farm bookkeeping", "Seasonal books that keep pace with harvests, input cycles and livestock movements."],
	["Management accounts", "Monthly packs that show what the land, the herd and the season actually produced."],
	["Cash-flow planning", "Forecasts built around planting, payouts and the long wait between them."],
	["Financial statements", "Year-end statements prepared with farming realities in mind."],
	["VAT & tax support", "VAT, diesel refunds and farming tax treated as the specialist work they are."],
	["Payroll", "Seasonal and permanent payroll, UIF and the returns that go with it."],
	["Loan & funding proposals", "Bank-ready packs for production loans, equipment finance and Land Bank conversations."],
	["CIPC compliance", "Company, CC and trust housekeeping kept current so funding is not delayed by admin."],
	["Financial models & budgets", "Crop, herd and input models you can take into a lender meeting."],
	["Record keeping", "Source documents, asset registers and production records organised for the next audit or grant."]
];
var outsourceServices = [
	["Bookkeeping & accounting", "Capture, recs and packs prepared to your review standard."],
	["Payroll", "Sage Payroll processed so your managers are not spending month-end on EMP201s."],
	["Taxation", "VAT201s, income tax workings and SARS follow-up, ready for the practitioner’s sign-off."],
	["Cloud automation", "Sage Accounting and Xero kept clean, with bank feeds and schedules that survive review."],
	["Company secretarial", "CIPC annual returns and beneficial ownership processed in batches for a firm’s client base."],
	["Consulting support", "Cash-flow, budgets and funding workings when a client file needs more than the close."]
];
var priceTiers = [
	{
		size: "Small / micro entity",
		price: "From R1,000 pm",
		detail: "Straightforward books, a modest transaction volume, and the monthly compliance rhythm.",
		featured: false
	},
	{
		size: "Growing business",
		price: "From R1,500–R2,500 pm",
		detail: "More activity, payroll, VAT and reporting that needs a closer monthly review.",
		featured: true
	},
	{
		size: "Medium entity",
		price: "From R3,000 pm",
		detail: "Multiple ledgers, staff, VAT and a pack that supports management decisions.",
		featured: false
	},
	{
		size: "Larger / complex entity",
		price: "Tailored quote",
		detail: "Group structures, higher volume or specialised reporting — scoped around the actual work.",
		featured: false,
		quote: true
	}
];
function Wordmark({ footer = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `wordmark ${footer ? "wordmark-footer" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "wordmark-logo",
			src: "/brand/logo.webp",
			alt: ""
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "wordmark-type",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "COMPLIANT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "BOOKKEEPING SA" })]
		})]
	});
}
function useReveals(pathname) {
	(0, import_react.useEffect)(() => {
		const items = Array.from(document.querySelectorAll("[data-reveal]"));
		if (!items.length) return;
		const show = (item) => item.classList.add("is-visible");
		const revealInView = () => {
			const threshold = window.innerHeight * 1.12;
			items.forEach((item) => {
				if (item.getBoundingClientRect().top <= threshold) show(item);
			});
		};
		if (!("IntersectionObserver" in window)) {
			items.forEach(show);
			return;
		}
		const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
			if (entry.isIntersecting) {
				show(entry.target);
				observer.unobserve(entry.target);
			}
		}), {
			rootMargin: "0px 0px -8% 0px",
			threshold: .12
		});
		items.forEach((item) => observer.observe(item));
		const frame = window.requestAnimationFrame(revealInView);
		window.addEventListener("scroll", revealInView, { passive: true });
		window.addEventListener("resize", revealInView);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", revealInView);
			window.removeEventListener("resize", revealInView);
			observer.disconnect();
		};
	}, [pathname]);
}
function Header() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const darkHeader = pathname !== "/";
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => setMenuOpen(false), [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `site-header ${darkHeader ? "site-header-dark" : ""} ${scrolled ? "site-header-scrolled" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "header-inner",
			"aria-label": "Main navigation",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "logo-link",
					"aria-label": "Compliant Bookkeeping SA home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "desktop-nav",
					children: [navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: `nav-link ${pathname === item.to ? "is-active" : ""}`,
						children: item.label
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "nav-cta",
						children: ["Book a consultation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMenuOpen(!menuOpen),
					className: "mobile-menu-button",
					"aria-label": menuOpen ? "Close navigation" : "Open navigation",
					"aria-expanded": menuOpen,
					children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { "aria-hidden": "true" })
				})
			]
		}), menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mobile-nav",
			children: [navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: () => setMenuOpen(false),
				className: "mobile-nav-link",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })]
			}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/contact",
				onClick: () => setMenuOpen(false),
				className: "mobile-nav-link",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a consultation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })]
			})]
		}) : null]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "site-footer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "logo-link",
					"aria-label": "Compliant Bookkeeping SA home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { footer: true })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "footer-links",
					children: navigation.slice(1).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-meta",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cape Town · Ceres · South Africa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Compliant Bookkeeping SA" })]
				})
			]
		})
	});
}
function WhatsAppDock() {
	const [preview, setPreview] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			if (sessionStorage.getItem("wa-preview-dismissed")) return;
		} catch {}
		const timer = window.setTimeout(() => setPreview(true), 1800);
		return () => window.clearTimeout(timer);
	}, []);
	const dismiss = () => {
		setPreview(false);
		try {
			sessionStorage.setItem("wa-preview-dismissed", "1");
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wa-dock",
		children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wa-preview",
			role: "dialog",
			"aria-label": "WhatsApp message",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wa-preview-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppAppIcon, { size: 36 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Compliant Bookkeeping SA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Usually replies in a few minutes" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Need the books in order? Message us on WhatsApp — no hard sell, just a practical next step." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wa-preview-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "wa-preview-open",
						href: SITE.whatsappHref,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppGlyph, {}), " Open WhatsApp"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "wa-preview-dismiss",
						onClick: dismiss,
						"aria-label": "Dismiss WhatsApp preview",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
					})]
				})
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			className: "wa-fab",
			href: SITE.whatsappHref,
			target: "_blank",
			rel: "noreferrer",
			"aria-label": "Chat on WhatsApp with Compliant Bookkeeping SA",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "wa-fab-label",
				children: "WhatsApp us"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppGlyph, {})]
		})]
	});
}
function Eyebrow({ children, muted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `eyebrow ${muted ? "eyebrow-muted" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), children]
	});
}
function HeroDock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-dock",
		"aria-label": "Contact options",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "hero-dock-item",
				href: SITE.whatsappHref,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": `WhatsApp ${SITE.phone}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppGlyph, { className: "hero-dock-wa" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "hero-dock-item",
				href: `mailto:${SITE.email}`,
				"aria-label": `Email ${SITE.email}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GmailAppIcon, { size: 48 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "hero-dock-item",
				href: SITE.mapsCapeTown,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": "Open maps for Cape Town and Ceres",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapsAppIcon, { size: 48 })
			})
		]
	});
}
function SiteShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	useReveals(pathname);
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto"
		});
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "page-transition",
				children
			}, pathname),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppDock, {})
		]
	});
}
var styles_default = "/assets/styles-OYfM8i6O.css";
var APP_NAME = "Compliant Bookkeeping SA";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Compliant Bookkeeping SA — professional accounting, payroll and compliance for South African businesses. Cape Town and Ceres."
			},
			{
				name: "theme-color",
				content: "#1E2528"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-BJcEbWMa.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("../_-CwTN9MC_.mjs");
var Route$8 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./agricultural-accounting-C19aZlR-.mjs");
var Route$7 = createFileRoute("/agricultural-accounting")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./approach-BIX-oI6l.mjs");
var Route$6 = createFileRoute("/approach")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./contact-C8PIY0Zg.mjs");
var Route$5 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./faq-msuOBqBH.mjs");
var Route$4 = createFileRoute("/faq")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./outsource-F1mhJdPM.mjs");
var Route$3 = createFileRoute("/outsource")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./pricing-DGYyKtjN.mjs");
var Route$2 = createFileRoute("/pricing")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./services-B_4NqGOQ.mjs");
var Route$1 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./who-we-help-DtBa9AAP.mjs");
var Route = createFileRoute("/who-we-help")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	SplatRoute: Route$8.update({
		id: "/$",
		path: "/$",
		getParentRoute: () => Route$10
	}),
	AgriculturalAccountingRoute: Route$7.update({
		id: "/agricultural-accounting",
		path: "/agricultural-accounting",
		getParentRoute: () => Route$10
	}),
	ApproachRoute: Route$6.update({
		id: "/approach",
		path: "/approach",
		getParentRoute: () => Route$10
	}),
	ContactRoute: Route$5.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$10
	}),
	FaqRoute: Route$4.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$10
	}),
	OutsourceRoute: Route$3.update({
		id: "/outsource",
		path: "/outsource",
		getParentRoute: () => Route$10
	}),
	PricingRoute: Route$2.update({
		id: "/pricing",
		path: "/pricing",
		getParentRoute: () => Route$10
	}),
	ServicesRoute: Route$1.update({
		id: "/services",
		path: "/services",
		getParentRoute: () => Route$10
	}),
	WhoWeHelpRoute: Route.update({
		id: "/who-we-help",
		path: "/who-we-help",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { agriculturalServices as a, priceTiers as c, SITE as i, services as l, Eyebrow as n, faqs as o, HeroDock as r, outsourceServices as s, router_exports as t };
