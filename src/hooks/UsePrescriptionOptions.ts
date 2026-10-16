import { useEffect, useState } from "react";
import { api } from "../api";
import type { PrescriptionOptions } from "../interfaces/Prescription";

const emptyOptions: PrescriptionOptions = {
  patients: [],
  doctors: [],
  appointments: [],
  medicines: [],
  labTests: [],
};

// Prescription form-er shob dropdown (patient, doctor, appointment, medicine, lab test) ek call-e ane
export function usePrescriptionOptions() {
  const [options, setOptions] = useState<PrescriptionOptions>(emptyOptions);

  useEffect(() => {
    api
      .get("prescriptions/options")
      .then(function (res) {
        setOptions({
          patients: res.data.patients,
          doctors: res.data.doctors,
          appointments: res.data.appointments,
          medicines: res.data.medicines,
          labTests: res.data.labTests,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return options;
}
