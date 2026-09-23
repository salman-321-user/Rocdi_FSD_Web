import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Calendar,
    Sparkles,
    Smartphone,
    ArrowRight,
    ChevronRight,
    FolderHeart,
    Smile,
    ClipboardCheck,
    ChevronDown,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

// Replace with the logged-in practitioner's real name, e.g. from auth/user context
const DOCTOR_NAME = "Dr LABAKOUM BADREDDINE";

const caseData = [
    { group: "0-18", cases: 0 },
    { group: "19-35", cases: 1 },
    { group: "36-55", cases: 0 },
];

export default function Home() {
    const { t } = useTranslation();
    const [showOnboarding, setShowOnboarding] = useState(true);

    const onboardingSteps = [
        {
            icon: Calendar,
            title: t("home.gettingStarted.availabilityTitle"),
            description: t("home.gettingStarted.availabilityDescription"),
        },
        {
            icon: Sparkles,
            title: t("home.gettingStarted.aiTitle"),
            description: t("home.gettingStarted.aiDescription"),
        },
        {
            icon: Smartphone,
            title: t("home.gettingStarted.appTitle"),
            description: t("home.gettingStarted.appDescription"),
        },
    ];

    const stats = [
        { icon: FolderHeart, label: t("home.stats.totalCases"), value: 1 },
        { icon: Smile, label: t("home.stats.smilesetDesign"), value: 0 },
        {
            icon: ClipboardCheck,
            label: t("home.stats.approvalRequired"),
            value: 0,
        },
    ];

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            {/* Getting started */}
            {showOnboarding && (
                <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-neutral-900">
                                {t("home.gettingStarted.title")}
                            </h2>
                            <p className="text-sm text-neutral-500">
                                {t("home.gettingStarted.subtitle")}
                            </p>
                        </div>
                        <span className="text-sm text-neutral-400">0 / 3</span>
                    </div>

                    <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full w-0 rounded-full bg-amber-500" />
                    </div>

                    <div className="divide-y divide-neutral-100">
                        {onboardingSteps.map(({ icon: Icon, title, description }) => (
                            <button
                                key={title}
                                className="flex w-full items-center gap-4 py-3 text-left hover:bg-neutral-50"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                    <Icon size={18} />
                                </span>
                                <span className="flex-1">
                                    <p className="text-sm font-medium text-neutral-900">
                                        {title}
                                    </p>
                                    <p className="text-sm text-neutral-500">{description}</p>
                                </span>
                                <ArrowRight size={16} className="text-neutral-400" />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowOnboarding(false)}
                        className="mt-2 text-sm text-neutral-400 hover:text-neutral-600"
                    >
                        {t("home.gettingStarted.dismiss")}
                    </button>
                </section>
            )}

            {/* Hero banner */}
            <section className="relative overflow-hidden rounded-2xl bg-neutral-100">
                <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1600&auto=format&fit=crop"
                    alt=""
                    className="h-80 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center bg-gradient-to-r from-white/90 via-white/40 to-transparent">
                    <h1 className="max-w-md px-10 text-4xl font-semibold leading-tight text-neutral-900">
                        {t("home.hero.headline")}
                    </h1>
                </div>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    <span className="h-1.5 w-4 rounded-full bg-blue-600" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                </div>
            </section>

            {/* Feature banner */}
            <section className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-4">
                <div className="flex items-center gap-3 text-white">
                    <Sparkles size={20} />
                    <div>
                        <p className="font-semibold">{t("home.featureBanner.title")}</p>
                        <p className="text-sm text-amber-50">
                            {t("home.featureBanner.subtitle")}
                        </p>
                    </div>
                </div>
                <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50">
                    {t("home.featureBanner.cta")}
                </button>
            </section>

            {/* Stats row */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ icon: Icon, label, value }) => (
                    <div
                        key={label}
                        className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5"
                    >
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800 text-white">
                            <Icon size={20} />
                        </span>
                        <div>
                            <p className="text-sm text-neutral-500">{label}</p>
                            <p className="text-2xl font-semibold text-neutral-900">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Welcome banner */}
            <section className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-8">
                <div>
                    <h2 className="text-2xl font-semibold text-neutral-900">
                        {t("home.welcome.greeting")} <br />
                        {DOCTOR_NAME} 👋
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-neutral-500">
                        {t("home.welcome.subtitle")}
                    </p>
                    <button className="mt-4 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600">
                        + {t("home.welcome.cta")}
                    </button>
                </div>
                <div className="hidden h-40 w-40 shrink-0 items-center justify-center rounded-full bg-amber-50 sm:flex">
                    <Smile size={64} className="text-amber-500" />
                </div>
            </section>

            {/* Recent cases */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-neutral-900">
                        {t("home.recentCases.title")}
                    </h2>
                    <button className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50">
                        {t("home.recentCases.filter")}
                        <ChevronDown size={14} />
                    </button>
                </div>
                <div className="flex h-40 items-center justify-center text-sm text-neutral-400">
                    {t("home.recentCases.empty")}
                </div>
                <div className="mt-2 text-center">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-700">
                        {t("home.recentCases.viewAll")}
                    </button>
                </div>
            </section>

            {/* Chart */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                <p className="text-sm text-neutral-500">{t("home.chart.title")}</p>
                <p className="mb-4 text-2xl font-semibold text-neutral-900">
                    {t("home.chart.total", { count: 1 })}
                </p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={caseData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="group" tickLine={false} axisLine={false} />
                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => t("home.chart.casesUnit", { count: v })}
                            />
                            <Bar
                                dataKey="cases"
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                                barSize={48}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
}