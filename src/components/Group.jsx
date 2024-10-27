import React from "react";

export function Separator() {
    return <div className="separator"></div>;
}

/**
 *
 * @param {{ children: React.ReactNode, title: string, description: string }} props
 * @returns
 */
export function Group(props) {
    const { children, title, description } = props;
    return (
        <div className="group" {...props}>
            <div className="group-title">
                {title && <h2>{title}</h2>}
                {description && <p>{description}</p>}
            </div>
            <div className="group-content">{children}</div>
        </div>
    );
}
