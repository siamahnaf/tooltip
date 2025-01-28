import { CSSProperties } from "react";
import { ArrowTypes } from "./types";
interface Props {
    styles: CSSProperties;
    arrowProps?: ArrowTypes;
    variant: string;
}
declare const Arrow: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<SVGSVGElement>>;
export default Arrow;
