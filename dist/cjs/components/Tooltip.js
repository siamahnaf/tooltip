"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("@floating-ui/react-dom");
const react_dom_2 = require("react-dom");
//Components
const Arrow_1 = __importDefault(require("./Arrow"));
//Css
const variant_1 = require("./variant");
const Tooltip = (props) => {
    const containerMap = new Map([
        ["info", variant_1.infoCss],
        ["error", variant_1.errorCss],
        ["success", variant_1.successCss],
        ["warning", variant_1.warningCss],
    ]);
    //props 
    const { children, content, placement = "top", trigger = "hover", openDefault = false, offset = 10, variant = "info", showArrow = true, arrowConfig, className = "", styles } = props;
    //Styles
    const containerStyle = Object.assign({}, containerMap.get(variant), styles);
    //State
    const [show, setShow] = (0, react_1.useState)(openDefault);
    const [tooltipPosition, setTooltipPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const [arrowCss, setArrowCss] = (0, react_1.useState)({});
    //Ref
    const tooltipRef = (0, react_1.useRef)(null);
    const referenceRef = (0, react_1.useRef)(null);
    const arrowRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!referenceRef.current || !tooltipRef.current)
            return;
        const updatePosition = () => __awaiter(void 0, void 0, void 0, function* () {
            const { x, y, middlewareData, placement: place } = yield (0, react_dom_1.computePosition)(referenceRef.current, tooltipRef.current, {
                placement: placement,
                middleware: [
                    (0, react_dom_1.offset)(offset),
                    (0, react_dom_1.shift)(),
                    (0, react_dom_1.flip)(),
                    (0, react_dom_1.arrow)({ element: arrowRef.current })
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
    return ((0, jsx_runtime_1.jsxs)("div", { children: [trigger === "hover" ? (0, react_1.cloneElement)(children, {
                ref: referenceRef,
                onMouseEnter: () => setShow(!show),
                onMouseLeave: () => setShow(!show)
            }) : (0, react_1.cloneElement)(children, {
                ref: referenceRef,
                onFocus: () => setShow(!show),
                onBlur: () => setShow(!show)
            }), show &&
                (0, react_dom_2.createPortal)((0, jsx_runtime_1.jsxs)("div", { ref: tooltipRef, style: Object.assign(Object.assign({}, containerStyle), { position: "absolute", left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }), className: className, children: [showArrow &&
                            (0, jsx_runtime_1.jsx)(Arrow_1.default, { ref: arrowRef, styles: arrowCss, arrowProps: arrowConfig, variant: variant }), content] }), document.body)] }));
};
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map