import React from "react";
import "../styles/OTP.css";

export function OTPSeparator(props) {
    const { gap = 10 } = props;
    return (
        <div
            {...props}
            style={{
                margin: `0 ${gap}px`,
            }}
            className="otp-separator"
        ></div>
    );
}

export function OTPSlot(props) {
    const { index, w, slotref } = props;
    return (
        <input
            {...props}
            ref={slotref}
            style={{ width: `${w}px`, height: `${w}px` }}
            type="string"
            maxLength="1"
            className="otp-slot"
            data-index={index}
        />
    );
}

export function OTPGroup(props) {
    const { length, w } = props;
    return (
        <div className="otp-group">
            {React.Children.map(props.children, (child, index) => {
                return React.cloneElement(child, { length, w });
            })}
        </div>
    );
}

export function OTPInput(props) {
    const { length = 6, onFinish, onModify } = props;
    const [value, setValue] = React.useState("");

    function createSlots() {
        const refs = [];
        for (let i = 0; i < length; i++) {
            refs.push(React.createRef());
        }
        return refs;
    }

    const elRefs = createSlots();
    return (
        <div
            className="otp-input"
            onClick={(e) => {
                e.preventDefault();
            }}
        >
            {Array.from({ length })
                .fill(null)
                .map((_, index) => {
                    return (
                        <OTPSlot
                            key={index}
                            index={index}
                            length={length}
                            w={props.w}
                            slotref={(el) => {
                                elRefs[index] = el;
                            }}
                            onKeyDown={(e) => {
                                e.preventDefault();
                                if (
                                    e.key === "Backspace"
                                ) {
                                    elRefs[index].value = "";
                                    elRefs[index - 1]?.focus();
                                    let v = value.slice(0, -1);
                                    setValue(v);
                                    onModify && onModify(v);
                                }
                                else if(e.key === "ArrowLeft") {
                                    elRefs[index - 1]?.focus();
                                }
                                else if(e.key === "ArrowRight") {
                                    elRefs[index + 1]?.focus();
                                }
                                else if(e.key === "v" && e.ctrlKey) {
                                    e.preventDefault();
                                    let v = "";
                                    navigator.clipboard.readText().then(text => {
                                        if(text.length > 6) {
                                            return;
                                        }
                                        for(let i = 0; i < text.length; i++) {
                                            elRefs[i].value = text[i];
                                            v += text[i];
                                        }
                                        setValue(v);
                                        onFinish && onFinish(v);
                                    });
                                }
                                else if(e.key.length === 1 && !isNaN(e.key) && value.length < length) {
                                    elRefs[index].value = e.key;
                                    elRefs[index + 1]?.focus();
                                    setValue(value + e.key);
                                    onModify && onModify(value + e.key);
                                    if(value.length === length - 1) {
                                        onFinish && onFinish(value + e.key);
                                    }

                                    
                                }
                                else {
                                    e.preventDefault();
                                }
                            }}
                        />
                    );
                })}
        </div>
    );
}
