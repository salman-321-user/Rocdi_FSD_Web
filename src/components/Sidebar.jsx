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
                        ? "bg-brand-50 text-navy-900 font-medium"
                        : "text-navy-700/80 hover:bg-navy-50 hover:text-navy-900",
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
        <aside className="flex h-full w-full flex-col border-r border-neutral-200 bg-white px-4 py-6 md:w-64">
            {/* Logo + close button (mobile only) */}
            <div className="mb-8 flex items-center justify-between gap-3 px-2">
                <img
                    src="/logo.png"
                    alt="Smile Liners"
                    className="h-14 w-auto shrink-0 object-contain"
                />

                {/* Close button – mobile only */}
                <button
                    type="button"
                    onClick={onClose}
                    className="relative z-40 text-neutral-400 hover:text-navy-900 md:hidden"
                    aria-label="Close sidebar"
                >
                    <X size={22} />
                </button>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto">
                <div>
                    <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-widest text-neutral-400">
                        {t("sidebar.dashboard")}
                    </p>
                    <div className="space-y-1">
                        {dashboardLinks.map((link) => (
                            <NavItem key={link.to} {...link} onClick={onClose} />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-widest text-neutral-400">
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