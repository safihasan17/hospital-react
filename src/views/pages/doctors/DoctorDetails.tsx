import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import {
  defaultDoctor,
  doctorImageUrl,
  type Doctor,
} from "../../../interfaces/Doctor";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor>({ ...defaultDoctor });

  useEffect(() => {
    api
      .get(`doctors/${id}`)
      .then(function (res) {
        setDoctor(res.data.doctor);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Doctor", value: doctor.user?.name },
    { label: "Email", value: doctor.user?.email },
    { label: "Phone", value: doctor.user?.phone },
    { label: "Department", value: doctor.department?.name },
    { label: "Specialization", value: doctor.specialization },
    { label: "Qualification", value: doctor.qualification },
    { label: "Fee", value: doctor.consultation_fee },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Doctor</h1>
              <p className="mb-0">Doctor details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-doctor/${id}`}
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
              <Link to="/doctors" className="btn btn-primary">
                Go to Doctors List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              {typeof doctor.image === "string" && doctor.image && (
                <img
                  src={doctorImageUrl(doctor.image)}
                  alt=""
                  className="rounded border mb-4"
                  style={{ height: 120 }}
                />
              )}
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

export default DoctorDetails;