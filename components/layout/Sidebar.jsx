"use client";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import Image from "next/image";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <motion.aside
            initial={{ width: "290px" }}
            animate={{ width: isCollapsed ? "70px" : "290px" }}
            className="w-64 flex-none h-screen bg-gray-800 text-white pt-5 shadow-xl"
        >
            <div className="flex justify-end pr-4">
                <button
                    onClick={handleToggleSidebar}
                    className="block p-3 text-right rounded-2xl dark:border-neutral dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                    <GiHamburgerMenu
                        className="inline-block"
                        title="Collapse the left navigation pane"
                    />
                </button>
            </div>
            {/* User Profile */}
            <div className="flex items-center mt-4 hover:bg-gray-300 hover:text-blue-900 dark:hover:text-blue-200 dark:hover:bg-slate-700 p-2 rounded cursor-pointer">
                <Image
                    src="/pcmc_logo.png"
                    className="flex-none"
                    width={10}
                    height={10}
                    layout="intrinsic"
                    alt="Logo"
                />
                {!isCollapsed && (
                    <div className="ml-2">
                        <h5 className="text-lg font-bold ">Dela Cruz, Juan</h5>
                        <p className="text-blue-600 dark:text-slate-200">
                            example@email.com
                        </p>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold">Sidebar</h2>
                <nav className="mt-4">
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">
                                Dashboard
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">
                                Reports
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">
                                Settings
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">
                                Profile
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
