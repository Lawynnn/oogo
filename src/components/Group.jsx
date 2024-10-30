import React from "react";

/**
 *
 * @param {{ children: React.ReactNode, title: string, description: string }} props
 * @returns
 */
export default function Group(props) {
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
