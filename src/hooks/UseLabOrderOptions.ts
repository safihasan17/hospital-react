import { useEffect, useState } from "react";
import { api } from "../api";
import type { LabOrderOptions } from "../interfaces/LabOrder";

const emptyOptions: LabOrderOptions = { patients: [], doctors: [], labTests: [] };

// Lab order form-er dropdown (patient, doctor, lab test) ek call-e ane
export function useLabOrderOptions() {
  const [options, setOptions] = useState<LabOrderOptions>(emptyOptions);

  useEffect(() => {
    api
      .get("lab-test-orders/options")
      .then(function (res) {
        setOptions({
          patients: res.data.patients ?? [],
          doctors: res.data.doctors ?? [],
          labTests: res.data.labTests ?? [],
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return options;
}
