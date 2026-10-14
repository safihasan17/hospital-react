import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  defaultPatient,
  errorPatient,
  type Patient,
} from "../../../interfaces/Patient";
import ConfirmModal from "../../../components/ConfirmModoal";
import PatientForm from "../../../components/Patientform";

function PatientEdit() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>({ ...defaultPatient });
  const [error, setError] = useState(errorPatient);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`patients/${id}`)
      .then(function (res) {
        const p = res.data.patient;
        setPatient({
          ...defaultPatient,
          ...p,
          // date input-e shudhu YYYY-MM-DD dekhay
          dob: p.dob ? String(p.dob).slice(0, 10) : "",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  // form submit hole shudhu modal khulbe
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // modal-er "Update" button e click korle asol API call hobe
  const confirmUpdate = () => {
    api
      .put(`patients/${id}`, patient)
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false); // alert-er age modal bondho
          // alert(res.data.message);
          setError(errorPatient);
          navigate("/patients");
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
              <h1 className="fs-3 mb-1">Edit Patient</h1>
              <p className="mb-0">Update this patient</p>
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
                submitText="Save changes"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Update Patient"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update <strong>{patient.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default PatientEdit;