// import { Checkbox } from "@components/ui/checkbox";
import DataTableColumnHeader from "@components/reusable_components/DataTableColumnHeader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { Command, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export function getColumns(handleDelete, handleUpdate) {
    return [
        {
            id: "actions",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Action" />
            ),
            cell: ({ row }) => {
                const report = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start">
                            <DropdownMenuLabel className="flex items-center space-x-2">
                                <Command className="w-3 h-3" />
                                <span>Actions</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <Link href={`/admin/reports/${report.id}`}>
                                <DropdownMenuItem className="flex items-center space-x-2">
                                    <Eye className="w-4 h-4" />
                                    <span>Show</span>
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                onClick={() => handleUpdate(report.id)}
                                className="flex items-center space-x-2"
                            >
                                <Pencil className="w-4 h-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => handleDelete(report.id)}
                                className="flex items-center space-x-2"
                            >
                                <Trash className="w-4 h-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            // id: "medication_error_date",
            accessorKey: "error_date",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Medication Error Date"
                />
            ),
            filterFn: "columnFilter",
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="ID#" />
            ),
            filterFn: "columnFilter",
        },
        {
            // id: "date_reported",
            accessorKey: "report_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Date Reported" />
            ),
            filterFn: "columnFilter",
        },
        {
            accessorKey: "error_type.name",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Medication Error Type"
                />
            ),
            cell: ({ row }) => {
                const data = row.original;
                const errorType = data.error_type.name;
                const otherErrorType = data.other_error_type;
                if (errorType === "Others" && otherErrorType) {
                    return (
                        <div>
                            {errorType} <i>({otherErrorType})</i>
                        </div>
                    );
                } else {
                    return <div className="flex items-center">{errorType}</div>;
                }
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "patient_sex",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Sex" />
            ),
            filterFn: "columnFilter",
        },
        {
            accessorKey: "patient_age",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Age" />
            ),
            cell: ({ row, getValue }) => {
                const data = row.original;
                return (
                    <div className="max-h-40 overflow-scroll">
                        {Math.round(getValue())} {data.age_unit.toUpperCase()}
                    </div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "patient_weight",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Weight" />
            ),
            cell: ({ row, getValue }) => {
                const data = row.original;
                return (
                    <div className="max-h-40 overflow-scroll">
                        {getValue()} {data.weight_unit.toUpperCase()}
                    </div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "patient_height",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Height" />
            ),
            cell: ({ row }) => {
                const data = row.original;
                const label =
                    data.patient_height.toLowerCase() != "n/a"
                        ? `${data.patient_height} ${data.height_unit}`
                        : "N/A";
                return <div className="max-h-40 overflow-scroll">{label}</div>;
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "exact_prescription",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Exact Prescription"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "incident_description",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Incident Description"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "workplace_environment",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Workplace Environment"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "patient_condition",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Patient Condition"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "immediate_actions",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Immediate Action"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "corrective_actions",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Corrective Action"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },
        {
            accessorKey: "preventive_actions",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Preventive Action"
                />
            ),
            cell: ({ getValue }) => {
                return (
                    <div className="max-h-40 overflow-scroll">{getValue()}</div>
                );
            },
            filterFn: "columnFilter",
        },

        // {
        //     accessorKey: 'patient_sex',
        //     header: ({ column }) => (
        //         <DataTableColumnHeader column={column} title="Patient Sex" />
        //     ),
        //     cell: ({ row }) => {
        //         const data = row.original;
        //         return <div className="flex items-center">{data.email}</div>;
        //     },
        // },
    ];
}
