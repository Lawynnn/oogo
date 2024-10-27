import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "../styles/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthsName = [
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

export default function CalendarComponent(props) {
    const { onPick, value } = props;
    if(value && !(value instanceof Date)) {
        throw new Error("value prop must be a Date object");
    }

    let today = new Date();
    if(value) {
        today = value;
    }

    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentDay, setCurrentDay] = useState(today.getDate());

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < daysInMonth(currentYear, currentMonth); i++) {
        days.push(i + 1);
    }

    let size = daysInMonth(currentYear, currentMonth) + firstDayOfMonth;
    if (size % 7 !== 0) {
        size += 7 - (size % 7);
    }

    React.useEffect(() => {
        // console.log(currentYear, currentMonth + 1, currentDay);
        // console.log("sdd: ", new Date(currentYear, currentMonth, currentDay).toDateString());
        if(onPick) {
            onPick(new Date(currentYear, currentMonth, currentDay));
        }
    }, [currentYear, currentMonth, currentDay]);

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button
                    className="calendar-button calendar-previous"
                    onClick={(e) => {
                        setCurrentDay(1);
                        setCurrentMonth(currentMonth - 1);
                        if (currentMonth === 0) {
                            setCurrentYear(currentYear - 1);
                            setCurrentMonth(11);
                        }
                    }}
                >
                    <ChevronLeft className="icon" />
                </button>
                <span className="calendar-title">
                    {monthsName[currentMonth]} {currentYear}
                </span>
                <button
                    className="calendar-button calendar-next"
                    onClick={(e) => {
                        setCurrentDay(1);
                        setCurrentMonth(currentMonth + 1);
                        if (currentMonth === 11) {
                            setCurrentYear(currentYear + 1);
                            setCurrentMonth(0);
                        }
                    }}
                >
                    <ChevronRight className="icon" />
                </button>
            </div>
            <div className="calendar-footer">
                <div className="days-names">
                    {daysName.map((day) => (
                        <span key={day} className="day-name">
                            {day}
                        </span>
                    ))}
                </div>
                <div className="days">
                    {new Array(firstDayOfMonth).fill(null).map((_, i) => {
                        if (currentMonth === 0) {
                            return (
                                <span
                                    key={i}
                                    className="day-previous day day-fill"
                                    onClick={(e) => {
                                        setCurrentMonth(11);
                                        setCurrentDay(
                                            daysInMonth(currentYear, 11) -
                                                (firstDayOfMonth - i) +
                                                1
                                        );
                                        setCurrentYear(currentYear - 1);
                                    }}
                                >
                                    {daysInMonth(currentYear, 11) -
                                        (firstDayOfMonth - i) +
                                        1}
                                </span>
                            );
                        }
                        const prevMonthDays = daysInMonth(
                            currentYear,
                            currentMonth
                        );
                        return (
                            <span
                                key={i}
                                className="day-previous day day-fill"
                                onClick={(e) => {
                                    setCurrentMonth(currentMonth - 1);
                                    setCurrentDay(
                                        prevMonthDays -
                                            (firstDayOfMonth - i) +
                                            1
                                    );
                                    if (currentMonth === 0) {
                                        setCurrentYear(currentYear - 1);
                                    }
                                }}
                            >
                                {prevMonthDays - (firstDayOfMonth - i) + 1}
                            </span>
                        );
                    })}
                    {days.map((day) => (
                        <span
                            key={day}
                            onClick={(e) => {
                                setCurrentDay(day);
                            }}
                            className={`day`}
                            data-selected={currentDay === day}
                        >
                            {day}
                        </span>
                    ))}
                    {new Array(size - (days.length + firstDayOfMonth))
                        .fill(null)
                        .map((_, i) => {
                            return (
                                <span
                                    key={i}
                                    onClick={(e) => {
                                        setCurrentDay(i + 1);

                                        if (currentMonth === 11) {
                                            setCurrentMonth(0);
                                            setCurrentYear(currentYear + 1);
                                        }

                                        if (currentMonth < 11) {
                                            setCurrentMonth(currentMonth + 1);
                                        }
                                    }}
                                    className="day-next day day-fill"
                                >
                                    {i + 1}
                                </span>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
