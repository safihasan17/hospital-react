export interface Patient {
  id: number;
  name: string;
  dob: string;
  gender: string;
  blood_group: string;
  phone: string;
  emergency_contact: string;
  guardian_name: string;
  address: string;
}

export const defaultPatient: Patient = {
  id: 0,
  name: "",
  dob: "",
  gender: "",
  blood_group: "",
  phone: "",
  emergency_contact: "",
  guardian_name: "",
  address: "",
};

// backend-er 422 validation error, jemon { name: ["The name field is required."] }
export type PatientError = Partial<Record<keyof Patient, string[]>>;

export const errorPatient: PatientError = {};