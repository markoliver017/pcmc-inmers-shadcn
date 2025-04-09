import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
    return (
        <aside className="w-64 flex-none h-screen bg-gray-800 text-white pt-5 shadow-xl">
            <div className='flex justify-end pr-4'>
                <button
                    // onClick={toggleSidebar}
                    className="block p-3 text-right rounded-2xl dark:border-neutral dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                    <GiHamburgerMenu className='inline-block' title="Collapse the left navigation pane" />
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold">Sidebar</h2>
                <nav className="mt-4">
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">Dashboard</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">Reports</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">Settings</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-400">Profile</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;