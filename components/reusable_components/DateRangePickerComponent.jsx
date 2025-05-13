import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
    createStaticRanges,
    DateRangePicker,
    defaultStaticRanges,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { GrClear } from "react-icons/gr";
import { X } from "lucide-react";

export default function DateRangePickerComponent({ state, handleSelect, setDateRange }) {
    const pickerRef = useRef(null);

    const [showCalendar, setShowCalendar] = useState(false);

    const customStaticRanges = createStaticRanges([
        {
            label: "Semi-Annual (1st Half)",

            range: () => ({
                startDate: moment().startOf("year").toDate(),
                endDate: moment()
                    .startOf("year")
                    .add(6, "months")
                    .subtract(1, "days")
                    .toDate(),
            }),
        },
        {
            label: "Semi-Annual (2nd Half)",
            range: () => ({
                startDate: moment().startOf("year").add(6, "months").toDate(),
                endDate: moment().endOf("year").toDate(),
            }),
        },
        {
            label: "Annual",
            range: () => ({
                startDate: moment().startOf("year").toDate(),
                endDate: moment().endOf("year").toDate(),
            }),
        },
    ]);

    const handleClear = () => {
        setDateRange([
            {
                startDate: null,
                endDate: null,
                key: "selection",
            },
        ])
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target)
            ) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // let startDate = "//"
    // let endDate = "//"
    let dateRangeplaceholder = "Filter by date"
    if (state[0].startDate && state[0].endDate) {
        const startDate = moment(state[0].startDate).format("MMM. DD, YYYY");
        const endDate = moment(state[0].endDate).format("MMM. DD, YYYY");
        dateRangeplaceholder = `${startDate} - ${endDate}`;
    }

    return (
        <div className="relative" ref={pickerRef}>
            <div className="flex items-center">

                <input
                    type="text"
                    readOnly
                    value={dateRangeplaceholder}
                    className="p-2 border border-gray-300 rounded-md rounded-e-none cursor-pointer w-full sm:min-w-64 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
                    onClick={() => setShowCalendar(!showCalendar)}
                />
                {dateRangeplaceholder != "Filter by date" ? (
                    <button onClick={handleClear} type="button" className="btn btn-square" title="Clear date filter"><X /></button>
                ) : ''}
            </div>

            {/* Conditional rendering of the DateRangePicker */}
            {showCalendar && (
                <div className="absolute z-10 mt-2 text-sm border rounded-md shadow-lg right-0 dark:text-slate-700">
                    <DateRangePicker
                        ranges={state}
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        months={1}
                        direction="horizontal"
                        staticRanges={[
                            ...customStaticRanges,
                            ...defaultStaticRanges,
                        ]}
                    />
                </div>
            )}
        </div>
    );
}
