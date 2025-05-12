"use server";

import { ErrorType, GenericMedicine, Report, ReportMedicineRoute, RouteMedicine } from "@lib/models";
import { createReportsSchema } from "@lib/zod/reportSchema";
import { raw } from "mysql2";
import { fn, literal, Op } from "sequelize";

export async function submitForm(data) {
    const result = createReportsSchema.safeParse(data);

    console.log("Form data:>>>>>>>>", data);
    console.log("Validation result:>>>>>>>>>>>>>", result);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    return { success: true };
}

export async function checkDuplicateReports(data) {
    console.log("server data", data)
    const duplicateGroups = await Report.findAll({
        where: {
            error_date: data.error_date,
            error_type_id: data.error_type_id,
            patient_age: data.patient_age,
            age_unit: data.age_unit,
            patient_sex: data.patient_sex,
            patient_weight: data.patient_weight,
            weight_unit: data.weight_unit
        },
        attributes: [
            'error_date',
            'error_type_id',
            'patient_age',
            'age_unit',
            'patient_sex',
            'patient_weight',
            'weight_unit',
            [fn('COUNT', '*'), 'count']
        ],
        group: ['error_date', 'error_type_id', 'patient_age', 'age_unit', 'patient_sex', 'patient_weight', 'weight_unit'],
        having: literal('COUNT(*) > 1'),
    });
    const whereOrConditions = duplicateGroups.map(group => ({
        error_date: group.error_date,
        error_type_id: group.error_type_id,
        patient_age: group.patient_age,
        age_unit: group.age_unit,
        patient_sex: group.patient_sex,
        patient_weight: group.patient_weight,
        weight_unit: group.weight_unit
    }));

    const report = await Report.findAll({
        where: {
            [Op.or]: whereOrConditions
        },
        attributes: { exclude: ['is_verified', 'createdAt', 'updatedAt'] },
        order: [["createdAt", "DESC"]],
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
                    { model: GenericMedicine, attributes: ["name"] },
                    { model: RouteMedicine, attributes: ["name"] },
                ],
            },
        ],
    });
    return JSON.parse(JSON.stringify(report));
}

export const fetchErrorTypes = async () => {

    const url = new URL(`/api/error_types`, process.env.NEXT_PUBLIC_DOMAIN);
    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    return res.json();
};

export const fetchGenericMedicines = async () => {
    const url = new URL(
        `/api/generic_medicines`,
        process.env.NEXT_PUBLIC_DOMAIN
    );
    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    return res.json();
};

export const fetchMedicineRoutes = async () => {
    const url = new URL(`/api/route_medicines`, process.env.NEXT_PUBLIC_DOMAIN);
    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    return res.json();
};
