import { ErrorType, Report } from "@lib/models";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        const report = await Report.findOne({
            where: { id },
            include: [
                {
                    attributes: ["id", "name"],
                    model: ErrorType,
                    as: "error_type",
                    required: false,
                },
            ],
        });
        if (!report) {
            return NextResponse.json(
                { error: true, message: "Report not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, report }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: true,
                message: "Failed to retrieve report.",
                details: error,
            },
            { status: 500 }
        );
    }
}
