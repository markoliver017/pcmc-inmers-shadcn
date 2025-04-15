import { create } from "zustand";

export const usePagesStore = create((set) => ({
    pages: [
        { title: "Dashboard", path: "/admin", icon: "📊" },
        { title: "Reports", path: "/admin/reports", icon: "📄" },
        { title: "Profile", path: "/admin/profile", icon: "👤" },
        { title: "Settings", path: "/admin/settings", icon: "⚙️" },
    ],
    setPages: (newPages) => set({ pages: newPages }), // Optional if you need to modify `pages`
}));