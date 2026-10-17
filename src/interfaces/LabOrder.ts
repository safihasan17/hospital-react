import { todayLocal } from "../utils/format";

export const labOrderStatuses = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
] as const;

export type LabOrderStatus = (typeof labOrderStatuses)[number];

export interface LabOrder {
  id: number;
  patient_id: number | "";
  doctor_id: number | "";
  test_id: number | ""; // Edit-e ekta test
  status: LabOrderStatus;
  result: string;
  order_date: string;
  prescription_id?: number | null;

  // Add-e ek shathe onek test (ekta test-e ekta order toiri hoy)
  lab_tests: { test_id: number | "" }[];

  // index/show API theke relation hishebe ashe
  patient?: { id: number; name: string; phone?: string | null };
  doctor?: {
    id: number;
    user?: { id: number; name: string; email?: string; phone?: string };
    department?: { id: number; name: string } | null;
  };
  test?: { id: number; test_name: string; price?: string | number };
}

export function emptyLabOrder(): LabOrder {
  return {
    id: 0,
    patient_id: "",
    doctor_id: "",
    test_id: "",
    status: "Pending",
    result: "",
    order_date: todayLocal(),
    lab_tests: [{ test_id: "" }],
  };
}

export type LabOrderError = Record<string, string[] | undefined>;
export const errorLabOrder: LabOrderError = {};

// POST lab-test-orders (onek test)
export function labOrderToCreatePayload(o: LabOrder) {
  return {
    patient_id: o.patient_id,
    doctor_id: o.doctor_id,
    status: o.status,
    result: o.result || null,
    order_date: o.order_date,
    lab_tests: o.lab_tests,
  };
}

// PUT lab-test-orders/{id} (ekta test)
export function labOrderToUpdatePayload(o: LabOrder) {
  return {
    patient_id: o.patient_id,
    doctor_id: o.doctor_id,
    test_id: o.test_id,
    status: o.status,
    result: o.result || null,
    order_date: o.order_date,
  };
}

export function labStatusBadgeClass(status: string) {
  switch (status) {
    case "Completed":
      return "bg-success";
    case "Cancelled":
      return "bg-danger";
    case "In Progress":
      return "bg-info text-dark";
    default:
      return "bg-warning text-dark";
  }
}

// GET lab-test-orders/options
export interface LabOrderOptions {
  patients: { id: number; name: string; phone?: string | null }[];
  doctors: {
    id: number;
    user?: { id: number; name: string };
    department?: { id: number; name: string } | null;
  }[];
  labTests: { id: number; test_name: string; price?: string | number }[];
}
