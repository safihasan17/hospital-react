import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import {
  appointmentToPayload,
  defaultAppointment,
  errorAppointment,
  type Appointment,
} from "../../../interfaces/Appointment";
import { useAppointmentOptions } from "../../../hooks/UseAppointmentOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import AppointmentForm from "../../../components/AppointmentForm";

function AppointmentAdd() {
  const { patients, doctors } = useAppointmentOptions();
  const [appointment, setAppointment] = useState<Appointment>({
    ...defaultAppointment,
  });
  const [error, setError] = useState(errorAppointment);
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
    setAppointment({ ...defaultAppointment });
    setError(errorAppointment);
  };

  // modal-er "Add Appointment" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("appointments", appointmentToPayload(appointment))
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
          setMessage({ type: "danger", text: "Failed to add appointment" });
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
              <h1 className="fs-3 mb-1">Add Appointment</h1>
              <p className="mb-0">Create a new appointment record</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/appointments" className="btn btn-primary">
                Go to Appointments List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <AppointmentForm
                data={appointment}
                setData={setAppointment}
                patients={patients}
                doctors={doctors}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Appointment"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Appointment"
        confirmText="Add Appointment"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this appointment?
      </ConfirmModal>
    </>
  );
}

export default AppointmentAdd;
