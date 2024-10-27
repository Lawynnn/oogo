import React from "react";
import "../styles/Popup.css";

export function Popup(props) {
    const { children, float, active, header, gap, vgap = 10, hgap = 10, className } = props;
    const popupHeader = React.useRef(null);
    const popupBody = React.useRef(null);
    const popup = React.useRef(null);

    const VGAP = gap || hgap || 10;
    const GAP = gap || vgap || 10;

    React.useEffect(() => {
        const pheader = popupHeader.current.getBoundingClientRect();
        const pbody = popupBody.current.getBoundingClientRect();
        const wind = { width: window.innerWidth, height: window.innerHeight };
        console.log(pheader, pbody, wind);

        if(float === "bottom") {
            if(pheader.y + pbody.height > wind.height) {
                // too big for the bottom screen so move to top
                popupBody.current.style.top = `${pheader.top + pheader.height + GAP}px`;
                popupBody.current.style.bottom = "auto";
            }
            else {
                popupBody.current.style.top = `${GAP + pheader.height + pheader.top}px`;
                popupBody.current.style.bottom = "auto";
            }

            if(pheader.x + pbody.width > wind.width) {
                popupBody.current.style.right = `${VGAP}px`;
                popupBody.current.style.left = "auto";
            }
            else {
                popupBody.current.style.left = `${pheader.left - pheader.width - pbody.width}px`;
                popupBody.current.style.right = "auto";
            }
        }

    }, []);

    return (
        <div
            className={`popup`}
            data-active={active.toString()}
            ref={popup}
            data-float={`${float}`}
        >
            <div className="popup-header" ref={popupHeader}>
                {header}
            </div>
            <div className={`popup-body ${className ? className : ""}`} ref={popupBody}>
                {children}
            </div>
        </div>
    );
};
