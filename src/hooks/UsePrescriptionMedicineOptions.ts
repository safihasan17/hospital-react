import { useEffect, useState } from "react";
import { api } from "../api";
import type { Prescription } from "../interfaces/Prescription";
import type { Medicine } from "../interfaces/Medicine";

// Prescription medicine form/filter-er dropdown: prescription ar medicine list
export function usePrescriptionMedicineOptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    api
      .get("prescriptions")
      .then(function (res) {
        setPrescriptions(res.data.prescriptions ?? []);
      })
      .catch(function (err) {
        console.log(err);
      });

    api
      .get("medicines")
      .then(function (res) {
        setMedicines(res.data.medicines ?? []);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return { prescriptions, medicines };
}
