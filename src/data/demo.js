// Demo data used to showcase the UI until the backend is wired up

export const patients = [
    { id: "P-001", name: "Sara El Amrani", age: 27, gender: "female", email: "sara.elamrani@mail.com", phone: "+212 6 12 34 56 78", cases: 2, lastVisit: "2026-09-24", status: "inTreatment" },
    { id: "P-002", name: "Youssef Benali", age: 34, gender: "male", email: "y.benali@mail.com", phone: "+212 6 98 76 54 32", cases: 1, lastVisit: "2026-09-18", status: "inTreatment" },
    { id: "P-003", name: "Imane Tazi", age: 16, gender: "female", email: "imane.tazi@mail.com", phone: "+212 6 55 44 33 22", cases: 1, lastVisit: "2026-09-12", status: "new" },
    { id: "P-004", name: "Karim Alaoui", age: 42, gender: "male", email: "karim.alaoui@mail.com", phone: "+212 6 11 22 33 44", cases: 3, lastVisit: "2026-08-30", status: "completed" },
    { id: "P-005", name: "Nadia Chraibi", age: 29, gender: "female", email: "n.chraibi@mail.com", phone: "+212 6 77 88 99 00", cases: 1, lastVisit: "2026-08-21", status: "inTreatment" },
    { id: "P-006", name: "Omar Idrissi", age: 22, gender: "male", email: "omar.idrissi@mail.com", phone: "+212 6 23 45 67 89", cases: 1, lastVisit: "2026-08-10", status: "new" },
    { id: "P-007", name: "Leila Berrada", age: 51, gender: "female", email: "leila.berrada@mail.com", phone: "+212 6 34 56 78 90", cases: 2, lastVisit: "2026-07-28", status: "completed" },
];

export const cases = [
    { id: "SL-1031", patient: "Sara El Amrani", type: "aligners", arches: "both", status: "inTreatment", step: 12, totalSteps: 24, updated: "2026-09-24" },
    { id: "SL-1030", patient: "Youssef Benali", type: "aligners", arches: "both", status: "approvalRequired", step: 0, totalSteps: 18, updated: "2026-09-22" },
    { id: "SL-1029", patient: "Imane Tazi", type: "aligners", arches: "upper", status: "smilesetInProgress", step: 0, totalSteps: 0, updated: "2026-09-20" },
    { id: "SL-1028", patient: "Karim Alaoui", type: "retainer", arches: "both", status: "completed", step: 1, totalSteps: 1, updated: "2026-09-15" },
    { id: "SL-1027", patient: "Nadia Chraibi", type: "aligners", arches: "lower", status: "inTreatment", step: 20, totalSteps: 22, updated: "2026-09-11" },
    { id: "SL-1026", patient: "Omar Idrissi", type: "aligners", arches: "both", status: "submitted", step: 0, totalSteps: 0, updated: "2026-09-08" },
    { id: "SL-1025", patient: "Leila Berrada", type: "aligners", arches: "both", status: "completed", step: 30, totalSteps: 30, updated: "2026-08-29" },
    { id: "SL-1024", patient: "Sara El Amrani", type: "retainer", arches: "upper", status: "submitted", step: 0, totalSteps: 1, updated: "2026-08-19" },
];

export const aiCases = [
    { id: "AI-208", patient: "Sara El Amrani", date: "2026-09-25", status: "ready" },
    { id: "AI-207", patient: "Omar Idrissi", date: "2026-09-23", status: "processing" },
    { id: "AI-206", patient: "Imane Tazi", date: "2026-09-19", status: "ready" },
    { id: "AI-205", patient: "Youssef Benali", date: "2026-09-14", status: "ready" },
    { id: "AI-204", patient: "Nadia Chraibi", date: "2026-09-02", status: "ready" },
    { id: "AI-203", patient: "Leila Berrada", date: "2026-08-27", status: "ready" },
];

export const incompleteSubmissions = [
    { id: "D-015", patient: "Hamza Kettani", created: "2026-09-26", lastEdited: "2026-09-27", completion: 75, missing: ["scans"] },
    { id: "D-014", patient: "Salma Bennani", created: "2026-09-20", lastEdited: "2026-09-21", completion: 50, missing: ["photos", "xray"] },
    { id: "D-013", patient: "Mehdi Fassi", created: "2026-09-09", lastEdited: "2026-09-10", completion: 25, missing: ["prescription", "photos", "scans"] },
];

export function formatDate(value, locale) {
    return new Date(value).toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function initials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}
