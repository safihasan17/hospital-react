import { api } from "../api";

export interface Doctor {
  id: number;
  user_id: number | "";
  department_id: number | "";
  specialization: string;
  qualification: string;
  consultation_fee: string | number;
  image: string | File | null; // server theke filename, notun upload-e File

  // index/show API theke relation hishebe ashe
  user?: { id: number; name: string; email: string; phone: string };
  department?: { id: number; name: string } | null;
}

export const defaultDoctor: Doctor = {
  id: 0,
  user_id: "",
  department_id: "",
  specialization: "",
  qualification: "",
  consultation_fee: "",
  image: null,
};

// backend-er 422 validation error, jemon { user_id: ["The user id field is required."] }
export type DoctorError = Partial<Record<keyof Doctor, string[]>>;

export const errorDoctor: DoctorError = {};

// image-er URL. Dhorechi file public/uploads/doctors/ e save hoy.
export function doctorImageUrl(name: string) {
  const base = String(api.defaults.baseURL ?? "").replace(/\/api\/?$/, "");
  return `${base}/uploads/doctors/${name}`;
}

// File upload-er jonno JSON na, FormData pathate hoy.
// Edit-e method="PUT" dile `_method=PUT` jure dey (Laravel PUT-e file pay na).
export function doctorToFormData(d: Doctor, method?: "PUT") {
  const fd = new FormData();
  fd.append("user_id", String(d.user_id ?? ""));
  fd.append("department_id", String(d.department_id ?? ""));
  fd.append("specialization", d.specialization ?? "");
  fd.append("qualification", d.qualification ?? "");
  fd.append("consultation_fee", String(d.consultation_fee ?? ""));
  if (d.image instanceof File) fd.append("image", d.image);
  if (method) fd.append("_method", method);
  return fd;
}