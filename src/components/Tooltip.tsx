"use client"
import { useState, useEffect, useRef, cloneElement, CSSProperties } from "react";
import { computePosition, offset as floatOffset, shift, arrow as floatArrow, flip } from '@floating-ui/react-dom';
import { createPortal } from "react-dom";

//Components
import Arrow from "./Arrow";

//Css
import { successCss, infoCss, errorCss, warningCss } from "./variant";

//Types
import { TooltipProps } from "./types";

const Tooltip = (props: TooltipProps) => {
    const containerMap = new Map([
        ["info", infoCss],
        ["error", errorCss],
        ["success", successCss],
        ["warning", warningCss],
    ]);

    //props 
    const {
        children,
        content,
        placement = "top",
        trigger = "hover",
        openDefault = false,
        offset = 10,
        variant = "info",
        showArrow = true,
        arrowConfig,
        className = "",
        styles
    } = props;

    //Styles
    const containerStyle = Object.assign({}, containerMap.get(variant), styles);

    //State
    const [show, setShow] = useState(openDefault);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [arrowCss, setArrowCss] = useState<CSSProperties>({});

    //Ref
    const tooltipRef = useRef<HTMLDivElement>(null);
    const referenceRef = useRef<HTMLElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);


    useEffect(() => {
        if (!referenceRef.current || !tooltipRef.current) return;

        const updatePosition = async () => {
            const { x, y, middlewareData, placement: place } = await computePosition(referenceRef.current!, tooltipRef.current!, {
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
                const { x, y } = middlewareData.arrow
                if (place.includes('top')) {
                    setArrowCss({
                        top: "100%",
                        left: `${x}px`
                    })
                } else if (place.includes('right')) {
                    setArrowCss({
                        right: "100%",
                        top: `${y}px`,
                        transform: "rotate(90deg)"
                    })
                } else if (place.includes("bottom")) {
                    setArrowCss({
                        bottom: "100%",
                        left: `${x}px`,
                        transform: "rotate(180deg)"
                    })
                } else {
                    setArrowCss({
                        left: "100%",
                        top: `${y}px`,
                        transform: "rotate(-90deg)"
                    })
                }
            }
        };
        updatePosition();
    }, [show]);

    return (
        <div>
            {trigger === "hover" ? cloneElement(children, {
                ref: referenceRef,
                onMouseEnter: () => setShow(true),
                onMouseLeave: () => setShow(false)
            }) : cloneElement(children, {
                ref: referenceRef,
                onFocus: () => setShow(true),
                onBlur: () => setShow(false)
            })}
            {show &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        style={{
                            ...containerStyle,
                            position: "absolute",
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                        }}
                        className={className}
                    >
                        {showArrow &&
                            <Arrow
                                ref={arrowRef}
                                styles={arrowCss}
                                arrowProps={arrowConfig}
                                variant={variant}
                            />
                        }
                        {content}
                    </div>, document.body
                )
            }
        </div>
    );
};

export default Tooltip;
