export const appointmentStatuses = [
  "Scheduled",
  "Checked-in",
  "Waiting",
  "Completed",
  "Cancelled",
] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];

export interface Appointment {
  id: number;
  patient_id: number | "";
  doctor_id: number | "";
  appointment_date: string; // "2026-10-15"
  appointment_time: string; // form-e "09:30", server theke "09:30:00" ashe
  status: AppointmentStatus;
  reason: string;

  // index/show API theke relation hishebe ashe
  patient?: { id: number; name: string; phone?: string | null };
  doctor?: {
    id: number;
    user?: { id: number; name: string; email?: string; phone?: string };
    department?: { id: number; name: string } | null;
  };
}

export const defaultAppointment: Appointment = {
  id: 0,
  patient_id: "",
  doctor_id: "",
  appointment_date: "",
  appointment_time: "",
  status: "Scheduled", // DB default-er shathe mil
  reason: "",
};

// backend-er 422 validation error, jemon { patient_id: ["The patient id field is required."] }
export type AppointmentError = Partial<Record<keyof Appointment, string[]>>;

export const errorAppointment: AppointmentError = {};

// "09:30:00" -> "09:30"
export function formatTime(time?: string | null) {
  return time ? time.slice(0, 5) : "";
}

// Status onujayi bootstrap badge-er color
export function statusBadgeClass(status: string) {
  switch (status) {
    case "Completed":
      return "bg-success";
    case "Cancelled":
      return "bg-danger";
    case "Waiting":
      return "bg-warning text-dark";
    case "Checked-in":
      return "bg-info text-dark";
    default:
      return "bg-primary";
  }
}

// File nei, tai FormData na, shadharon JSON pathabo.
export function appointmentToPayload(a: Appointment) {
  return {
    patient_id: a.patient_id,
    doctor_id: a.doctor_id,
    appointment_date: a.appointment_date,
    appointment_time: formatTime(a.appointment_time),
    status: a.status,
    reason: a.reason,
  };
}
