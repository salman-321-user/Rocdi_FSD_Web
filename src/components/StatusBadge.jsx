import { useTranslation } from "react-i18next";

const STYLES = {
    draft: "bg-neutral-100 text-neutral-600",
    new: "bg-accent-50 text-accent-600",
    submitted: "bg-accent-50 text-accent-600",
    smilesetInProgress: "bg-brand-50 text-brand-700",
    approvalRequired: "bg-amber-50 text-amber-700",
    processing: "bg-amber-50 text-amber-700",
    inTreatment: "bg-navy-50 text-navy-700",
    completed: "bg-emerald-50 text-emerald-700",
    ready: "bg-emerald-50 text-emerald-700",
};

export default function StatusBadge({ status }) {
    const { t } = useTranslation();

    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status] ?? STYLES.draft}`}
        >
            {t(`common.status.${status}`)}
        </span>
    );
}
