import { ChevronRight } from "lucide-react";
import React from "react";

/**
 * @typedef LinkButtonProps
 * @property {string} href
 * @property {?React.ReactNode} icon
 * @property {?boolean|React.ReactElement} iconed right icon displayed
 * @property {?string} desc
 * @property {'outline'|'filled'|'ghost'} variant
 */

/**
 * 
 * @param {LinkButtonProps|React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} props
 * @returns 
 */
export default function LinkButton(props) {
    const { href, icon, iconed = true, desc, variant = "ghost" } = props;
    const Icon = icon;
    const Iconed = iconed;
    return (
        <button
            {...props}
            className={`link-button ${props.className || ""} variant-${variant}`}
            onClick={(e) => {
                if (href) {
                    e.preventDefault();
                    window.location.href = href;
                    return;
                }

                props.onClick && props.onClick(e);
            }}
        >
            <header>
                <div className="wrapper">
                    {Icon && <Icon className="icon" />}
                    {props.children}
                </div>
                {desc && <p className="description">{desc}</p>}
            </header>
            {iconed === true ?  <ChevronRight className="icon-right" /> : iconed === false ? "" : <Iconed className="icon-right" />}
        </button>
    );
}
