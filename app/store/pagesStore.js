import { create } from "zustand";

export const usePagesStore = create((set) => ({
    pages: [
        {
            title: "Dashboard",
            path: "/admin",
            icon: "📊",
            has_child: false,
        },
        {
            title: "Profile",
            path: "/admin/profile",
            icon: "👤",
            has_child: false,
        },
        {
            title: "Form Responses",
            path: "/admin/reports",
            icon: "📄",
            has_child: false,
        },
        {
            title: "System Administation",
            path: "/admin/settings",
            icon: "⚙️",
            has_child: true,
            child: [
                {
                    title: "User Management",
                    path: "/admin",
                    icon: "⚙️",
                },
                {
                    title: "Medication Errors",
                    path: "/admin/error_types",
                    icon: "⚙️",
                },
            ],
        },
    ],
    setPages: (newPages) => set({ pages: newPages }), // Optional if you need to modify `pages`
}));
