import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import {
  defaultDoctor,
  doctorToFormData,
  errorDoctor,
  type Doctor,
} from "../../../interfaces/Doctor";
import { useDoctorOptions } from "../../../hooks/UseDoctorOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import DoctorForm from "../../../components/DoctorForm";

function DoctorAdd() {
  const { users, departments } = useDoctorOptions();
  const [doctor, setDoctor] = useState<Doctor>({ ...defaultDoctor });
  const [error, setError] = useState(errorDoctor);
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
    setDoctor({ ...defaultDoctor });
    setError(errorDoctor);
  };

  // modal-er "Add Doctor" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("doctors", doctorToFormData(doctor))
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
          setMessage({ type: "danger", text: "Failed to add doctor" });
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
              <h1 className="fs-3 mb-1">Add Doctor</h1>
              <p className="mb-0">Create a new doctor record</p>
            </div>
            <div className="d-flex gap-2">
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
              <DoctorForm
                data={doctor}
                setData={setDoctor}
                users={users}
                departments={departments}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Doctor"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Doctor"
        confirmText="Add Doctor"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this doctor?
      </ConfirmModal>
    </>
  );
}

export default DoctorAdd;