import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileWarning, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { incompleteSubmissions, formatDate } from "../data/demo";

export default function IncompleteSubmissions() {
    const { t, i18n } = useTranslation();
    const [drafts, setDrafts] = useState(incompleteSubmissions);

    return (
        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.incomplete.title")}
                subtitle={t("pages.incomplete.subtitle")}
            />

            {drafts.length === 0 ? (
                <section className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-10 text-center">
                    <CheckCircle2 size={40} className="text-brand-500" />
                    <p className="text-sm font-medium text-navy-900">
                        {t("pages.incomplete.emptyTitle")}
                    </p>
                </section>
            ) : (
                <div className="space-y-3">
                    {drafts.map((d) => (
                        <article
                            key={d.id}
                            className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <FileWarning size={20} />
                            </span>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-baseline gap-x-2">
                                    <p className="text-sm font-semibold text-navy-900">
                                        {d.patient}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        {d.id} ·{" "}
                                        {t("pages.incomplete.lastEdited", {
                                            date: formatDate(d.lastEdited, i18n.language),
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 max-w-xs flex-1 overflow-hidden rounded-full bg-neutral-100">
                                        <div
                                            className="h-full rounded-full bg-brand-500"
                                            style={{ width: `${d.completion}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-neutral-500">
                                        {t("pages.incomplete.completion", {
                                            percent: d.completion,
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-xs text-neutral-500">
                                        {t("pages.incomplete.missing")}:
                                    </span>
                                    {d.missing.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700"
                                        >
                                            {t(`pages.incomplete.missingItems.${item}`)}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDrafts((list) => list.filter((x) => x.id !== d.id))
                                    }
                                    className="flex items-center justify-center rounded-lg border border-neutral-200 px-3 py-2 text-neutral-500 hover:bg-neutral-50 hover:text-red-600"
                                    aria-label={t("pages.incomplete.discard")}
                                >
                                    <Trash2 size={16} />
                                </button>
                                <Link
                                    to="/cases/add"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                                >
                                    {t("pages.incomplete.resume")}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
