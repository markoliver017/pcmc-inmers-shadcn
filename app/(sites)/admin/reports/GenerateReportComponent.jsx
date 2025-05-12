"use client";

const headerLabel = {
    id: "ID#",
    report_date: "Report Date",
    error_date: "Medication Error Date",
    patient_age: "Patient Age",
}
import DateRangePickerComponent from "@components/reusable_components/DateRangePickerComponent";
import { Calendar, Filter } from "lucide-react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchReports } from "./action";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { exportToExcel } from "@lib/export-to-excel";
import { getMedicationErrorReportHtml } from "@lib/pdf-html-template/getPdfHtmlTemplate";

export default function GenerateReport({
    data,
    visibleKeys,
    onLoad,
    onDataChange,
    visibleData,
}) {
    const searchParams = useSearchParams();
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    console.log("current visibleKeys", visibleKeys);

    const [htmlReport, setHtmlReport] = useState();
    const [isGenerating, setIsGenerating] = useState();
    const [dateRange, setDateRange] = useState([
        {
            startDate: start_date
                ? moment(start_date, "YYYY-MM-DD").toDate()
                : null,
            endDate: end_date
                ? moment(end_date, "YYYY-MM-DD").toDate()
                : null,
            key: "selection",
        },
    ]);
    const prevStart = useRef({
        start: moment(dateRange[0].startDate).format("YYYY-MM-DD"),
        end: moment(dateRange[0].endDate).format("YYYY-MM-DD"),
    });

    function handleDateRangeChange(ranges) {
        setDateRange([ranges.selection]);
    }

    useEffect(() => {
        // console.log("data", data);
        let reportTitle = `Medication Error Summary Report`;
        if (dateRange[0].startDate && dateRange[0].endDate) {
            const start_date = moment(dateRange[0].startDate).format("MMMM DD - ");
            const end_date = moment(dateRange[0].endDate).format("MMMM DD, YYYY");
            reportTitle = `Medication Error Summary Report for ${start_date}${end_date}`;
        };


        const reports = data.map((row) => ({
            ...row,
            error_type_name:
                row.error_type?.name == "Others"
                    ? `${row.error_type?.name} (${row.other_error_type})`
                    : row.error_type?.name,
        }));

        const htmls = getMedicationErrorReportHtml(
            reports,
            reportTitle
        );

        setHtmlReport(htmls);
    }, [data]);


    useEffect(() => {
        console.log("dateRangedateRangedateRange", dateRange)
        let start = null;
        let end = null;
        if (dateRange[0].startDate && dateRange[0].endDate) {
            start = moment(dateRange[0].startDate).format("YYYY-MM-DD");
            end = moment(dateRange[0].endDate).format("YYYY-MM-DD");
        }

        console.log("heree 1")
        if (
            prevStart.current?.startDate == start &&
            prevStart.current?.endDate == end
        ) {
            console.log("prevStart.current?.start", prevStart.current?.start)
            console.log("prevStart.current?.end", prevStart.current?.end)
            console.log("prevStart.current?.start", start)
            console.log("prevStart.current?.end", end)
            console.log("heree stop")
            return;
        }
        console.log("heree 2")

        prevStart.current = dateRange[0];

        console.log("prevStart.current", prevStart.current);
        // console.log("filterringggggggggggggggg");

        onLoad();
        const filterReports = async () => {
            const res = await fetchReports(start, end);
            const json = await res;
            // console.log("json>>>>>>>>>>>>>", json);
            const { success } = json;

            if (success) {
                onDataChange(json.reports);
            }
        };

        filterReports();
    }, [dateRange]);

    const handleExport = (exportData) => {
        exportToExcel(exportData, "INMERS_Report");
    };

    const generateReport = async () => {
        setIsGenerating(true);
        const res = await fetch("/api/generate-pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ html: htmlReport }),
        });

        if (!res.ok) {
            console.error(`Failed to generate PDF: ${res.statusText}`);
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank')

        window.URL.revokeObjectURL(url);
        setIsGenerating(false);
    };

    return (
        <div className="flex items-center justify-end gap-1">
            <form className="flex justify-end items-center">
                {/* Input field to display selected date range */}
                <Calendar className="mr-1" />
                <DateRangePickerComponent
                    state={dateRange}
                    handleSelect={handleDateRangeChange}
                    setDateRange={setDateRange}
                />
            </form>

            <button
                onClick={generateReport}
                className="btn btn-neutral hover:bg-neutral-800 hover:text-green-300"
            >
                {isGenerating ? (
                    <>
                        <span className="loading loading-bars loading-xs"></span>
                        Generating...
                    </>
                ) : (
                    <>
                        <FaFilePdf />
                        Export
                    </>
                )}
            </button>
            <button
                onClick={() => handleExport(visibleData)}
                className="btn btn-neutral hover:bg-neutral-800 hover:text-green-300"
            >
                {/* {isGenerating ? (
                    <>
                        <span className="loading loading-bars loading-xs"></span>
                        Generating...
                    </>
                ) : ( */}
                <>
                    <FaFileExcel />
                    Excel
                </>
                {/* )} */}
            </button>
        </div>
    );
}
