import React from "react";

/**
 *
 * @param {{ children: React.ReactNode, dir: 'row'|'column', style: React.CSSProperties, gap: string, align: 'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly', justify: 'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly', className: string }} props
 * @returns
 */
export default function Flex(props) {
    const dir = props.dir || "row";
    const gap = props.gap || "10px";
    return (
        <div
            {...props}
            className={`flex-container ${props.className || ""}`}
            style={{
                flexDirection: dir,
                columnGap: dir === "row" ? gap : "0px",
                rowGap: dir === "column" ? gap : "0px",
                justifyContent: props.justify || "flex-start",
                alignItems: props.align || "center",
                ...props.style,
            }}
        >
            {props.children}
        </div>
    );
}
