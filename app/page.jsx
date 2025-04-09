"use client";

import { useState, useRef } from "react";
import { } from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@components/ui/drawer"

export default function Home() {


  const drawerRef = useRef()


  return (
    <div className="grid items-center justify-items-center border border-red-400 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to Next JS</h1>

      <button onClick={() => drawerRef.current.open()} className="btn btn-primary">
        Open Drawer
      </button>

      <Drawer ref={drawerRef} direction="bottom">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>This drawer opens from the left!</DrawerDescription>
          </DrawerHeader>

          <div className="p-4">Your content here...</div>

          <DrawerFooter>
            <DrawerClose className="btn btn-secondary">Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
