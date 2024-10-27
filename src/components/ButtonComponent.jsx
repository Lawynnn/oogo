import React from "react";
import { Loader2 } from "lucide-react";

export default function ButtonComponent(props) {
    const {
        onClick,
        style,
        loading,
        text,
        disabled,
        icon,
        windowClick = true,
    } = props;

    const Icon = icon;

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if(onClick && !disabled && !loading)
                onClick(e);
        }
    };

    React.useEffect(() => {
        if (windowClick) {
            window.addEventListener("keypress", handleKeyPress);
        }
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [windowClick]);

    return (
        <button className="button-body" data-disabled={loading || disabled} onClick={(e) => {
            if(onClick && !disabled && !loading)
                onClick(e);
        }} style={style}>
            {text}
            {
                
                loading ? (
                    <Loader2 data-hidden="false" className="loader" />
                ) : Icon ? <Icon className="icon" /> : <Loader2 data-hidden="true" className="loader" />
            }
        </button>
    );
}
