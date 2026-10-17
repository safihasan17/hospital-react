import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../../api";
import {
  admissionStatusBadgeClass,
  emptyAdmission,
  type Admission,
} from "../../../../interfaces/Admission";
import { formatDateTime } from "../../../../utils/format";

function AdmissionDetails() {
  const { id } = useParams();
  const [admission, setAdmission] = useState<Admission>(emptyAdmission());

  useEffect(() => {
    api
      .get(`admissions/${id}`)
      .then(function (res) {
        setAdmission(res.data.admission);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Patient", value: admission.patient?.name },
    { label: "Patient phone", value: admission.patient?.phone },
    { label: "Doctor", value: admission.doctor?.user?.name },
    { label: "Department", value: admission.doctor?.department?.name },
    {
      label: "Ward / bed",
      value: admission.ward
        ? `${admission.ward.name} / ${admission.bed?.bed_number ?? "—"}`
        : "",
    },
    { label: "Admitted", value: formatDateTime(admission.admission_date) },
    { label: "Discharged", value: formatDateTime(admission.discharge_date) },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Admission</h1>
              <p className="mb-0">Admission details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-admission/${id}`}
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
              <Link to="/admissions" className="btn btn-primary">
                Go to Admissions List
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
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Status</div>
                  <div className="fw-medium">
                    {admission.id ? (
                      <span
                        className={`badge ${admissionStatusBadgeClass(admission.status)}`}
                      >
                        {admission.status}
                      </span>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdmissionDetails;
