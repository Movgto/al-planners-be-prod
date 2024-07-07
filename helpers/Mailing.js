"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlForEventNotification = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const HtmlForEventNotification = (props) => {
    return ((0, jsx_runtime_1.jsx)(components_1.Html, { children: (0, jsx_runtime_1.jsx)(components_1.Tailwind, { children: (0, jsx_runtime_1.jsx)(components_1.Body, { className: "bg-pink-300 flex flex-col items-center px-5 py-10", children: (0, jsx_runtime_1.jsxs)(components_1.Container, { className: "flex flex-col gap-4 bg-white rounded-lg p-4", children: [(0, jsx_runtime_1.jsxs)(components_1.Heading, { className: "text-black font-semibold text-xl text-center", children: ["Gracias por agendar tu", ' ', (0, jsx_runtime_1.jsx)("span", { className: 'font-bold text-pink-400', children: "cita" }), ' ', "con nosotros!", ' ', (0, jsx_runtime_1.jsx)("span", { className: 'font-bold text-pink-400', children: props.name })] }), (0, jsx_runtime_1.jsx)(components_1.Img, { src: "cid:alplannerslogo", alt: "al planners logo", className: "w-full" }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: 'text-center text-lg', children: ["Te estaremos esperando el", ' ', (0, jsx_runtime_1.jsx)("span", { className: 'font-bold text-rose-400', children: props.date }), " a las ", (0, jsx_runtime_1.jsx)("strong", { children: props.hour }), "!"] })] }) }) }) }));
};
exports.HtmlForEventNotification = HtmlForEventNotification;
//# sourceMappingURL=Mailing.js.map