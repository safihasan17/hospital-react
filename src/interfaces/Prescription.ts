export interface PrescriptionMedicineRow {
  medicine_id: number | "";
  dosage: string;
  duration: string;
  instructions: string;
}

export interface PrescriptionLabTestRow {
  test_id: number | "";
}

export interface Prescription {
  id: number;
  patient_id: number | "";
  doctor_id: number | "";
  appointment_id: number | "";
  prescription_date: string; // "2026-10-16"
  notes: string;
  admission_advised: boolean;

  // form-er dynamic row gulo (backend-e `medicines` ar `lab_tests` hishebe jay)
  medicines: PrescriptionMedicineRow[];
  lab_tests: PrescriptionLabTestRow[];

  // index/show API theke relation hishebe ashe
  patient?: { id: number; name: string; phone?: string | null };
  doctor?: {
    id: number;
    user?: { id: number; name: string; email?: string; phone?: string };
    department?: { id: number; name: string } | null;
  };
  appointment?: { id: number; appointment_date: string } | null;
  prescription_medicines?: {
    id: number;
    medicine_id: number;
    dosage: string | null;
    duration: string | null;
    instructions: string | null;
    medicine?: { id: number; name: string };
  }[];
  lab_test_orders?: {
    id: number;
    test_id: number;
    status: string;
    test?: { id: number; test_name: string };
  }[];

  // index API-te withCount
  prescription_medicines_count?: number;
  lab_test_orders_count?: number;
}

// Dropdown option gulo (GET prescriptions/options)
export interface PrescriptionOptions {
  patients: { id: number; name: string; phone?: string | null }[];
  doctors: {
    id: number;
    user?: { id: number; name: string };
    department?: { id: number; name: string } | null;
  }[];
  appointments: {
    id: number;
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    patient?: { id: number; name: string };
  }[];
  medicines: { id: number; name: string }[];
  labTests: { id: number; test_name: string }[];
}

export const emptyMedicineRow: PrescriptionMedicineRow = {
  medicine_id: "",
  dosage: "",
  duration: "",
  instructions: "",
};

export const emptyLabTestRow: PrescriptionLabTestRow = { test_id: "" };

// Local date "YYYY-MM-DD" (toISOString UTC dhore, tai raat-e ager din dekhate pare)
function todayLocal() {
  return new Date().toLocaleDateString("en-CA");
}

// Add page-e aj-er date diye shuru hoy
export function emptyPrescription(): Prescription {
  return {
    id: 0,
    patient_id: "",
    doctor_id: "",
    appointment_id: "",
    prescription_date: todayLocal(),
    notes: "",
    admission_advised: false,
    medicines: [],
    lab_tests: [],
  };
}

// backend-er 422 validation error, jemon { patient_id: [...], "medicines.0.medicine_id": [...] }
export type PrescriptionError = Record<string, string[] | undefined>;

export const errorPrescription: PrescriptionError = {};

// File nei, tai FormData na, shadharon JSON pathabo.
export function prescriptionToPayload(p: Prescription) {
  return {
    patient_id: p.patient_id,
    doctor_id: p.doctor_id,
    appointment_id: p.appointment_id === "" ? null : p.appointment_id,
    prescription_date: p.prescription_date,
    notes: p.notes,
    admission_advised: p.admission_advised,
    medicines: p.medicines,
    lab_tests: p.lab_tests,
  };
}
