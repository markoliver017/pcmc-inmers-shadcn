"use client";

import { Button } from "@components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog";
import { Check, Info, X } from "lucide-react";
import { useState } from "react";

export default function ShowRequest({ data, open, setOpen }) {

    const [isLoading, setIsLoading] = useState(false);
    if (!data) return;

    const handleUpdate = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/requests/${data.id}`, {
            method: "PUT",
            body: JSON.stringify({ status: "approved" }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        setIsLoading(false);
        console.log("result", result);
    }

    const getStatus = (status) => {

        if (status == "approved") {
            return (
                <div className="badge p-2 font-semibold text-xs badge-success">{status.toUpperCase()}</div>
            );
        }
        if (status == "rejected") {
            return (
                <div className="badge p-2 font-semibold text-xs badge-error">{status.toUpperCase()}</div>
            );
        }
        return <div className="badge p-2 font-semibold text-xs badge-primary">{status.toUpperCase()}</div>
    }


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="min-w-3/4 dark:text-white">
                    <DialogHeader>
                        <DialogTitle className="border-b p-3">
                            <div className="flex-items-center gap-5">
                                <Info /> <span className="block pr-5">Data Requests from <i>{data?.email}</i></span>
                                {getStatus(data?.status)}
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">

                        <table className="table table-zebra table-hovered table-bordered">
                            <thead>
                                <tr>

                                    <th>Fields</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th width="30%">Request Date</th>
                                    <td>{data?.request_date}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{data?.email}</td>
                                </tr>
                                <tr>
                                    <th>Company/Agency/Institution</th>
                                    <td>{data?.company}</td>
                                </tr>
                                <tr>
                                    <th>Profession</th>
                                    <td>{data?.profession}</td>
                                </tr>
                                <tr>
                                    <th>Purpose</th>
                                    <td>{data?.purpose}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-5 justify-end">

                        <Button
                            variant="outline"
                            // className="w-full"
                            onClick={() => setOpen(false)}
                        >
                            <X />
                            Close
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleUpdate}
                        >

                            {isLoading ? (
                                <>
                                    <span className="loading loading-bars loading-xs"></span>
                                    Submitting ...
                                </>
                            ) : (
                                <>
                                    <Check />
                                    Approve
                                </>
                            )}
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}
