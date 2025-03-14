"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, cloneElement } from "react";
import { computePosition, offset as floatOffset, shift, arrow as floatArrow, flip } from '@floating-ui/react-dom';
import { createPortal } from "react-dom";
//Components
import Arrow from "./Arrow";
//Css
import { successCss, infoCss, errorCss, warningCss } from "./variant";
const Tooltip = (props) => {
    const containerMap = new Map([
        ["info", infoCss],
        ["error", errorCss],
        ["success", successCss],
        ["warning", warningCss],
    ]);
    //props 
    const { children, content, placement = "top", trigger = "hover", openDefault = false, offset = 10, variant = "info", showArrow = true, arrowConfig, className = "", styles } = props;
    //Styles
    const containerStyle = Object.assign({}, containerMap.get(variant), styles);
    //State
    const [show, setShow] = useState(openDefault);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [arrowCss, setArrowCss] = useState({});
    //Ref
    const tooltipRef = useRef(null);
    const referenceRef = useRef(null);
    const arrowRef = useRef(null);
    useEffect(() => {
        if (!referenceRef.current || !tooltipRef.current)
            return;
        const updatePosition = () => __awaiter(void 0, void 0, void 0, function* () {
            const { x, y, middlewareData, placement: place } = yield computePosition(referenceRef.current, tooltipRef.current, {
                placement: placement,
                middleware: [
                    floatOffset(offset),
                    shift(),
                    flip(),
                    floatArrow({ element: arrowRef.current })
                ],
            });
            setTooltipPosition({ x, y });
            if (middlewareData.arrow) {
                const { x, y } = middlewareData.arrow;
                if (place.includes('top')) {
                    setArrowCss({
                        top: "100%",
                        left: `${x}px`
                    });
                }
                else if (place.includes('right')) {
                    setArrowCss({
                        right: "100%",
                        top: `${y}px`,
                        transform: "rotate(90deg)"
                    });
                }
                else if (place.includes("bottom")) {
                    setArrowCss({
                        bottom: "100%",
                        left: `${x}px`,
                        transform: "rotate(180deg)"
                    });
                }
                else {
                    setArrowCss({
                        left: "100%",
                        top: `${y}px`,
                        transform: "rotate(-90deg)"
                    });
                }
            }
        });
        updatePosition();
    }, [show]);
    return (_jsxs("div", { children: [trigger === "hover" ? cloneElement(children, {
                ref: referenceRef,
                onMouseEnter: () => setShow(true),
                onMouseLeave: () => setShow(false)
            }) : cloneElement(children, {
                ref: referenceRef,
                onFocus: () => setShow(true),
                onBlur: () => setShow(false)
            }), show &&
                createPortal(_jsxs("div", { ref: tooltipRef, style: Object.assign(Object.assign({}, containerStyle), { position: "absolute", left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }), className: className, children: [showArrow &&
                            _jsx(Arrow, { ref: arrowRef, styles: arrowCss, arrowProps: arrowConfig, variant: variant }), content] }), document.body)] }));
};
export default Tooltip;
//# sourceMappingURL=Tooltip.js.map