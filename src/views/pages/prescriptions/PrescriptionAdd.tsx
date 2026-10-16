import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router";
import { api } from "../../../api";
import {
  emptyPrescription,
  errorPrescription,
  prescriptionToPayload,
  type Prescription,
} from "../../../interfaces/Prescription";
import { usePrescriptionOptions } from "../../../hooks/UsePrescriptionOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import PrescriptionForm from "../../../components/PrescriptionForm";

function PrescriptionAdd() {
  const options = usePrescriptionOptions();

  // Appointment Details theke ashle appointment ta ekhane thake
  const appointment = useLocation().state?.appointment;
  const locked = Boolean(appointment);

  const startPrescription = (): Prescription =>
    appointment
      ? {
          ...emptyPrescription(),
          appointment_id: appointment.id,
          patient_id: appointment.patient_id,
          doctor_id: appointment.doctor_id,
        }
      : emptyPrescription();

  const [prescription, setPrescription] =
    useState<Prescription>(startPrescription);
  const [error, setError] = useState(errorPrescription);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 1000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleClear = () => {
    setPrescription(startPrescription());
    setError(errorPrescription);
  };

  // modal-er "Add Prescription" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("prescriptions", prescriptionToPayload(prescription))
      .then(function (res) {
        if (res.data.success) {
          setMessage({ type: "success", text: res.data.success });
          handleClear();
        }
      })
      .catch(function (err) {
        console.log(err.response?.data);
        if (err.response?.status === 422) {
          setError(err.response.data.errors);
        } else {
          setMessage({ type: "danger", text: "Failed to add prescription" });
        }
      })
      .finally(function () {
        setShowConfirm(false);
      });
  };

  return (
    <>
      {message && (
        <div
          className={`alert alert-${message.type} alert-dismissible`}
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
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add Prescription</h1>
              <p className="mb-0">
                Write a new prescription with medicines and lab tests
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/prescriptions" className="btn btn-primary">
                Go to Prescriptions List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <PrescriptionForm
                data={prescription}
                setData={setPrescription}
                options={options}
                locked={locked}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Prescription"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Prescription"
        confirmText="Add Prescription"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this prescription?
      </ConfirmModal>
    </>
  );
}

export default PrescriptionAdd;