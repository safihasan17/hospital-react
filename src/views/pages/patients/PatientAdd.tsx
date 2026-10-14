import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import {
  defaultPatient,
  errorPatient,
  type Patient,
} from "../../../interfaces/Patient";
import ConfirmModal from "../../../components/ConfirmModoal";
import PatientForm from "../../../components/Patientform";

function PatientAdd() {
  const [patient, setPatient] = useState<Patient>({ ...defaultPatient });
  const [error, setError] = useState(errorPatient);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  // message 3 second pore nijei soriye jabe
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // form submit hole shudhu modal khulbe
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleClear = () => {
    setPatient({ ...defaultPatient });
    setError(errorPatient);
  };

  // modal-er "Add Patient" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("patients", patient)
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
          setMessage({ type: "danger", text: "Failed to add patient" });
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
              <h1 className="fs-3 mb-1">Add Patient</h1>
              <p className="mb-0">Create a new patient record</p>
            </div>
            <div className="d-flex gap-2">
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
              <PatientForm
                data={patient}
                setData={setPatient}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Patient"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Patient"
        confirmText="Add Patient"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add{" "}
        <strong>{patient.name || "this patient"}</strong>?
      </ConfirmModal>
    </>
  );
}

export default PatientAdd;