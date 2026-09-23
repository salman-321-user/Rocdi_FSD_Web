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
            <div className="mb-8 flex items-center justify-between gap-3 px-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/40">
                        <span className="h-3 w-3 rounded-full bg-amber-500" />
                    </div>
                    <div className="leading-tight">
                        <p className="text-lg font-semibold tracking-wide text-white">
                            {t("sidebar.brand")}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                            {t("sidebar.brandSub")}
                        </p>
                    </div>
                </div>

                {/* Close button – mobile only */}
                <button
                    onClick={onClose}
                    className="text-neutral-400 hover:text-white md:hidden"
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