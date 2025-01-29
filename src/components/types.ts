import { Placement } from "@floating-ui/react-dom";
import { CSSProperties, JSX, ReactNode } from "react"

export type TooltipProps = {
    children: JSX.Element;
    content: ReactNode | string;
    placement?: Placement;
    trigger?: "hover" | "click";
    openDefault?: boolean;
    offset?: number;
    variant?: "success" | "warning" | "error" | "info"
    showArrow?: boolean;
    arrowConfig?: ArrowTypes;
    className?: string;
    styles?: Omit<CSSProperties, "position" | "left" | "top">;
}

export type ArrowTypes = {
    width?: number;
    height?: number;
    radius?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    fill?: string;
}