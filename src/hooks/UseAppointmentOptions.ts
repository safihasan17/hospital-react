import { useEffect, useState } from "react";
import { api } from "../api";
import type { Patient } from "../interfaces/Patient";
import type { Doctor } from "../interfaces/Doctor";

// Appointment form-er dropdown-er jonno patient ar doctor list ane
export function useAppointmentOptions() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    api
      .get("patients")
      .then(function (res) {
        setPatients(res.data.patients);
      })
      .catch(function (err) {
        console.log(err);
      });

    api
      .get("doctors")
      .then(function (res) {
        setDoctors(res.data.doctors);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return { patients, doctors };
}
