import React from "react";
import "../styles/Alert.css";

export default function Alert(props) {
    const { type, title, description, timeout, children, show, onTimeoutEnded } = props;
    const alertRef = React.useRef(null);
    const [timedEnd, setTimedEnd] = React.useState(false);

    React.useEffect(() => {
        if (show) {
            alertRef.current.style.opacity = "1";
            alertRef.current.style.transform = "translateX(-50%) translateY(0)";
        }
        else {
            alertRef.current.style.opacity = "0";
            alertRef.current.style.transform = "translateX(-50%) translateY(100%)";
        }
    }, [show]);

    React.useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                setTimedEnd(true);
                if(!show) {
                    clearTimeout(timer);
                    return;
                }
                
                alertRef.current.style.opacity = "0";
                alertRef.current.style.transform = "translateX(-50%) translateY(100%)";
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [onTimeoutEnded]);
    return (
        <div
            className="alert-wrapper"
            {...props}
            ref={alertRef}
            data-type={type}
            show={show?.toString() || "false"}
            onClick={(e) => {
                if(e.target === alertRef.current) {
                    alertRef.current.style.opacity = "0";
                    alertRef.current.style.transform = "translateX(-50%) translateY(100%)";
                    onTimeoutEnded && onTimeoutEnded();
                }
            }}
            onTransitionEnd={(e) => {
                //todo:
                if(e.propertyName === "opacity" && timedEnd) {
                    onTimeoutEnded && onTimeoutEnded();
                }
            }}
        >
            <div className={`alert`}>
                <div className="alert-header">{children}</div>
                <div className="alert-footer">
                    <h2 className="alert-title">{title}</h2>
                    <p className="alert-description">{description}</p>
                </div>
            </div>
        </div>
    );
}
