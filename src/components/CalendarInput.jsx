import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import "../styles/CalendarInput.css";
import useTranslation from "../hooks/useTranslation";

const months = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
];

const days = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sa", "Du"];

/**
 *
 * @param {Date} date
 */
function formatDate(date) {
    const now = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    if (day === now.getDate()) {
        return "Today";
    }

    return `${month} ${day}, ${year}`;
}

/**
 *
 * @param {{ icon: React.ReactNode, placeholder: string, defaultValue: Date, onPick: (date: Date) => void }} props
 * @returns
 */
export default function CalendarInput(props) {
    const { icon, placeholder = "", defaultValue = new Date(), onPick } = props;
    const [date, setDate] = React.useState(defaultValue);
    const [show, setShow] = React.useState(false);
    const now = new Date();
    const inputRef = React.useRef(null);

    const monthDays = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay();

    const { translate } = useTranslation();

    return (
        <div className="calendar-input search-box">
            <div className="calendar-input-header search-header" onClick={e => inputRef.current.focus()}>
                {icon && icon}
                <input
                    ref={inputRef}
                    type="text"
                    className="calendar-input-bar search-bar"
                    placeholder={placeholder}
                    onFocus={(e) => setShow(true)}
                    onBlur={(e) => {
                        // setTimeout(() => {
                        //     setShow(false);
                        // }, 100);
                    }}
                    value={formatDate(date)}
                />
            </div>
            {show && (
                <div className="calendar-input-body search-body">
                    <div className="calendar-title">
                        <button
                            className="calendar-input-button prev"
                            onClick={(e) => {
                                inputRef.current.focus();
                                setDate(
                                    new Date(
                                        date.getFullYear(),
                                        date.getMonth() - 1
                                    )
                                );
                            }}
                        >
                            <ChevronLeft />
                        </button>
                        <div className="title">
                            <span className="month">
                                {months[date.getMonth()]}
                            </span>
                            {date.getFullYear() !== now.getFullYear() && (
                                <span className="year">
                                    {date.getFullYear()}
                                </span>
                            )}
                        </div>
                        <button
                            className="calendar-input-button next"
                            onClick={(e) => {
                                inputRef.current.focus();
                                setDate(
                                    new Date(
                                        date.getFullYear(),
                                        date.getMonth() + 1
                                    )
                                );
                            }}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                    <div className="calendar-table">
                        <table>
                            <thead>
                                <tr>
                                    {days.map((d, i) => (
                                        <th key={i}>{d}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array(
                                    monthDays(
                                        date.getFullYear(),
                                        date.getMonth()
                                    ) + firstDayOfMonth
                                )
                                    .fill(0)
                                    .map((_, i) => {
                                        if (i % 7 === 0) {
                                            return (
                                                <tr key={i / 7}>
                                                    {Array(7)
                                                        .fill(0)
                                                        .map((_, j) => {
                                                            const day =
                                                                i -
                                                                firstDayOfMonth +
                                                                j +
                                                                1;
                                                            if (
                                                                day <= 0 ||
                                                                day >
                                                                    monthDays(
                                                                        date.getFullYear(),
                                                                        date.getMonth()
                                                                    )
                                                            ) {
                                                                return (
                                                                    <td
                                                                        key={j}
                                                                    ></td>
                                                                );
                                                            }
                                                            return (
                                                                <td
                                                                    className={`day ${
                                                                        day ===
                                                                        now.getDate()
                                                                            ? "today"
                                                                            : ""
                                                                    } ${day === date.getDate() ? "selected" : ""}`}
                                                                    key={j}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        onPick &&
                                                                            onPick(
                                                                                new Date(
                                                                                    date.getFullYear(),
                                                                                    date.getMonth(),
                                                                                    day
                                                                                )
                                                                            );
                                                                        setDate(
                                                                            new Date(
                                                                                date.getFullYear(),
                                                                                date.getMonth(),
                                                                                day
                                                                            )
                                                                        );
                                                                        setShow(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    {day}
                                                                </td>
                                                            );
                                                        })}
                                                </tr>
                                            );
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
