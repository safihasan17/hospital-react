import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import {
  defaultAppointment,
  formatTime,
  statusBadgeClass,
  type Appointment,
} from "../../../interfaces/Appointment";

function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<Appointment>({
    ...defaultAppointment,
  });

  useEffect(() => {
    api
      .get(`appointments/${id}`)
      .then(function (res) {
        setAppointment(res.data.appointment);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Date", value: appointment.appointment_date },
    { label: "Time", value: formatTime(appointment.appointment_time) },
    { label: "Patient", value: appointment.patient?.name },
    { label: "Patient phone", value: appointment.patient?.phone },
    { label: "Doctor", value: appointment.doctor?.user?.name },
    { label: "Department", value: appointment.doctor?.department?.name },
    { label: "Reason", value: appointment.reason },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Appointment</h1>
              <p className="mb-0">Appointment details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-appointment/${id}`}
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
              <Link to="/appointments" className="btn btn-primary">
                Go to Appointments List
              </Link>
               <Link
                to="/add-prescription"
                state={{ appointment }}
                className="btn btn-primary"
              >
                Prescription
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
                    {appointment.id ? (
                      <span
                        className={`badge ${statusBadgeClass(appointment.status)}`}
                      >
                        {appointment.status}
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

export default AppointmentDetails;