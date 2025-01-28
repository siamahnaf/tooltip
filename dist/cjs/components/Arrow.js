"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Arrow = (0, react_1.forwardRef)(({ styles, variant, arrowProps = {} }, ref) => {
    const fillMap = new Map([
        ["info", "#3A3A3A"],
        ["error", "#FDEDED"],
        ["success", "#EDF7ED"],
        ["warning", "#FFF4E5"],
    ]);
    const { width = 14, height = 7, radius = 3, fill = fillMap.get(variant), } = arrowProps;
    const svgX = (width / 2) * (radius / -8 + 1);
    const svgY = ((height / 2) * radius) / 4;
    const dValue = 'M0,0' +
        ` H${width}` +
        ` L${width - svgX},${height - svgY}` +
        ` Q${width / 2},${height} ${svgX},${height - svgY}` +
        ' Z';
    return ((0, jsx_runtime_1.jsx)("svg", { "aria-hidden": true, ref: ref, width: width, height: width, viewBox: `0 0 ${width} ${height > width ? height : width}`, style: Object.assign({ position: "absolute", pointerEvents: "none" }, styles), children: (0, jsx_runtime_1.jsx)("path", { fill: fill, d: dValue }) }));
});
exports.default = Arrow;
//# sourceMappingURL=Arrow.js.map