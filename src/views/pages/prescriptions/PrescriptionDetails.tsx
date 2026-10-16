import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  emptyPrescription,
  type Prescription,
} from "../../../interfaces/Prescription";

// Interface-e jei field gulo nei (specialization, address, symptoms etc.)
// segulo optional hishebe porar jonno loose type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = any;

const dash = (v?: string | null) => (v && String(v).trim() ? v : "—");

function formatDateTime(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", { hour12: false });
  return `${date} ${time}`;
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PrescriptionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState<Prescription>(
    emptyPrescription(),
  );
  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  useEffect(() => {
    api
      .get(`prescriptions/${id}`)
      .then(function (res) {
        setPrescription(res.data.prescription);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const handleGenerateInvoice = () => {
    api
      .post(`prescriptions/${id}/generate-invoice`)
      .then(function (res) {
        navigate(`/invoice-details/${res.data.invoice_id}`);
      })
      .catch(function (err) {
        console.log(err.response?.data);
        setMessage({
          type: "danger",
          text: err.response?.data?.message ?? "Failed to generate invoice",
        });
      });
  };

  const p = prescription as Loose;
  const doctor = p.doctor ?? {};
  const patient = p.patient ?? {};
  const appointment = p.appointment ?? null;
  const medicines: Loose[] = p.prescription_medicines ?? [];
  const labOrders: Loose[] = p.lab_test_orders ?? [];

  const refNo = `RX-${String(p.id ?? id ?? "").padStart(4, "0")}`;
  const doctorName = doctor.user?.name ?? "—";
  const specialization =
    doctor.specialization ?? doctor.specialty ?? doctor.department?.name;
  const qualification = doctor.qualification ?? doctor.degree;
  const doctorEmail = doctor.user?.email ?? doctor.email;

  const appointmentText = appointment
    ? `#${appointment.id}${
        appointment.appointment_date
          ? ` — ${formatDate(appointment.appointment_date)}`
          : ""
      }`
    : p.appointment_id
      ? `#${p.appointment_id}`
      : "—";

  const nextAppointment = p.next_appointment_date ?? p.next_appointment;

  const labelStyle = { color: "#6c757d" } as const;

  return (
    <>
      {message && (
        <div
          className={`alert alert-${message.type} alert-dismissible no-print`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      <div className="d-flex flex-wrap justify-content-end gap-2 mb-3 no-print">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleGenerateInvoice}
        >
          <i className="bi bi-receipt"></i> Generate invoice
        </button>
        <Link
          to={`/edit-prescription/${id}`}
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
        <Link to="/prescriptions" className="btn btn-primary">
          Go to Prescriptions List
        </Link>
      </div>

      <div
        className="bg-white mx-auto p-4 position-relative"
        style={{ maxWidth: "800px", minHeight: "900px" }}
      >
        {/* Header: Rx + doctor info */}
        <div className="d-flex justify-content-between align-items-start pb-3 border-bottom border-dark">
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              color: "#2c3e50",
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: "4.5rem" }}>R</span>
            <span style={{ fontSize: "2.5rem" }}>x</span>
          </div>
          <div className="text-end">
            <div className="fw-bold fs-5" style={{ color: "#2c3e50" }}>
              {doctorName}
            </div>
            {qualification && <div>{qualification}</div>}
            {specialization && <div>{specialization}</div>}
            {doctorEmail && (
              <div className="small text-muted">Email: {doctorEmail}</div>
            )}
          </div>
        </div>

        {/* Patient + ref info */}
        <div className="row g-3 py-3">
          <div className="col-7">
            <div style={labelStyle}>Patient Details</div>
            <div className="fw-semibold">{patient.name ?? "—"}</div>
            {patient.gender && (
              <div className="fw-semibold text-capitalize">
                {patient.gender}
              </div>
            )}
            {patient.address && (
              <div>
                <span style={labelStyle}>Address: </span>
                {patient.address}
              </div>
            )}
            {(patient.phone ?? patient.user?.phone) && (
              <div>
                <span style={labelStyle}>Ph No.: </span>
                {patient.phone ?? patient.user?.phone}
              </div>
            )}

            <div className="mt-3" style={labelStyle}>
              Symptoms(HOPI):
            </div>
            <div className="mb-2">{dash(p.symptoms)}</div>

            <div style={labelStyle}>Provisional Diagnosis:</div>
            <div>{dash(p.diagnosis ?? p.notes)}</div>
          </div>

          <div className="col-5">
            <div>
              <span style={labelStyle}>Ref no: </span>
              <strong>{refNo}</strong>
            </div>
            <div>
              <span style={labelStyle}>Date &amp; Time: </span>
              <strong>
                {formatDateTime(p.created_at ?? p.prescription_date)}
              </strong>
            </div>
            <div>
              <span style={labelStyle}>Appointment: </span>
              <strong>{appointmentText}</strong>
            </div>
            {p.admission_advised ? (
              <div className="mt-2">
                <span className="badge bg-warning text-dark">
                  Admission advised
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Lab tests | Medicines */}
        <div className="border-top border-bottom border-dark">
          <div className="row g-0">
            <div className="col-4 text-center py-2 small text-uppercase">
              Lab Tests
            </div>
            <div className="col-8 text-center py-2 small text-uppercase">
              Medicines
            </div>
          </div>
        </div>

        <div className="row g-0" style={{ minHeight: "340px" }}>
          <div className="col-4 border-end border-dark py-3 pe-2">
            {labOrders.length === 0 ? (
              <div className="text-muted small">No lab tests.</div>
            ) : (
              labOrders.map((o, i) => (
                <div key={o.id ?? i}>
                  {i + 1}. {o.test?.test_name ?? `Test #${o.test_id}`}
                </div>
              ))
            )}
          </div>

          <div className="col-8 py-3 ps-3">
            {medicines.length === 0 ? (
              <div className="text-muted small">No medicines.</div>
            ) : (
              medicines.map((m, i) => (
                <div className="d-flex mb-3" key={m.id ?? i}>
                  <div style={{ width: "28px" }}>{i + 1}.</div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">
                      {m.medicine?.name ?? `Medicine #${m.medicine_id}`}
                    </div>
                    <div style={labelStyle}>
                      {m.medicine?.generic_name ?? m.medicine?.generic?.name ?? "—"}
                    </div>
                  </div>
                  <div
                    className="small"
                    style={{ width: "40%", minWidth: "120px" }}
                  >
                    <div>{dash(m.dosage)}</div>
                    <div>{dash(m.duration)}</div>
                    <div>{dash(m.instructions)}</div>
                  </div>
                </div>
              ))
            )}

            <div className="text-center small my-4">
              ***** <strong>Note:</strong> Substitution allowed wherever
              applicable. *****
            </div>

            <div style={labelStyle}>
              General Instructions:{" "}
              <span className="text-body">
                {p.general_instructions ?? ""}
              </span>
            </div>
            <div>
              <span style={labelStyle}>Next Appointment: </span>
              <strong>{formatDate(nextAppointment)}</strong>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="d-flex justify-content-end mt-4">
          <div
            className="text-end pt-1 fw-semibold border-top border-dark"
            style={{ minWidth: "200px" }}
          >
            {doctorName}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrescriptionDetails;