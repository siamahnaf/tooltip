"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
const Arrow = forwardRef(({ styles, variant, arrowProps = {} }, ref) => {
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
    return (_jsx("svg", { "aria-hidden": true, ref: ref, width: width, height: width, viewBox: `0 0 ${width} ${height > width ? height : width}`, style: Object.assign({ position: "absolute", pointerEvents: "none" }, styles), children: _jsx("path", { fill: fill, d: dValue }) }));
});
export default Arrow;
//# sourceMappingURL=Arrow.js.map