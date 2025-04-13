'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';

export default function SideNavLink({ isCollapsed, path, Icon, name }) {
    const currentRoute = usePathname();

    return (
        <Link
            href={path}
            className={clsx(
                'flex items-center gap-5 p-2 rounded text-xl shadow-sm',
                isCollapsed && 'justify-center',
                currentRoute === path
                    ? 'text-blue-700 bg-gray-200 font-semibold dark:text-blue-800 dark:bg-slate-200 hover:bg-gray-300'
                    : 'text-slate-200 hover:bg-gray-200 hover:text-blue-700 dark:hover:text-blue-100 dark:hover:bg-gray-700'
            )}
        >
            {Icon}
            {!isCollapsed && <span>{name}</span>}
        </Link>
    );
}
