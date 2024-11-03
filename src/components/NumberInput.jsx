import React from "react";

export default function NumberInput(props) {
    const {
        onChange,
        placeholder = "Input a number",
        min = 1,
        max = 8,
        icon,
    } = props;
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState(min);
    const inputRef = React.useRef(null);
    return (
        <div className="number-input search-box">
            <div className="number-input-header search-header">
                {icon}
                <input
                    className="number-input-bar search-bar"
                    ref={inputRef}
                    readOnly={true}
                    type="string"
                    value={value + (value === 1 ? " Pasager" : " Pasageri")}
                    min={min}
                    max={max}
                    placeholder={placeholder}
                    onFocus={e => setShow(true)}
                    onBlur={e => {
                        setTimeout(() => {
                            setShow(false);
                        }, 100);
                    }}
                    onChange={(e) => {
                        e.preventDefault();
                        const value = e.target.value;
                        if (value < min || value > max) {
                            return;
                        }
                        onChange && onChange(value);
                    }}
                />
            </div>
            {show && (
                <div className="number-input-body search-body">
                    {Array.from({ length: max }).map((_, i) => {
                        return (
                            <div key={i} className={`number-input-item ${i === value - 1 ? "selected" : ""}`} onClick={e => {
                                setValue(i + 1);
                                setShow(false);
                            }}>
                                <span className="title">{i + 1}</span>
                                <span className="description">{i === 0 ? "Pasager" : "Pasageri"}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
