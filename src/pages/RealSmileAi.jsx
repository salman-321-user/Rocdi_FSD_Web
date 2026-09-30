import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { UploadCloud, Sparkles, Smile, Lightbulb, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { patients } from "../data/demo";

const TREATMENTS = ["full", "upper", "lower"];

export default function RealSmileAi() {
    const { t } = useTranslation();
    const fileInput = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [treatment, setTreatment] = useState("full");
    const [whitening, setWhitening] = useState(true);
    const [state, setState] = useState("idle"); // idle | generating | done

    function handleFile(file) {
        if (!file) return;
        setPhoto(URL.createObjectURL(file));
        setState("idle");
    }

    function generate() {
        setState("generating");
        setTimeout(() => setState("done"), 1800);
    }

    return (
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
            <PageHeader
                title={t("pages.realsmileAi.title")}
                subtitle={t("pages.realsmileAi.subtitle")}
            />

            <div className="grid gap-4 lg:grid-cols-5 sm:gap-6">
                {/* Settings */}
                <section className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 lg:col-span-2">
                    <button
                        type="button"
                        onClick={() => fileInput.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleFile(e.dataTransfer.files[0]);
                        }}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 bg-brand-50/50 px-4 py-8 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
                    >
                        {photo ? (
                            <img
                                src={photo}
                                alt=""
                                className="h-32 w-full rounded-lg object-cover"
                            />
                        ) : (
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                                <UploadCloud size={22} />
                            </span>
                        )}
                        <span className="text-sm font-medium text-navy-900">
                            {t("pages.realsmileAi.uploadTitle")}
                        </span>
                        <span className="text-xs text-neutral-500">
                            {t("pages.realsmileAi.uploadHint")}
                        </span>
                    </button>
                    <input
                        ref={fileInput}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files[0])}
                    />

                    <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-navy-900">
                            {t("pages.realsmileAi.patient")}
                        </span>
                        <select className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100">
                            <option>{t("pages.realsmileAi.patientPlaceholder")}</option>
                            {patients.map((p) => (
                                <option key={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </label>

                    <div>
                        <span className="mb-1.5 block text-sm font-medium text-navy-900">
                            {t("pages.realsmileAi.treatment")}
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            {TREATMENTS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setTreatment(option)}
                                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors sm:text-sm ${treatment === option
                                            ? "border-brand-500 bg-brand-50 text-brand-700"
                                            : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                                        }`}
                                >
                                    {t(`pages.realsmileAi.treatments.${option}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="flex cursor-pointer items-center justify-between gap-3">
                        <span className="text-sm font-medium text-navy-900">
                            {t("pages.realsmileAi.whitening")}
                        </span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={whitening}
                            onClick={() => setWhitening((v) => !v)}
                            className={`relative h-6 w-11 rounded-full transition-colors ${whitening ? "bg-brand-500" : "bg-neutral-300"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${whitening ? "left-[22px]" : "left-0.5"
                                    }`}
                            />
                        </button>
                    </label>

                    <button
                        type="button"
                        onClick={generate}
                        disabled={state === "generating"}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-navy-800 to-accent-600 px-4 py-2.5 text-sm font-medium text-white hover:opacity-95 disabled:opacity-70"
                    >
                        {state === "generating" ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Sparkles size={16} />
                        )}
                        {state === "generating"
                            ? t("pages.realsmileAi.generating")
                            : t("pages.realsmileAi.generate")}
                    </button>
                </section>

                {/* Preview */}
                <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 lg:col-span-3">
                    <h2 className="mb-4 text-sm font-semibold text-navy-900 sm:text-base">
                        {t("pages.realsmileAi.preview")}
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {["before", "after"].map((side) => (
                            <div key={side}>
                                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                                    {t(`pages.realsmileAi.${side}`)}
                                </p>
                                <div
                                    className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl ${side === "after"
                                            ? "bg-gradient-to-br from-brand-50 to-accent-50"
                                            : "bg-neutral-100"
                                        }`}
                                >
                                    {photo && (side === "before" || state === "done") ? (
                                        <img
                                            src={photo}
                                            alt=""
                                            className={`h-full w-full object-cover ${side === "after" && whitening
                                                    ? "brightness-110 contrast-105"
                                                    : ""
                                                }`}
                                        />
                                    ) : side === "after" && state === "generating" ? (
                                        <Loader2
                                            size={32}
                                            className="animate-spin text-brand-500"
                                        />
                                    ) : (
                                        <Smile
                                            size={48}
                                            className={
                                                side === "after"
                                                    ? "text-brand-300"
                                                    : "text-neutral-300"
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!photo && (
                        <p className="mt-4 text-center text-sm text-neutral-400">
                            {t("pages.realsmileAi.emptyPreview")}
                        </p>
                    )}
                </section>
            </div>

            {/* Tips */}
            <section className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2 text-brand-700">
                    <Lightbulb size={18} />
                    <h2 className="text-sm font-semibold sm:text-base">
                        {t("pages.realsmileAi.tipsTitle")}
                    </h2>
                </div>
                <ul className="grid gap-2 text-sm text-neutral-600 sm:grid-cols-3">
                    {["tip1", "tip2", "tip3"].map((tip) => (
                        <li key={tip} className="rounded-lg bg-white p-3">
                            {t(`pages.realsmileAi.${tip}`)}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
