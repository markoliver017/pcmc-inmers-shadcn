import { Report } from "@lib/models";
import { NextResponse } from "next/server";
import { Sequelize } from "sequelize";

export async function GET() {
    try {
        const errorTypeCounts = await Report.findAll({
            attributes: [
                "error_type",
                [Sequelize.fn("COUNT", Sequelize.col("error_type")), "count"],
            ],
            group: ["error_type"],
            raw: true,
        });
        return NextResponse.json(
            { success: true, data: errorTypeCounts },
            { status: 200 }
        );
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
