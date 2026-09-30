import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, UserPlus, Mail, Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { patients, formatDate, initials } from "../data/demo";

export default function Patients() {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState("");

    const visible = patients.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.patients.title")}
                subtitle={t("pages.patients.total", { count: patients.length })}
                action={
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
                    >
                        <UserPlus size={16} />
                        {t("pages.patients.addPatient")}
                    </button>
                }
            />

            <section className="rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 p-4">
                    <label className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-400 focus-within:border-brand-400">
                        <Search size={16} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t("pages.patients.searchPlaceholder")}
                            className="w-full bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400"
                        />
                    </label>
                </div>

                {/* Table – tablet and up */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase tracking-wider text-neutral-400">
                            <tr>
                                {["name", "age", "contact", "cases", "lastVisit", "status"].map(
                                    (col) => (
                                        <th key={col} className="px-4 py-3 font-medium">
                                            {t(`pages.patients.columns.${col}`)}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {visible.map((p) => (
                                <tr key={p.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs font-semibold text-navy-700">
                                                {initials(p.name)}
                                            </span>
                                            <div>
                                                <p className="font-medium text-navy-900">{p.name}</p>
                                                <p className="text-xs text-neutral-400">{p.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {p.age} · {t(`common.gender.${p.gender}`)}
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        <p>{p.email}</p>
                                        <p className="text-xs text-neutral-400">{p.phone}</p>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">{p.cases}</td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {formatDate(p.lastVisit, i18n.language)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={p.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards – mobile */}
                <div className="divide-y divide-neutral-100 md:hidden">
                    {visible.map((p) => (
                        <div key={p.id} className="space-y-2 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs font-semibold text-navy-700">
                                        {initials(p.name)}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-navy-900">{p.name}</p>
                                        <p className="text-xs text-neutral-400">
                                            {p.age} · {t(`common.gender.${p.gender}`)}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge status={p.status} />
                            </div>
                            <p className="flex items-center gap-2 text-xs text-neutral-500">
                                <Mail size={13} /> {p.email}
                            </p>
                            <p className="flex items-center gap-2 text-xs text-neutral-500">
                                <Phone size={13} /> {p.phone}
                            </p>
                        </div>
                    ))}
                </div>

                {visible.length === 0 && (
                    <p className="p-8 text-center text-sm text-neutral-400">
                        {t("pages.patients.empty")}
                    </p>
                )}
            </section>
        </div>
    );
}
