import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, ShoppingCart, Mail, Bell, Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const LANGUAGES = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function Layout({ children }) {
    const { t, i18n } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const current =
        LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

    return (
        <div className="flex h-screen bg-[#F3F7FB]">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar wrapper – slides in on mobile, static on desktop */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top navbar */}
                <header className="flex items-center justify-between gap-2 border-b border-neutral-200 bg-white px-3 py-2 sm:gap-4 sm:px-6 sm:py-3">
                    {/* Left side: hamburger + search */}
                    <div className="flex flex-1 items-center gap-2">
                        {/* Hamburger – mobile only */}
                        <button
                            type="button"
                            className="text-neutral-600 hover:text-neutral-900 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <Menu size={22} />
                        </button>

                        {/* Search bar – hidden on mobile */}
                        <label className="hidden w-full max-w-md items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-400 sm:flex">
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder={t("navbar.searchPlaceholder")}
                                className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                            />
                            <kbd className="rounded-md bg-brand-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                                ⌘K
                            </kbd>
                        </label>

                        {/* Search icon – mobile only */}
                        <button
                            type="button"
                            className="text-neutral-500 hover:text-neutral-800 sm:hidden"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Right side: language, icons, avatar */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Language switcher – compact on mobile */}
                        <div className="group relative">
                            <button
                                type="button"
                                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-2 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 sm:px-3"
                            >
                                <span>{current.flag}</span>
                                <span className="hidden sm:inline">{current.label}</span>
                            </button>
                            <div className="invisible absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-neutral-200 bg-white py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        type="button"
                                        onClick={() => i18n.changeLanguage(lang.code)}
                                        className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-neutral-50 ${lang.code === current.code
                                                ? "font-medium text-brand-600"
                                                : "text-neutral-700"
                                            }`}
                                    >
                                        {lang.flag} {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cart – hidden on mobile */}
                        <button
                            type="button"
                            className="hidden text-neutral-500 hover:text-neutral-800 sm:block"
                        >
                            <ShoppingCart size={19} />
                        </button>
                        {/* Mail – hidden on mobile */}
                        <button
                            type="button"
                            className="hidden text-neutral-500 hover:text-neutral-800 sm:block"
                        >
                            <Mail size={19} />
                        </button>

                        {/* Bell – always visible */}
                        <button
                            type="button"
                            className="relative text-neutral-500 hover:text-neutral-800"
                        >
                            <Bell size={19} />
                            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white">
                                1
                            </span>
                        </button>

                        {/* Avatar */}
                        <img
                            src="https://i.pravatar.cc/64"
                            alt="Account"
                            className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                        />
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}