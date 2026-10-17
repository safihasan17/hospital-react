import { nowLocalInput } from "../utils/format";

export const admissionStatuses = ["Admitted", "Discharged", "Transferred"] as const;

export type AdmissionStatus = (typeof admissionStatuses)[number];

export interface Admission {
  id: number;
  prescription_id: number | ""; // shudhu Add-e (prescription theke admit)
  patient_id: number | "";
  doctor_id: number | "";
  ward_id: number | "";
  bed_id: number | "";
  admission_date: string; // datetime-local: "2026-10-17T09:30"
  discharge_date: string;
  status: AdmissionStatus;

  // index/show API theke relation hishebe ashe
  patient?: { id: number; name: string; phone?: string | null };
  doctor?: {
    id: number;
    user?: { id: number; name: string };
    department?: { id: number; name: string } | null;
  };
  ward?: { id: number; name: string } | null;
  bed?: { id: number; bed_number: string; status?: string } | null;
}

export function emptyAdmission(): Admission {
  return {
    id: 0,
    prescription_id: "",
    patient_id: "",
    doctor_id: "",
    ward_id: "",
    bed_id: "",
    admission_date: nowLocalInput(),
    discharge_date: "",
    status: "Admitted",
  };
}

export type AdmissionError = Record<string, string[] | undefined>;
export const errorAdmission: AdmissionError = {};

// GET admissions/options
export interface AdmissionOptions {
  patients: { id: number; name: string; phone?: string | null }[];
  doctors: {
    id: number;
    user?: { id: number; name: string };
    department?: { id: number; name: string } | null;
  }[];
  wards: { id: number; name: string }[];
  beds: {
    id: number;
    ward_id: number;
    bed_number: string;
    status: string;
    ward?: { id: number; name: string } | null;
  }[];
  prescription: { id: number; patient_id: number; doctor_id: number } | null;
}

export const emptyAdmissionOptions: AdmissionOptions = {
  patients: [],
  doctors: [],
  wards: [],
  beds: [],
  prescription: null,
};

export function admissionStatusBadgeClass(status: string) {
  switch (status) {
    case "Discharged":
      return "bg-success";
    case "Transferred":
      return "bg-info text-dark";
    default:
      return "bg-warning text-dark";
  }
}

// POST admissions
export function admissionToCreatePayload(a: Admission) {
  return {
    prescription_id: a.prescription_id === "" ? null : a.prescription_id,
    patient_id: a.patient_id,
    doctor_id: a.doctor_id,
    ward_id: a.ward_id,
    bed_id: a.bed_id,
    admission_date: a.admission_date,
    discharge_date: a.discharge_date || null,
    status: a.status,
  };
}

// PUT admissions/{id}
export function admissionToUpdatePayload(a: Admission) {
  return {
    patient_id: a.patient_id,
    doctor_id: a.doctor_id,
    ward_id: a.ward_id,
    bed_id: a.bed_id,
    admission_date: a.admission_date,
    discharge_date: a.discharge_date || null,
    status: a.status,
  };
}
