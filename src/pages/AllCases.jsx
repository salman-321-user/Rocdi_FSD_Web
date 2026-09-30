import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus, ChevronRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { cases, formatDate } from "../data/demo";

const TABS = [
    "all",
    "submitted",
    "smilesetInProgress",
    "approvalRequired",
    "inTreatment",
    "completed",
];

function Progress({ step, totalSteps }) {
    const { t } = useTranslation();
    if (!totalSteps) return <span className="text-xs text-neutral-400">—</span>;
    const percent = Math.round((step / totalSteps) * 100);

    return (
        <div className="w-32">
            <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-600"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="text-xs text-neutral-500">
                {t("pages.allCases.alignerStep", { current: step, total: totalSteps })}
            </span>
        </div>
    );
}

export default function AllCases() {
    const { t, i18n } = useTranslation();
    const [tab, setTab] = useState("all");

    const visible = cases.filter((c) => tab === "all" || c.status === tab);
    const countFor = (status) =>
        status === "all"
            ? cases.length
            : cases.filter((c) => c.status === status).length;

    return (
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.allCases.title")}
                subtitle={t("pages.allCases.subtitle")}
                action={
                    <Link
                        to="/cases/add"
                        className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
                    >
                        <Plus size={16} />
                        {t("pages.allCases.newCase")}
                    </Link>
                }
            />

            <section className="rounded-2xl border border-neutral-200 bg-white">
                <div className="flex gap-1 overflow-x-auto border-b border-neutral-200 px-2">
                    {TABS.map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => setTab(s)}
                            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors ${tab === s
                                    ? "border-brand-500 font-medium text-navy-900"
                                    : "border-transparent text-neutral-500 hover:text-navy-900"
                                }`}
                        >
                            {s === "all" ? t("pages.allCases.all") : t(`common.status.${s}`)}
                            <span
                                className={`rounded-full px-1.5 text-xs ${tab === s
                                        ? "bg-brand-50 text-brand-700"
                                        : "bg-neutral-100 text-neutral-500"
                                    }`}
                            >
                                {countFor(s)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Table – tablet and up */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase tracking-wider text-neutral-400">
                            <tr>
                                {["id", "patient", "type", "status", "progress", "updated"].map(
                                    (col) => (
                                        <th key={col} className="px-4 py-3 font-medium">
                                            {t(`pages.allCases.columns.${col}`)}
                                        </th>
                                    )
                                )}
                                <th />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {visible.map((c) => (
                                <tr key={c.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3 font-medium text-navy-900">{c.id}</td>
                                    <td className="px-4 py-3 text-neutral-700">{c.patient}</td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {t(`pages.allCases.types.${c.type}`)}
                                        <span className="block text-xs text-neutral-400">
                                            {t(`common.arches.${c.arches}`)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={c.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Progress {...c} />
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {formatDate(c.updated, i18n.language)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <ChevronRight size={16} className="text-neutral-300" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards – mobile */}
                <div className="divide-y divide-neutral-100 md:hidden">
                    {visible.map((c) => (
                        <div key={c.id} className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-sm font-medium text-navy-900">{c.patient}</p>
                                    <p className="text-xs text-neutral-400">
                                        {c.id} · {t(`pages.allCases.types.${c.type}`)}
                                    </p>
                                </div>
                                <StatusBadge status={c.status} />
                            </div>
                            <div className="flex items-end justify-between">
                                <Progress {...c} />
                                <span className="text-xs text-neutral-400">
                                    {formatDate(c.updated, i18n.language)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {visible.length === 0 && (
                    <p className="p-8 text-center text-sm text-neutral-400">
                        {t("pages.allCases.empty")}
                    </p>
                )}
            </section>
        </div>
    );
}
