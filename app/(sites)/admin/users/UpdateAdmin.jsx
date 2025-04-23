"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog";
import { Plus } from "lucide-react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import CreateForm from "./CreateForm";
import { useState } from "react";
import UpdateProfile from "../profile/UpdateProfile";

export default function UpdateAdmin({ isOpen, setIsOpen, admin }) {

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="btn btn-neutral">
                    <Plus /> Create New
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex gap-1">
                                <MdOutlineAdminPanelSettings /> Create New
                                Administrator
                            </div>
                        </DialogTitle>
                        {/* <DialogDescription> */}

                        <UpdateProfile admin={admin} onClose={() => setIsOpen(false)} />

                        {/* </DialogDescription> */}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
