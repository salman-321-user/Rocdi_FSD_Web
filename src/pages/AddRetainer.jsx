import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Minus, Plus, Truck, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { patients } from "../data/demo";

const ARCHES = ["both", "upper", "lower"];
const TYPES = ["essix", "hawley", "fixed"];
const SCAN_SOURCES = ["previous", "new"];

const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function OptionCard({ selected, onClick, title, description }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-xl border p-3 text-left transition-colors ${selected
                    ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                    : "border-neutral-200 hover:bg-neutral-50"
                }`}
        >
            <p className={`text-sm font-medium ${selected ? "text-brand-700" : "text-navy-900"}`}>
                {title}
            </p>
            {description && <p className="mt-0.5 text-xs text-neutral-500">{description}</p>}
        </button>
    );
}

export default function AddRetainer() {
    const { t } = useTranslation();
    const [patient, setPatient] = useState(patients[0].name);
    const [arch, setArch] = useState("both");
    const [type, setType] = useState("essix");
    const [scan, setScan] = useState("previous");
    const [quantity, setQuantity] = useState(1);
    const [ordered, setOrdered] = useState(false);

    const summary = [
        [t("pages.addRetainer.patient"), patient],
        [t("pages.addRetainer.arch"), t(`common.arches.${arch}`)],
        [t("pages.addRetainer.type"), t(`pages.addRetainer.types.${type}`)],
        [t("pages.addRetainer.quantity"), quantity],
    ];

    return (
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.addRetainer.title")}
                subtitle={t("pages.addRetainer.subtitle")}
            />

            <div className="grid gap-4 lg:grid-cols-3 sm:gap-6">
                <section className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 lg:col-span-2">
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-navy-900">
                            {t("pages.addRetainer.patient")}
                        </span>
                        <select
                            value={patient}
                            onChange={(e) => setPatient(e.target.value)}
                            className={inputClass}
                        >
                            {patients.map((p) => (
                                <option key={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </label>

                    <div>
                        <span className="mb-2 block text-sm font-medium text-navy-900">
                            {t("pages.addRetainer.arch")}
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            {ARCHES.map((a) => (
                                <OptionCard
                                    key={a}
                                    selected={arch === a}
                                    onClick={() => setArch(a)}
                                    title={t(`common.arches.${a}`)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="mb-2 block text-sm font-medium text-navy-900">
                            {t("pages.addRetainer.type")}
                        </span>
                        <div className="grid gap-2 sm:grid-cols-3">
                            {TYPES.map((ty) => (
                                <OptionCard
                                    key={ty}
                                    selected={type === ty}
                                    onClick={() => setType(ty)}
                                    title={t(`pages.addRetainer.types.${ty}`)}
                                    description={t(`pages.addRetainer.typeDescriptions.${ty}`)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <span className="mb-2 block text-sm font-medium text-navy-900">
                                {t("pages.addRetainer.scanSource")}
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                {SCAN_SOURCES.map((s) => (
                                    <OptionCard
                                        key={s}
                                        selected={scan === s}
                                        onClick={() => setScan(s)}
                                        title={t(`pages.addRetainer.scanSources.${s}`)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="mb-2 block text-sm font-medium text-navy-900">
                                {t("pages.addRetainer.quantity")}
                            </span>
                            <div className="inline-flex items-center rounded-lg border border-neutral-200">
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="px-3 py-2.5 text-neutral-500 hover:text-navy-900"
                                    aria-label="-"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-10 text-center text-sm font-semibold text-navy-900">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.min(4, q + 1))}
                                    className="px-3 py-2.5 text-neutral-500 hover:text-navy-900"
                                    aria-label="+"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-navy-900">
                            {t("pages.addRetainer.notes")}
                        </span>
                        <textarea
                            rows={3}
                            className={inputClass}
                            placeholder={t("pages.addRetainer.notesPlaceholder")}
                        />
                    </label>
                </section>

                {/* Summary */}
                <aside className="h-fit space-y-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 lg:sticky lg:top-0">
                    <h2 className="text-base font-semibold text-navy-900">
                        {t("pages.addRetainer.summary")}
                    </h2>
                    <dl className="divide-y divide-neutral-100 text-sm">
                        {summary.map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4 py-2.5">
                                <dt className="text-neutral-500">{label}</dt>
                                <dd className="text-right font-medium text-navy-900">{value}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
                        <Truck size={15} />
                        {t("pages.addRetainer.delivery")}
                    </p>
                    {ordered ? (
                        <p className="flex items-center justify-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                            <CheckCircle2 size={16} />
                            {t("pages.addRetainer.ordered")}
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setOrdered(true)}
                            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
                        >
                            {t("pages.addRetainer.placeOrder")}
                        </button>
                    )}
                </aside>
            </div>
        </div>
    );
}
