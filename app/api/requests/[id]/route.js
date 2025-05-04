import { send_mail } from "@lib/mail.utils";
import { ErrorType, GenericMedicine, Report, ReportMedicineRoute, ReportRequest, RouteMedicine } from "@lib/models";

import { NextResponse } from "next/server";

import { promises as fs } from 'fs';
import path from 'path';
import { auth } from "@lib/auth";
import moment from "moment";
import { generate_pdf } from "@lib/generate.utils";


export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json(); // Parse the request body
    const token = await auth();
    // console.log("token >>>>>>>>>>>>>>>>>", token);
    // console.log("status >>>>>>>>>>>>>>>>>", body);
    // return NextResponse.json({ error: 'Server Error: You are not authorized to access this request' }, { status: 500 });
    try {

        if (!body.status && !id) {
            const error = new Error("Validation failed");
            error.name = "ZodValidationError";
            error.errors = ["Request ID && Status is required."];
            throw error;
        }

        const { status } = body;

        const reportRequest = await ReportRequest.findByPk(id);

        if (!reportRequest) {
            return NextResponse.json({ error: 'Database Error: Request not found' }, { status: 404 });
        }

        if (!token) {
            return NextResponse.json({ error: 'Server Error: You are not authorized to access this request' }, { status: 500 });
        }

        const { user } = token;

        const updatedRequest = await reportRequest.update({ status: status, approved_by: user.id });

        const reports = await Report.findAll({
            // raw: true,
            include: [
                {
                    attributes: ["id", "name"],
                    model: ErrorType,
                    as: "error_type",
                    required: false,
                },
                {
                    attributes: ["id"],
                    model: ReportMedicineRoute,
                    include: [
                        { model: GenericMedicine, attributes: ["name"] },
                        { model: RouteMedicine, attributes: ["name"] },
                    ],
                },
            ],
        });

        const subject = "INMERS Data Request Notification";
        const text = "";
        const html = await getAcknowledgeHtml();
        const attachFiles = [
            {
                filename: 'INMERS-reports.pdf',
                content: await generate_pdf(getMedicationErrorReportHtml(reports)),
                contentType: 'application/pdf',
            },
        ];

        const emailStatus = await send_mail(reportRequest.email, subject, text, html, attachFiles);


        return NextResponse.json(
            { success: true, report: updatedRequest, email: emailStatus },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error handling report submission:", error);

        // Handle Sequelize validation errors
        if (
            error.name === "SequelizeValidationError" ||
            error.name === "SequelizeUniqueConstraintError"
        ) {
            const validationErrors = error.errors.map((err) => {
                if (error.name === "SequelizeUniqueConstraintError") {
                    return `${err.path} already exists!`;
                } else {
                    return err.message;
                }
            });

            return NextResponse.json(
                {
                    error: true,
                    message: "Validation failed",
                    details: validationErrors,
                },
                { status: 400 }
            );
        }

        if (error.name === "ZodValidationError") {
            return NextResponse.json(
                {
                    error: true,
                    message: "Validation failed",
                    details: error.errors,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: true, message: "Failed to submit request." },
            { status: 500 }
        );
    }
}

async function getAcknowledgeText() {
    const filePath = path.join(process.cwd(), 'public', 'acknowledge.txt');

    return await fs.readFile(filePath, 'utf-8');
}

async function getAcknowledgeHtml() {
    const filePath = path.join(process.cwd(), 'public', 'approve-email.html');

    return await fs.readFile(filePath, 'utf-8');
}

function getMedicationErrorReportHtml(data) {

    const reports = data.map((row) => ({
        ...row.dataValues,
        error_type_name:
            row.error_type?.name == "Others"
                ? `${row.error_type?.name} (${row.other_error_type})`
                : row.error_type?.name,
    }));

    console.log("reports>>>", reports);

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
                        <h2>Overall Medication Error Summary Report</h2>
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

    return htmls;
}
