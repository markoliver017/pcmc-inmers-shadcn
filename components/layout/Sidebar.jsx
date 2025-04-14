"use client";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCog, FaHome, FaUser } from "react-icons/fa";
import SideNavLink from "./SideNavLink";
import { MdReport } from "react-icons/md";
import clsx from "clsx";

const menus = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUser /> },
    { name: "Reports", path: "/admin/reports", icon: <MdReport /> },
    { name: "System Administration", path: "/admin/settings", icon: <FaCog /> },
];

const Sidebar = ({
    admin = {
        name: "Bonnie Green",
        email: "bonnie@example.com",
        avatar: "https://avatar.iran.liara.run/public/boy",
    },
}) => {
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
            className="w-64 flex-none h-screen bg-gray-800 text-white px-4 pt-5 shadow-xl"
        >
            <div className="flex justify-end">
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
            <div
                className={clsx(
                    "flex items-center mt-4 hover:bg-gray-300 hover:text-blue-900 dark:hover:text-blue-200 dark:hover:bg-slate-700 rounded cursor-pointer",
                    !isCollapsed && "p-4"
                )}
            >
                <Image
                    src={admin.avatar}
                    className="flex-none"
                    width={50}
                    height={50}
                    layout="intrinsic"
                    alt="Logo"
                />
                {!isCollapsed && (
                    <div className="ml-2">
                        <h5 className="text-lg font-bold ">Dela Cruz, Juan</h5>
                        <p className="text-blue-300 dark:text-slate-200">
                            example@email.com
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-5">
                {!isCollapsed && (
                    <h2 className="text-base text-gray-500 font-bold">
                        Main Navigation
                    </h2>
                )}
                <nav className="mt-4">
                    <ul>
                        {menus.map((menu, index) => (
                            <li key={index} className="mb-2">
                                <SideNavLink
                                    isCollapsed={isCollapsed}
                                    path={menu.path}
                                    Icon={menu.icon}
                                    name={menu.name}
                                />
                            </li>
                        ))}
                        {/* <li className="mb-2">
                            <SideNavLink
                                isCollapsed={isCollapsed}
                                path="/"
                                Icon={<FaHome />}
                                name="Home"
                            />
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
                        </li> */}
                    </ul>
                </nav>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
