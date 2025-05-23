"use client";
import React, { use, useEffect, useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table";
import { DataTablePagination } from "@components/reusable_components/DataTablePagination";
import { DataTableViewOptions } from "@components/reusable_components/DataTableViewOptions";
import { Building, Filter, User, UserCog2 } from "lucide-react";
import MultiSelect from "@components/reusable_components/MultiSelect";
import { getColumns } from "./columns";
import GenerateReport from "./GenerateReportComponent";
import Skeleton from "@components/ui/skeleton";

import { toast } from "react-toastify";
import SweetAlert from "@components/ui/SweetAlert";
import { useRouter } from "next/navigation";

async function deleteReport(id) {
    const res = await fetch(`/api/reports/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}

export function DataTable({ get_reports, get_error_types }) {
    const router = useRouter();
    const fetch_errors = use(get_reports);
    const error_types = use(get_error_types);

    // console.log("error_types", error_types)
    // console.log("reports>>>>>>>>", fetch_errors)

    const [data, setData] = useState(fetch_errors.reports);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeData = (newData) => {
        setData(newData);
        setIsLoading(false);
    };

    const handleDelete = (id) => {
        SweetAlert({
            title: "Confirm Deletion",
            text: "Are you sure you want to delete this report?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                const res = await deleteReport(id);
                if (res.success) {
                    const newData = data.filter((row) => row.id != id);
                    handleChangeData(newData);
                    toast.success(res.message);
                }
            },
        });
    };

    const handleUpdate = (id) => {
        SweetAlert({
            title: "Update Report",
            text: "Are you sure you want to update this report?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                router.push(`/admin/reports/${id}/edit`);
            },
        });
    };

    const columns = getColumns(handleDelete, handleUpdate);

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
        report_date: false,
    });
    const [rowSelection, setRowSelection] = useState({});
    const [errorTypeOptions, setErrorTypeOptions] = useState([]);

    const table = useReactTable({
        data,
        columns,
        // manualPagination: true,
        // pageCount: 4,
        // rowCount: 18,
        autoResetPageIndex: false,
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
            //for multi-filter
            columnFilter: (row, columnId, filterValue) => {
                if (filterValue.length === 0) return true; // No filter, return all
                return filterValue.includes(row.getValue(columnId)); // Match selected emails
            },
        },
    });

    const getSelectedRows = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        return selectedRows.map((row) => row.original);
    };

    function getVisibleKeys() {
        return columns
            .filter((col) => {
                const accesorKey = col?.accessorKey?.replaceAll(".", "_");
                return accesorKey && columnVisibility[accesorKey] !== false;
            })
            .map((col) => col.accessorKey);
    }

    function getVisibleData(data) {
        // Flatten columns with accessorKey only
        const visibleKeys = getVisibleKeys();

        return data.map((row) => {
            const filteredRow = {};
            visibleKeys.forEach((key) => {
                const keys = key.split(".");
                let value = row;
                for (const k of keys) {
                    if (value && k in value) {
                        value = value[k];
                    } else {
                        value = null;
                        break;
                    }
                }
                filteredRow[key] = value;
            });
            return filteredRow;
        });
    }

    useEffect(() => {
        setErrorTypeOptions(() => {
            return error_types.map((type) => ({
                id: type.id,
                label: type.name,
                value: type.name,
                number: data.filter((row) => row.error_type.id == type.id)
                    .length,
            }));
        });
        table.getAllColumns().forEach((column) => {
            column.setFilterValue(undefined);
        });
    }, [data]);
    // const errorTypeOptions = error_types.map((type) => ({
    //     id: type.id,
    //     label: type.name,
    //     value: type.name,
    //     number: data.filter((row) => row.error_type.id == type.id).length,
    // }));

    const visibleData = useMemo(
        () => getVisibleData(data, columns, columnVisibility),
        [data, columns, columnVisibility]
    );

    return (
        <div className="p-2">
            <GenerateReport
                data={data} //for pdf reports
                visibleKeys={getVisibleKeys()} //for pdf reports
                onLoad={() => setIsLoading(true)}
                onDataChange={handleChangeData}
                visibleData={visibleData} //for excel report
            />

            {isLoading ? (
                <Skeleton className="w-full h-80 rounded-xl" />
            ) : (
                <>
                    <div className="flex items-center py-2 space-x-2">
                        <input
                            placeholder="Search all .."
                            // value={{globalFilter}}
                            onChange={(e) =>
                                table.setGlobalFilter(e.target.value)
                            }
                            className="p-2 input-sm flex-none bg-slate-50 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                        />

                        <div className="flex-1 flex justify-end pr-2">
                            <div className="flex space-x-2">
                                <label className="dark:text-slate-400 flex items-center space-x-1">
                                    <Filter className="h-4 w-4" />
                                </label>
                                <MultiSelect
                                    options={errorTypeOptions}
                                    onValueChange={(selectedOptions) => {
                                        table
                                            .getColumn("error_type_name")
                                            ?.setFilterValue(selectedOptions);
                                    }}
                                    value={
                                        table
                                            .getColumn("error_type_name")
                                            ?.getFilterValue() ?? []
                                    }
                                    placeholder={
                                        <>
                                            {<UserCog2 className="h-3 w-3" />}{" "}
                                            <span>Medication error type</span>
                                        </>
                                    }
                                    className="text-slate-700 bg-slate-100 hover:bg-white"
                                    animation={2}
                                    maxCount={1}
                                />
                                <MultiSelect
                                    options={[
                                        {
                                            label: "male",
                                            value: "male",
                                            number: data.filter(
                                                (row) =>
                                                    row.patient_sex == "male"
                                            ).length,
                                        },
                                        {
                                            label: "female",
                                            value: "female",
                                            number: data.filter(
                                                (row) =>
                                                    row.patient_sex == "female"
                                            ).length,
                                        },
                                        {
                                            label: "unknown",
                                            value: "unknown",
                                            number: data.filter(
                                                (row) =>
                                                    row.patient_sex == "unknown"
                                            ).length,
                                        },
                                    ]}
                                    onValueChange={(selectedOptions) => {
                                        table
                                            .getColumn("patient_sex")
                                            ?.setFilterValue(selectedOptions);
                                    }}
                                    value={
                                        table
                                            .getColumn("patient_sex")
                                            ?.getFilterValue() ?? []
                                    }
                                    placeholder={
                                        <>
                                            {<User className="h-3 w-3" />}{" "}
                                            <span>Sex</span>
                                        </>
                                    }
                                    // variant="inverted"
                                    className="text-slate-700 bg-slate-100 hover:bg-white"
                                    animation={2}
                                    maxCount={1}
                                />
                                <DataTableViewOptions table={table} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md max-w-screen overflow-x-scroll">
                        <Table className="dark:bg-slate-700 dark:text-slate-200">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                className="dark:text-yellow-200"
                                                key={header.id}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="dark:text-slate-300"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center dark:text-slate-300"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <DataTablePagination table={table} />
                    </div>
                </>
            )}
        </div>
    );
}
