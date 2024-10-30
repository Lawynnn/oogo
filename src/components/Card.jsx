import React from "react";
import "../styles/Card.css";

/**
 *
 * @param {{ title: string, description: string, circle: 'left'|'right'}} props
 * @returns
 */
export default function Card(props) {
    const { title, description, circle } = props;
    return (
        <div className="card">
            <div className={`card-circle ${circle}`}></div>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
}
