import { useEffect, useState } from "react";
import { api } from "../api";
import {
  emptyAdmissionOptions,
  type AdmissionOptions,
} from "../interfaces/Admission";

// Admission form-er dropdown (patient, doctor, ward, bed).
// params: { prescription_id } Add-e, { admission_id } Edit-e (ager bed-o list-e thakbe).
// prescription already admission-e thakle conflictAdmissionId set hoy.
export function useAdmissionOptions(params: Record<string, string | undefined> = {}) {
  const [options, setOptions] = useState<AdmissionOptions>(emptyAdmissionOptions);
  const [conflictAdmissionId, setConflictAdmissionId] = useState<number | null>(null);
  const key = JSON.stringify(params);

  useEffect(() => {
    api
      .get("admissions/options", { params: JSON.parse(key) })
      .then(function (res) {
        setOptions({
          patients: res.data.patients ?? [],
          doctors: res.data.doctors ?? [],
          wards: res.data.wards ?? [],
          beds: res.data.beds ?? [],
          prescription: res.data.prescription ?? null,
        });
      })
      .catch(function (err) {
        console.log(err);
        if (err.response?.status === 409) {
          setConflictAdmissionId(err.response.data.admission_id ?? null);
        }
      });
  }, [key]);

  return { options, conflictAdmissionId };
}
