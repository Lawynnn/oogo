import React from "react";
import { Calendar, Eye, EyeOff, X } from "lucide-react";
import CalendarComponent from "./CalendarComponent";
import { Popup, PopupBody, PopupHeader } from "./Popup";

/**
 * 
 * @typedef {Object} InputComponentProps
 * @property {'text'|'password'|'date'|'file'} type
 * @property {string} placeholder
 * @property {string} value
 * @property {function(Event): void} onInput
 * @property {string} description
 * @property {?boolean} float
 * @property {?string} accept
 * @property {?function({success: boolean, message: string}): void} onPass
 * @property {?function({success: boolean, message: string}): void} onError
 * @property {?function(string): {success: boolean, message: string}} check
 */

function formatDate(date) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Helper function to get the ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th"; // For days 4 - 20
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

/**
 * 
 * @param {InputComponentProps} props 
 * @returns 
 */
export default function InputComponent(props) {
    const {
        type,
        placeholder,
        value,
        onInput,
        description,
        float,
        accept,
        onPass,
        onError,
        check,
    } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const [activeCalendar, setActiveCalendar] = React.useState(false);
    const [content, setContent] = React.useState("");

    const inputRef = React.useRef(null);
    const actionButtonRef = React.useRef(null);
    let val = value;
    if (type === "date" && !value) {
        val = new Date();
    }

    // format for date like this Month day th/rd, year
    // val.f
    return (
        <div className="input-wrapper">
            <div className="header">
                <span
                    className="description"
                    onClick={(e) => type !== "date" && inputRef.current.focus()}
                >
                    {description}
                </span>
            </div>
            <div
                className="footer"
                onClick={(e) => {
                    if (type !== "date") {
                        inputRef.current.focus();
                    } else {
                        setActiveCalendar(!activeCalendar);
                    }
                }}
            >
                {type !== "date" ? (
                    <input
                        ref={inputRef}
                        accept={accept}
                        type={
                            type === "password" && showPassword ? "text" : type
                        }
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            setContent(e.target.value);
                            if (onInput) onInput(e);

                            if (check) {
                                const res = check(e.target.value);
                                if (res.success) {
                                    onPass && onPass(res);
                                } else {
                                    onError && onError(res);
                                }
                            }
                        }}
                    />
                ) : (
                    <div className="calendar-body">
                        <Popup
                            active={activeCalendar}
                            header={
                                <button
                                    className="calendar-opener"
                                    onClick={(e) => {
                                        setActiveCalendar(!activeCalendar);
                                    }}
                                >
                                    {formatDate(val)}
                                </button>
                            }
                        >
                            <CalendarComponent
                                onPick={(v) => {
                                    onInput({
                                        target: {
                                            value: v,
                                        },
                                    });
                                }}
                            />
                        </Popup>
                    </div>
                )}

                {type === "password" && (
                    <button className="action-button">
                        {showPassword ? (
                            <Eye
                                className="icon"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <EyeOff
                                className="icon"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </button>
                )}
                {type === "text" && (
                    <button
                        className="action-button"
                        ref={actionButtonRef}
                        active={`${content.length > 0}`}
                        onClick={(e) => {
                            inputRef.current.value = "";
                            onInput &&
                                onInput({
                                    target: {
                                        value: "",
                                    },
                                });
                            if (check) {
                                const res = check("");
                                if (res.success) {
                                    onPass && onPass(res);
                                } else {
                                    onError && onError(res);
                                }
                            }
                            setContent("");
                            inputRef.current.focus();
                        }}
                    >
                        <X className="icon" />
                    </button>
                )}
                {type === "date" && <Calendar className="icon calendar-icon" />}
            </div>
        </div>
    );
}
