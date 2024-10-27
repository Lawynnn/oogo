import React from "react";

/**
 * @typedef ContainerProps
 * @property {React.ReactNode} children
 * @property {'row'|'column'} dir
 * @property {React.CSSProperties} style
 * @property {string} gap
 * @property {'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly'} align
 * @property {'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly'} justify
 */

/**
 * 
 * @param {ContainerProps} props 
 * @returns 
 */

export default function Container(props) {
    const { children, dir, style, gap, align, justify } = props;
    return (
        <div className="container" style={dir === "row" ? {
            flexDirection: "row",
            columnGap: gap,
            justifyContent: justify || "flex-start",
            alignItems: align || "center",
            ...style,
        } : {
            flexDirection: "column",
            rowGap: gap,
            justifyContent: justify || "flex-start",
            alignItems: align || "center",
            ...style,
        }}>
            {children}
        </div>
    )
}
