"use client";
import { useRef } from "react";
import { GrLogin } from "react-icons/gr";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@components/ui/drawer";

export default function ReportDrawer() {
    const drawerRef = useRef();
    return (
        <>
            <button
                onClick={() => drawerRef.current.open()}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold px-4 py-2 rounded-md shadow-[7px_10px_2px_0px_rgba(0,_0,_0,_0.1)] hover:from-pink-500 hover:to-purple-400 hover:ring transition duration-300"
            >
                <div className="flex justify-center items-center gap-2">
                    <GrLogin />
                    <span>Sign In</span>
                </div>
            </button>

            <Drawer ref={drawerRef} direction="right">
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>SYSTEM ADMINISTRATOR LOGIN</DrawerTitle>
                        {/* <DrawerDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam veniam reiciendis nulla ducimus fuga ad.
                        </DrawerDescription> */}
                    </DrawerHeader>

                    <div className="p-4">Report Drawer</div>

                    <DrawerFooter>
                        <DrawerClose className="btn btn-default">
                            Close
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
