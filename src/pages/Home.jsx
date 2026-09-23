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
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
            {/* Getting started */}
            {showOnboarding && (
                <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
                    <div className="mb-4 flex items-start justify-between gap-2">
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-900 sm:text-base">
                                {t("home.gettingStarted.title")}
                            </h2>
                            <p className="text-xs text-neutral-500 sm:text-sm">
                                {t("home.gettingStarted.subtitle")}
                            </p>
                        </div>
                        <span className="shrink-0 text-xs text-neutral-400 sm:text-sm">
                            0 / 3
                        </span>
                    </div>

                    <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full w-0 rounded-full bg-amber-500" />
                    </div>

                    <div className="divide-y divide-neutral-100">
                        {onboardingSteps.map(({ icon: Icon, title, description }) => (
                            <button
                                key={title}
                                className="flex w-full items-center gap-3 py-3 text-left hover:bg-neutral-50 sm:gap-4"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 sm:h-10 sm:w-10">
                                    <Icon size={18} />
                                </span>
                                <span className="flex-1">
                                    <p className="text-sm font-medium text-neutral-900">
                                        {title}
                                    </p>
                                    <p className="text-xs text-neutral-500 sm:text-sm">
                                        {description}
                                    </p>
                                </span>
                                <ArrowRight
                                    size={16}
                                    className="shrink-0 text-neutral-400"
                                />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowOnboarding(false)}
                        className="mt-2 text-xs text-neutral-400 hover:text-neutral-600 sm:text-sm"
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
                    className="h-56 w-full object-cover sm:h-72 md:h-80"
                />
                <div className="absolute inset-0 flex items-center bg-gradient-to-r from-white/90 via-white/40 to-transparent">
                    <h1 className="max-w-md px-6 text-2xl font-semibold leading-tight text-neutral-900 sm:px-10 sm:text-3xl md:text-4xl">
                        {t("home.hero.headline")}
                    </h1>
                </div>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    <span className="h-1.5 w-4 rounded-full bg-blue-600" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                </div>
            </section>

            {/* Feature banner */}
            <section className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-3 text-white">
                    <Sparkles size={20} className="shrink-0" />
                    <div>
                        <p className="text-sm font-semibold sm:text-base">
                            {t("home.featureBanner.title")}
                        </p>
                        <p className="text-xs text-amber-50 sm:text-sm">
                            {t("home.featureBanner.subtitle")}
                        </p>
                    </div>
                </div>
                <button className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 sm:w-auto">
                    {t("home.featureBanner.cta")}
                </button>
            </section>

            {/* Stats row */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {stats.map(({ icon: Icon, label, value }) => (
                    <div
                        key={label}
                        className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5"
                    >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-800 text-white sm:h-12 sm:w-12">
                            <Icon size={20} />
                        </span>
                        <div>
                            <p className="text-xs text-neutral-500 sm:text-sm">
                                {label}
                            </p>
                            <p className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Welcome banner */}
            <section className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                    <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                        {t("home.welcome.greeting")} <br />
                        {DOCTOR_NAME} 👋
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-neutral-500">
                        {t("home.welcome.subtitle")}
                    </p>
                    <button className="mt-4 w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600 sm:w-auto">
                        + {t("home.welcome.cta")}
                    </button>
                </div>
                <div className="hidden h-40 w-40 shrink-0 items-center justify-center rounded-full bg-amber-50 sm:flex">
                    <Smile size={64} className="text-amber-500" />
                </div>
            </section>

            {/* Recent cases */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-neutral-900 sm:text-base">
                        {t("home.recentCases.title")}
                    </h2>
                    <button className="flex shrink-0 items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50 sm:text-sm">
                        {t("home.recentCases.filter")}
                        <ChevronDown size={14} />
                    </button>
                </div>
                <div className="flex h-32 items-center justify-center text-sm text-neutral-400 sm:h-40">
                    {t("home.recentCases.empty")}
                </div>
                <div className="mt-2 text-center">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-700">
                        {t("home.recentCases.viewAll")}
                    </button>
                </div>
            </section>

            {/* Chart */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
                <p className="text-xs text-neutral-500 sm:text-sm">
                    {t("home.chart.title")}
                </p>
                <p className="mb-4 text-xl font-semibold text-neutral-900 sm:text-2xl">
                    {t("home.chart.total", { count: 1 })}
                </p>
                <div className="h-56 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={caseData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="group"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(v) => t("home.chart.casesUnit", { count: v })}
                            />
                            <Bar
                                dataKey="cases"
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                                barSize={32}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
}