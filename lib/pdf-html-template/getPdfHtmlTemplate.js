import moment from "moment";

// const headerLabel = {
//     id: "ID#",
//     report_date: "Report Date",
//     error_date: "Medication Error Date",
//     patient_age: "Patient Age",
// }

const formatPatientHeight = (height, unit) => {
    if (!height || Number(height) == "NaN" || height.toUpperCase() === "N/A")
        return "N/A";
    return `${Number(height)} ${unit}`;
};

const formatPatientAge = (val, unit) => {
    if (!val || Number(val) == "NaN") return "N/A";
    return `${Number(val)} ${unit}(s) old`;
};

const formatRowUnit = (val, unit) => {
    if (!val || Number(val) == "NaN") return "N/A";
    return `${Number(val)} ${unit}`;
};

const formatMedicineDetails = (errorType, reportMedicineRoutes) => {
    if (!errorType.is_medicine_needed || reportMedicineRoutes.length === 0) {
        return "<span class='text-gray-400'>N/A</span>";
    }

    return `
    <table class="table text-sm">
      <thead>
        <tr class="text-xs bg-gray-100">
          <th>Generic Medicine</th>
          <th>Route</th>
        </tr>
      </thead>
      <tbody>
        ${reportMedicineRoutes
            .map((med) => {
                const genericLabel = med.GenericMedicine?.name || "N/A";
                const routeLabel = med.RouteMedicine?.name || "N/A";

                return `
                    <tr>
                        <td>${genericLabel}</td>
                        <td>${routeLabel}</td>
                    </tr>
                `;
            })
            .join("")}
      </tbody>
    </table>
  `;
};

const generateReportRow = (row, index) => {
    return `
    <tr>
      <td>${index + 1}</td>
      <td>${moment(row.report_date).format("MMM. DD, YYYY")}</td>
      <td>${moment(row.error_date).format("MMM. DD, YYYY")}</td>
      <td>${row.error_type_name || ""}</td>
      <td>${row.patient_sex || ""}</td>
      <td>${formatPatientAge(row.patient_age, row.age_unit)}</td>
      <td>${formatRowUnit(row.patient_weight, row.weight_unit)}</td>
      <td>${formatPatientHeight(row.patient_height, row.height_unit)}</td>
      <td>${row.exact_prescription || ""}</td>
      <td>${row.incident_description || ""}</td>
      <td>${row.workplace_environment || ""}</td>
      <td>${row.immediate_actions || ""}</td>
      <td>${row.corrective_actions || ""}</td>
      <td>${row.preventive_actions || ""}</td>
      <td>${formatMedicineDetails(
          row.error_type,
          row.ReportMedicineRoutes
      )}</td>
    </tr>
  `;
};

export const getMedicationErrorReportHtml = (data, headerTitle) => {
    // console.log("getMedicationErrorReportHtml", data);
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
                        <h2>${headerTitle}</h2>
                    </div>
    
                    <div class="generated-date">
                        Generated on: ${moment().format("MMM. DD, YYYY")}
                    </div>
    
                    <table border="1" cellpadding="5" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Report Date</th>
                                <th>Medication Error Date</th>
                                <th>Error Type</th>
                                <th>Patient Sex</th>
                                <th>Patient Age</th>
                                <th>Patient Weight</th>
                                <th>Patient Height</th>
                                <th>Exact Prescription</th>
                                <th>Incident Description</th>
                                <th>Workplace Environment</th>
                                <th>Immediate Actions</th>
                                <th>Corrective Actions</th>
                                <th>Preventive Actions</th>
                                <th>Medicine Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reports
                                .map((row, index) =>
                                    generateReportRow(row, index)
                                )
                                .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
            `;

    return htmls;
};

export const getByDateMedicationErrorReportHtml = (
    data,
    start_date,
    end_date
) => {
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
                                        <td>${
                                            row.incident_description || ""
                                        }</td>
                                        <td>${
                                            row.workplace_environment || ""
                                        }</td>
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

    return htmls;
};
