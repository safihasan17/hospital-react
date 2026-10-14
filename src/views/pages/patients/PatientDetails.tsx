import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import { defaultPatient, type Patient } from "../../../interfaces/Patient";

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>({ ...defaultPatient });

  useEffect(() => {
    api
      .get(`patients/${id}`)
      .then(function (res) {
        setPatient(res.data.patient);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value: string }[] = [
    { label: "Name", value: patient.name },
    { label: "Gender", value: patient.gender },
    { label: "Blood", value: patient.blood_group },
    { label: "Date of birth", value: patient.dob?.slice(0, 10) },
    { label: "Phone", value: patient.phone },
    { label: "Guardian", value: patient.guardian_name },
    { label: "Emergency contact", value: patient.emergency_contact },
    { label: "Address", value: patient.address },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Patient</h1>
              <p className="mb-0">Patient details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-patient/${id}`}
                className="btn btn-outline-primary"
              >
                <i className="bi bi-pencil"></i> Edit
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer"></i> Print
              </button>
              <Link to="/patients" className="btn btn-primary">
                Go to Patients List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                {fields.map((f) => (
                  <div className="col-md-6 mb-4" key={f.label}>
                    <div className="text-muted small mb-1">{f.label}</div>
                    <div className="fw-medium">{f.value || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDetails;