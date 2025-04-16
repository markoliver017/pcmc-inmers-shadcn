import { create } from "zustand";

export const usePagesStore = create((set) => ({
    pages: [
        { title: "Dashboard", path: "/admin", icon: "📊" },
        { title: "Profile", path: "/admin/profile", icon: "👤" },
        { title: "Form Responses", path: "/admin/reports", icon: "📄" },
        { title: "System Administation", path: "/admin/settings", icon: "⚙️" },
    ],
    setPages: (newPages) => set({ pages: newPages }), // Optional if you need to modify `pages`
}));
