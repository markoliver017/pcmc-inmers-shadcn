import { ErrorType, Report } from "@lib/models";
import { NextResponse } from "next/server";
import { Sequelize } from "sequelize";

export async function GET(request) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const Op = Sequelize.Op;
    const searchParams = request.nextUrl.searchParams;
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    const currentDate = new Date();
    const defaultStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const defaultEndDate = currentDate;

    const startDate = start_date ? new Date(start_date) : defaultStartDate;
    const endDate = end_date ? new Date(end_date) : defaultEndDate;

    console.log("end_date", end_date);
    console.log("defaultStartDate", defaultStartDate);
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    try {
        const reports = await Report.findAll({
            where: {
                error_date: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate,
                },
            },
            include: [
                {
                    attributes: ["id", "name"],
                    model: ErrorType,
                    as: "error_type",
                    required: false,
                },
            ],
        });
        return NextResponse.json({ success: true, reports }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: true,
                message: "Failed to retrieve reports.",
                details: error,
            },
            { status: 500 }
        );
    }
}

// POST handler for report submission
export async function POST(request) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const body = await request.json(); // Parse the request body
        console.log("reports body", body);
        // Create new report in the database
        const newReport = await Report.create(body);

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
