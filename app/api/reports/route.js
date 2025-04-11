import { Report } from "@lib/models"; // Import models
import { NextResponse } from "next/server"; // Next.js response utility

// POST handler for report submission
export async function POST(request) {
    console.log("post request?????????????", request);
    try {
        const body = await request.json();
        console.log("Received report data:", body);
        // Create new report in the database
        const newReport = await Report.create({
            report_date: body.report_date || null,
            error_date: body.error_date || null,
            patient_sex: body.patient_sex || null,
            patient_weight: body.patient_weight || null,
            patient_height: body.patient_height || null,
            exact_prescription: body.exact_prescription || null,
            error_type: body.error_type || null,
            other_error_type: body.other_error_type || null,
            incident_description: body.incident_description || null,
            workplace_environment: body.workplace_environment || null,
            patient_condition: body.patient_condition || null,
            immediate_actions: body.immediate_actions || null,
            corrective_actions: body.corrective_actions || null,
            preventive_actions: body.preventive_actions || null,
            is_verified: body.is_verified || false,
        });

        return NextResponse.json(
            { success: true, report: newReport },
            { status: 200 }
        );
    } catch (error) {
        // console.error("Error handling report submission:", error.errors);

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

        return NextResponse.json(
            { error: true, message: "Failed to submit report." },
            { status: 500 }
        );
    }
}

// const validationErrors = error.errors.reduce((acc, err) => {
//     if (error.name === "SequelizeUniqueConstraintError") {
//         acc[err.path] = `${err.path} already exists!`;
//     } else {
//         acc[err.path] = err.message;
//     }
//     return acc;
// }, {});
