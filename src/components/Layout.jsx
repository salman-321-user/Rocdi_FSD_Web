import { useTranslation } from "react-i18next";
import { Search, ShoppingCart, Mail, Bell } from "lucide-react";
import Sidebar from "./Sidebar";

const LANGUAGES = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function Layout({ children }) {
    const { t, i18n } = useTranslation();
    const current =
        LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

    return (
        <div className="flex h-screen bg-[#F7F5F1]">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top navbar */}
                <header className="flex items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6 py-3">
                    <label className="flex w-full max-w-md items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-400">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder={t("navbar.searchPlaceholder")}
                            className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                        />
                        <kbd className="rounded-md bg-amber-500/90 px-2 py-0.5 text-[11px] font-semibold text-white">
                            ⌘K
                        </kbd>
                    </label>

                    <div className="flex items-center gap-4">
                        {/* Language switcher */}
                        <div className="group relative">
                            <button className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
                                {current.flag} {current.label}
                            </button>
                            <div className="invisible absolute right-0 top-full z-10 mt-1 w-36 rounded-lg border border-neutral-200 bg-white py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => i18n.changeLanguage(lang.code)}
                                        className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-neutral-50 ${lang.code === current.code
                                                ? "font-medium text-amber-600"
                                                : "text-neutral-700"
                                            }`}
                                    >
                                        {lang.flag} {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="text-neutral-500 hover:text-neutral-800">
                            <ShoppingCart size={19} />
                        </button>
                        <button className="text-neutral-500 hover:text-neutral-800">
                            <Mail size={19} />
                        </button>
                        <button className="relative text-neutral-500 hover:text-neutral-800">
                            <Bell size={19} />
                            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                                1
                            </span>
                        </button>

                        <img
                            src="https://i.pravatar.cc/64"
                            alt="Account"
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}