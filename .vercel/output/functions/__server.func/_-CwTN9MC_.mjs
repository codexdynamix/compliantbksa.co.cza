import { b as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowRight } from "./_libs/lucide-react.mjs";
import { n as Eyebrow } from "./_ssr/router-5qNxrjpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-CwTN9MC_.js
var import_jsx_runtime = require_jsx_runtime();
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "not-found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "404 / Not found" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "That page took a wrong turn." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Let's get you back to the useful stuff." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "button button-dark",
					children: ["Back to home ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
				})
			]
		})
	});
}
//#endregion
export { NotFound as component };
