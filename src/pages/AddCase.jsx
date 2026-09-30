import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, UploadCloud, Camera, ScanLine, FileImage, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";

const STEPS = ["patient", "clinical", "files", "review"];
const LEVELS = ["none", "mild", "moderate", "severe"];
const ARCHES = ["both", "upper", "lower"];

const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy-900">{label}</span>
            {children}
        </label>
    );
}

function Choice({ options, value, onChange, labelFor }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${value === option
                            ? "border-brand-500 bg-brand-50 font-medium text-brand-700"
                            : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                        }`}
                >
                    {labelFor(option)}
                </button>
            ))}
        </div>
    );
}

export default function AddCase() {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [arches, setArches] = useState("both");
    const [crowding, setCrowding] = useState("mild");
    const [spacing, setSpacing] = useState("none");

    if (submitted) {
        return (
            <div className="mx-auto max-w-xl">
                <section className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-8 text-center sm:p-12">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <CheckCircle2 size={36} />
                    </span>
                    <h1 className="text-xl font-semibold text-navy-900">
                        {t("pages.addCase.successTitle")}
                    </h1>
                    <p className="text-sm text-neutral-500">{t("pages.addCase.successText")}</p>
                    <button
                        type="button"
                        onClick={() => {
                            setSubmitted(false);
                            setStep(0);
                        }}
                        className="mt-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
                    >
                        {t("pages.addCase.another")}
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.addCase.title")}
                subtitle={t("pages.addCase.subtitle")}
            />

            {/* Stepper */}
            <ol className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4">
                {STEPS.map((name, i) => (
                    <li key={name} className="flex flex-1 items-center gap-2">
                        <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${i < step
                                    ? "bg-brand-500 text-white"
                                    : i === step
                                        ? "bg-navy-800 text-white"
                                        : "bg-neutral-100 text-neutral-400"
                                }`}
                        >
                            {i < step ? <Check size={16} /> : i + 1}
                        </span>
                        <span
                            className={`hidden text-sm sm:inline ${i === step ? "font-medium text-navy-900" : "text-neutral-500"
                                }`}
                        >
                            {t(`pages.addCase.steps.${name}`)}
                        </span>
                        {i < STEPS.length - 1 && (
                            <span
                                className={`h-0.5 flex-1 rounded-full ${i < step ? "bg-brand-400" : "bg-neutral-200"
                                    }`}
                            />
                        )}
                    </li>
                ))}
            </ol>

            <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
                <h2 className="mb-5 text-base font-semibold text-navy-900">
                    {t(`pages.addCase.steps.${STEPS[step]}`)}
                </h2>

                {step === 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={t("pages.addCase.fields.firstName")}>
                            <input className={inputClass} defaultValue="Hamza" />
                        </Field>
                        <Field label={t("pages.addCase.fields.lastName")}>
                            <input className={inputClass} defaultValue="Kettani" />
                        </Field>
                        <Field label={t("pages.addCase.fields.dob")}>
                            <input type="date" className={inputClass} defaultValue="1996-04-12" />
                        </Field>
                        <Field label={t("pages.addCase.fields.gender")}>
                            <select className={inputClass}>
                                <option>{t("common.gender.male")}</option>
                                <option>{t("common.gender.female")}</option>
                            </select>
                        </Field>
                        <Field label={t("pages.addCase.fields.email")}>
                            <input type="email" className={inputClass} placeholder="patient@mail.com" />
                        </Field>
                        <Field label={t("pages.addCase.fields.phone")}>
                            <input type="tel" className={inputClass} placeholder="+212 6 00 00 00 00" />
                        </Field>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-5">
                        <Field label={t("pages.addCase.fields.chiefComplaint")}>
                            <input
                                className={inputClass}
                                placeholder={t("pages.addCase.fields.chiefComplaintPlaceholder")}
                            />
                        </Field>
                        <div>
                            <span className="mb-1.5 block text-sm font-medium text-navy-900">
                                {t("pages.addCase.fields.archesToTreat")}
                            </span>
                            <Choice
                                options={ARCHES}
                                value={arches}
                                onChange={setArches}
                                labelFor={(o) => t(`common.arches.${o}`)}
                            />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <span className="mb-1.5 block text-sm font-medium text-navy-900">
                                    {t("pages.addCase.fields.crowding")}
                                </span>
                                <Choice
                                    options={LEVELS}
                                    value={crowding}
                                    onChange={setCrowding}
                                    labelFor={(o) => t(`pages.addCase.levels.${o}`)}
                                />
                            </div>
                            <div>
                                <span className="mb-1.5 block text-sm font-medium text-navy-900">
                                    {t("pages.addCase.fields.spacing")}
                                </span>
                                <Choice
                                    options={LEVELS}
                                    value={spacing}
                                    onChange={setSpacing}
                                    labelFor={(o) => t(`pages.addCase.levels.${o}`)}
                                />
                            </div>
                        </div>
                        <Field label={t("pages.addCase.fields.notes")}>
                            <textarea
                                rows={4}
                                className={inputClass}
                                placeholder={t("pages.addCase.fields.notesPlaceholder")}
                            />
                        </Field>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            { key: "photos", icon: Camera },
                            { key: "scans", icon: ScanLine },
                            { key: "xray", icon: FileImage },
                        ].map(({ key, icon: Icon }) => (
                            <button
                                key={key}
                                type="button"
                                className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 px-4 py-8 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/50"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                    <Icon size={20} />
                                </span>
                                <span className="text-sm font-medium text-navy-900">
                                    {t(`pages.addCase.files.${key}`)}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-neutral-400">
                                    <UploadCloud size={13} />
                                    {t("pages.addCase.files.dropHint")}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <dl className="divide-y divide-neutral-100 text-sm">
                        {[
                            [t("pages.addCase.fields.firstName"), "Hamza Kettani"],
                            [t("pages.addCase.fields.archesToTreat"), t(`common.arches.${arches}`)],
                            [t("pages.addCase.fields.crowding"), t(`pages.addCase.levels.${crowding}`)],
                            [t("pages.addCase.fields.spacing"), t(`pages.addCase.levels.${spacing}`)],
                        ].map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4 py-3">
                                <dt className="text-neutral-500">{label}</dt>
                                <dd className="font-medium text-navy-900">{value}</dd>
                            </div>
                        ))}
                        <p className="pt-4 text-xs text-neutral-500">{t("pages.addCase.reviewText")}</p>
                    </dl>
                )}

                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-between">
                    <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        disabled={step === 0}
                        className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 disabled:invisible"
                    >
                        {t("common.back")}
                    </button>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row">
                        <button
                            type="button"
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
                        >
                            {t("common.saveDraft")}
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                step === STEPS.length - 1
                                    ? setSubmitted(true)
                                    : setStep((s) => s + 1)
                            }
                            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
                        >
                            {step === STEPS.length - 1 ? t("common.submit") : t("common.next")}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
