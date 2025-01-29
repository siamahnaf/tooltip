"use client"
import { CSSProperties, ForwardedRef, forwardRef } from "react";

//Types
import { ArrowTypes } from "./types";

interface Props {
    styles: CSSProperties;
    arrowProps?: ArrowTypes;
    variant: string;
}
const Arrow = forwardRef(({ styles, variant, arrowProps = {} }: Props, ref: ForwardedRef<SVGSVGElement>) => {
    const fillMap = new Map([
        ["info", "#3A3A3A"],
        ["error", "#FDEDED"],
        ["success", "#EDF7ED"],
        ["warning", "#FFF4E5"],
    ]);
    const {
        width = 14,
        height = 7,
        radius = 3,
        fill = fillMap.get(variant),
    } = arrowProps;

    const svgX = (width / 2) * (radius / -8 + 1);
    const svgY = ((height / 2) * radius) / 4;

    const dValue =
        'M0,0' +
        ` H${width}` +
        ` L${width - svgX},${height - svgY}` +
        ` Q${width / 2},${height} ${svgX},${height - svgY}` +
        ' Z';

    return (
        <svg
            aria-hidden
            ref={ref}
            width={width}
            height={width}
            viewBox={`0 0 ${width} ${height > width ? height : width}`}
            style={{
                position: "absolute",
                pointerEvents: "none",
                ...styles,
            }}
        >
            <path
                fill={fill}
                d={dValue}
            />
        </svg>
    );
});

export default Arrow;