"use client";

import DateRangePickerComponent from "@components/reusable_components/DateRangePickerComponent";
import { Calendar, Filter } from "lucide-react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchReports } from "./action";
import { FaFilePdf } from "react-icons/fa";

export default function GenerateReport({ data, onLoad, onDataChange }) {
    const searchParams = useSearchParams();
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    const [htmlReport, setHtmlReport] = useState();
    const [isGenerating, setIsGenerating] = useState();
    const [dateRange, setDateRange] = useState([
        {
            startDate: start_date
                ? moment(start_date, "YYYY-MM-DD").toDate()
                : moment().startOf("month").toDate(),
            endDate: end_date
                ? moment(end_date, "YYYY-MM-DD").toDate()
                : moment().toDate(),
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
        const start_date = moment(dateRange[0].startDate).format("MMMM DD - ");
        const end_date = moment(dateRange[0].endDate).format("MMMM DD, YYYY");

        const reports = data.map((row) => ({
            ...row,
            error_type_name:
                row.error_type?.name == "Others"
                    ? `${row.error_type?.name} (${row.other_error_type})`
                    : row.error_type?.name,
        }));

        const htmls = `
        <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Integrated National Medication Error Reporting System (INMERS)  </title>
                <script src='https://cdn.tailwindcss.com'></script>
                <style>
                     html {
                        -webkit-print-color-adjust: exact;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        margin: 10mm;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 0.875rem;
                    }

                    th, td {
                        border: 1px solid #ccc;
                        padding: 6px;
                        text-align: left;
                        vertical-align: top;
                    }

                    th {
                        background-color: #f3f4f6;
                    }

                    tr {
                        page-break-inside: avoid;
                    }

                    .report-title {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .report-title h1 {
                        font-size: 1.5rem;
                        font-weight: bold;
                    }

                    .report-title h2 {
                        font-size: 1rem;
                        font-weight: normal;
                        color: #555;
                    }

                    .generated-date {
                        text-align: right;
                        font-size: 0.75rem;
                        color: #555;
                        margin-bottom: 10px;
                    }

                </style>
            </head>
            <body>

                <div class="report-title">
                    <h1>Integrated National Medication Error Reporting System (INMERS)</h1>
                    <h2>Medication Error Summary Report (${start_date}${end_date})</h2>
                </div>

                <div class="generated-date">
                    Generated on: ${moment().format("MMM. DD, YYYY")}
                </div>

                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Report Date</th>
                            <th>Medication Error Date</th>
                            <th>Error Type</th>
                            <th>Patient Sex</th>
                            <th>Patient Weight</th>
                            <th>Patient Height</th>
                            <th>Exact Prescription</th>
                            <th>Incident Description</th>
                            <th>Workplace Environment</th>
                            <th>Immediate Actions</th>
                            <th>Corrective Actions</th>
                            <th>Preventive Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reports
                .map(
                    (row) => `
                                <tr>
                                    <td>${moment(row.report_date).format(
                        "MMM. DD, YYYY"
                    )}</td>
                                    <td>${moment(row.error_date).format(
                        "MMM. DD, YYYY"
                    )}</td>
                                    <td>${row.error_type_name || ""}</td>
                                    <td>${row.patient_sex || ""}</td>
                                    <td>${row.patient_weight || ""}</td>
                                    <td>${row.patient_height || ""}</td>
                                    <td>${row.exact_prescription || ""}</td>
                                    <td>${row.incident_description || ""}</td>
                                    <td>${row.workplace_environment || ""}</td>
                                    <td>${row.immediate_actions || ""}</td>
                                    <td>${row.corrective_actions || ""}</td>
                                    <td>${row.preventive_actions || ""}</td>
                                </tr>
                            `
                )
                .join("")}
                    </tbody>
                </table>
            </body>
        </html>
        `;
        setHtmlReport(htmls);
    }, [data]);

    useEffect(() => {
        const start = moment(dateRange[0].startDate).format("YYYY-MM-DD");
        const end = moment(dateRange[0].endDate).format("YYYY-MM-DD");

        if (
            prevStart.current?.start == start &&
            prevStart.current?.end == end
        ) {
            // console.log("skipppppppppppp", prevStart.current);
            return;
        }

        prevStart.current = start;

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
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
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
        </div>
    );
}
