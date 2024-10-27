import React from "react";

export default function Avatar({ children, ...props }) {
    const [state, setState] = React.useState("loading");
    React.useEffect(() => {
        if(!props.src) {
            setState("error");
        }
    }, [state, props.src]);
    return (
        <div className="avatar" {...props}>
            <img
                src={props.src}
                alt={props.alt}
                onLoadStart={(e) => setState("loading")}
                onError={(e) => setState("error")}
                onLoad={(e) => setState("loaded")}
            />
            {state === "error" || state === "loading" ? children : null}
        </div>
    );
}

Avatar.Placeholder = ({children}) => {
    return <div className="avatar-placeholder">{children.toString()}</div>;
}