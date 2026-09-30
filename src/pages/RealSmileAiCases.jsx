import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus, Smile, Calendar } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { aiCases, formatDate } from "../data/demo";

const FILTERS = ["all", "ready", "processing"];

export default function RealSmileAiCases() {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState("all");

    const visible = aiCases.filter(
        (c) => filter === "all" || c.status === filter
    );

    return (
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.aiCases.title")}
                subtitle={t("pages.aiCases.subtitle")}
                action={
                    <Link
                        to="/realsmile-ai"
                        className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
                    >
                        <Plus size={16} />
                        {t("pages.aiCases.newSimulation")}
                    </Link>
                }
            />

            <div className="flex gap-2 overflow-x-auto">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => setFilter(f)}
                        className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${filter === f
                                ? "bg-navy-800 text-white"
                                : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                            }`}
                    >
                        {f === "all"
                            ? t("pages.aiCases.all")
                            : t(`common.status.${f}`)}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((c) => (
                    <article
                        key={c.id}
                        className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                    >
                        <div className="grid h-40 grid-cols-2">
                            <div className="flex items-center justify-center bg-neutral-100">
                                <Smile size={36} className="text-neutral-300" />
                            </div>
                            <div className="flex items-center justify-center bg-gradient-to-br from-brand-100 to-accent-50">
                                <Smile size={36} className="text-brand-400" />
                            </div>
                        </div>
                        <div className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-sm font-semibold text-navy-900">
                                        {c.patient}
                                    </p>
                                    <p className="text-xs text-neutral-400">{c.id}</p>
                                </div>
                                <StatusBadge status={c.status} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                                    <Calendar size={14} />
                                    {formatDate(c.date, i18n.language)}
                                </span>
                                <button
                                    type="button"
                                    disabled={c.status !== "ready"}
                                    className="text-sm font-medium text-brand-600 hover:text-brand-700 disabled:text-neutral-300"
                                >
                                    {t("pages.aiCases.open")}
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
