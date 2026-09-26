import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    LayoutGrid,
    Sparkles,
    ImagePlus,
    User,
    UserPlus,
    Repeat,
    FolderOpen,
    FileWarning,
    X,
} from "lucide-react";

function NavItem({ to, label, icon: Icon, onClick }) {
    return (
        <NavLink
            to={to}
            end={to === "/"}
            onClick={onClick}
            className={({ isActive }) =>
                [
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive
                        ? "bg-white/10 text-white font-medium"
                        : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200",
                ].join(" ")
            }
        >
            <Icon size={18} strokeWidth={1.75} />
            <span>{label}</span>
        </NavLink>
    );
}

export default function Sidebar({ onClose }) {
    const { t } = useTranslation();

    const dashboardLinks = [
        { to: "/", label: t("sidebar.home"), icon: LayoutGrid },
        { to: "/realsmile-ai", label: t("sidebar.realsmileAi"), icon: Sparkles },
        {
            to: "/realsmile-ai-cases",
            label: t("sidebar.realsmileAiCases"),
            icon: ImagePlus,
        },
        { to: "/patients", label: t("sidebar.patients"), icon: User },
    ];

    const casesHubLinks = [
        { to: "/cases/add", label: t("sidebar.addCase"), icon: UserPlus },
        { to: "/retainers/add", label: t("sidebar.addRetainer"), icon: Repeat },
        { to: "/cases", label: t("sidebar.allCases"), icon: FolderOpen },
        {
            to: "/cases/incomplete",
            label: t("sidebar.incompleteSubmission"),
            icon: FileWarning,
        },
    ];

    return (
        <aside className="flex h-full w-full flex-col bg-[#161513] px-4 py-6 md:w-64">
            {/* Logo + close button (mobile only) */}
            {/* Logo + close button (mobile only) */}
            <div className="relative mb-8 flex items-center justify-center px-2">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-12 w-auto shrink-0 object-contain"
                />

                {/* Close button – mobile only, absolute right */}
                <button
                    onClick={onClose}
                    className="absolute right-0 text-neutral-400 hover:text-white md:hidden"
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto">
                <div>
                    <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-widest text-neutral-600">
                        {t("sidebar.dashboard")}
                    </p>
                    <div className="space-y-1">
                        {dashboardLinks.map((link) => (
                            <NavItem key={link.to} {...link} onClick={onClose} />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-widest text-neutral-600">
                        {t("sidebar.casesHub")}
                    </p>
                    <div className="space-y-1">
                        {casesHubLinks.map((link) => (
                            <NavItem key={link.to} {...link} onClick={onClose} />
                        ))}
                    </div>
                </div>
            </nav>
        </aside>
    );
}