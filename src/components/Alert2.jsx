import React from "react";
import "../styles/Alert.css";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

/**
 *
 * @param {{ title?: string, type: ('info'|'error'|'warning'|'success')}} param0
 * @returns
 */
const AlertTypes = {
    "info": {
        icon: <Info className="icon" />
    },
    "error": {
        icon: <CircleAlert className="icon" />
    },
    "warning": {
        icon: <TriangleAlert className="icon" />
    },
    "success": {
        icon: <CircleCheck className="icon" />
    }
}

export default function Alert2({ title, type, message, fadingOut = false }) {
    return (
        <div className={`alert ${type || "info"} ${fadingOut ? "fade-out" : "fade-in"}`}>
            <div className="alert-header">
                {AlertTypes[type || "info"].icon}
            </div>
            <div className="alert-footer">
                {title && <h2 className="alert-title">{title}</h2>}
                <p className="alert-description">{message}</p>
            </div>
        </div>
    );
}
