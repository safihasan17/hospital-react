import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  appointmentToPayload,
  defaultAppointment,
  errorAppointment,
  formatTime,
  type Appointment,
} from "../../../interfaces/Appointment";
import { useAppointmentOptions } from "../../../hooks/UseAppointmentOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import AppointmentForm from "../../../components/AppointmentForm";

function AppointmentEdit() {
  const { id } = useParams();
  const { patients, doctors } = useAppointmentOptions();
  const [appointment, setAppointment] = useState<Appointment>({
    ...defaultAppointment,
  });
  const [error, setError] = useState(errorAppointment);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`appointments/${id}`)
      .then(function (res) {
        const a = res.data.appointment;
        // DB-r null value gulo form-er jonno "" kore nei, time "09:30:00" -> "09:30"
        setAppointment({
          ...defaultAppointment,
          ...a,
          appointment_time: formatTime(a.appointment_time),
          reason: a.reason ?? "",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // modal-er "Update" button e click korle asol API call hobe.
  // File nei, tai shoja PUT.
  const confirmUpdate = () => {
    api
      .put(`appointments/${id}`, appointmentToPayload(appointment))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorAppointment);
          navigate("/appointments");
        }
      })
      .catch(function (err) {
        console.log(err.response?.data);
        if (err.response?.status === 422) {
          setError(err.response.data.errors);
        }
      })
      .finally(function () {
        setShowConfirm(false);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Appointment</h1>
              <p className="mb-0">Update this appointment</p>
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
                submitText="Save changes"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Update Appointment"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update the appointment of{" "}
        <strong>{appointment.patient?.name ?? "this patient"}</strong>?
      </ConfirmModal>
    </>
  );
}

export default AppointmentEdit;
