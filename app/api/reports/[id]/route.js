import { auth } from "@lib/auth";
import {
    ErrorType,
    GenericMedicine,
    Report,
    ReportMedicineRoute,
    RouteMedicine,
} from "@lib/models";
import { createReportsSchema } from "@lib/zod/reportSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        const report = await Report.findOne({
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt", "updated_by"] },
            include: [
                {
                    attributes: ["id", "name", "is_medicine_needed"],
                    model: ErrorType,
                    as: "error_type",
                    required: false,
                },
                {
                    attributes: ["id"],
                    model: ReportMedicineRoute,
                    include: [
                        { model: GenericMedicine, attributes: ["id", "name"] },
                        { model: RouteMedicine, attributes: ["id", "name"] },
                    ],
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

export async function PUT(request, { params }) {
    const session = await auth();
    if (!session) throw "You are not authorized to access this request.";

    const { profile } = session;

    try {
        const id = params.id;
        const body = await request.json();
        body.updated_by = profile.id;

        const validationResult = createReportsSchema.safeParse(body);
        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            const messages = Object.values(fieldErrors).flat();
            const error = new Error("Validation failed");
            error.name = "ZodValidationError";
            error.errors = messages;
            throw error;
        }

        const { medicines, selected_error_type, ...restData } =
            validationResult.data;

        // Update main Report
        const report = await Report.findByPk(id);
        if (!report) {
            return NextResponse.json(
                { error: true, message: "Report not found." },
                { status: 404 }
            );
        }

        await report.update(restData);

        // Handle medicines if needed
        if (selected_error_type?.is_medicine_needed) {
            await ReportMedicineRoute.destroy({ where: { report_id: id } }); // Clear old ones

            const newRoutes = medicines.map((med) => ({
                generic_medicine_id: med.medicine_generic_id,
                route_medicine_id: med.medicine_route_id,
                report_id: id,
            }));

            await ReportMedicineRoute.bulkCreate(newRoutes);
        }

        // Reload with relations
        await report.reload({
            include: [
                {
                    model: ReportMedicineRoute,
                    include: [
                        { model: GenericMedicine, attributes: ["name"] },
                        { model: RouteMedicine, attributes: ["name"] },
                    ],
                },
            ],
        });

        return NextResponse.json({ success: true, report }, { status: 200 });
    } catch (error) {
        console.error("Update error:", error);

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
            { error: true, message: "Failed to update report." },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        console.log("DELETE ID", id);

        const report = await Report.findByPk(id);
        if (!report) {
            return NextResponse.json(
                { error: true, message: "Report not found." },
                { status: 404 }
            );
        }

        // Delete the report
        await report.destroy();

        return NextResponse.json(
            { success: true, message: "Report deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { error: true, message: "Failed to delete report." },
            { status: 500 }
        );
    }
}
