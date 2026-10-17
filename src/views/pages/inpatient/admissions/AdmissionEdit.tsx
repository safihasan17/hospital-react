import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../../api";
import {
  admissionToUpdatePayload,
  emptyAdmission,
  errorAdmission,
  type Admission,
} from "../../../../interfaces/Admission";
import { useAdmissionOptions } from "../../../../hooks/UseAdmissionOptions";
import { toInputDateTime } from "../../../../utils/format";
import ConfirmModal from "../../../../components/ConfirmModoal";
import AdmissionForm from "../../../../components/AdmissionForm";

function AdmissionEdit() {
  const { id } = useParams();
  // admission_id dile ager bed-o bed list-e thake
  const { options } = useAdmissionOptions({ admission_id: id });
  const [admission, setAdmission] = useState<Admission>(emptyAdmission());
  const [error, setError] = useState(errorAdmission);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`admissions/${id}`)
      .then(function (res) {
        const x = res.data.admission;
        // DB-r null value gulo form-er jonno "" kore nei, date -> datetime-local format
        setAdmission({
          ...emptyAdmission(),
          ...x,
          admission_date: toInputDateTime(x.admission_date),
          discharge_date: toInputDateTime(x.discharge_date),
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

  // modal-er "Update" button e click korle asol API call hobe
  const confirmUpdate = () => {
    api
      .put(`admissions/${id}`, admissionToUpdatePayload(admission))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorAdmission);
          navigate("/admissions");
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
              <h1 className="fs-3 mb-1">Edit Admission</h1>
              <p className="mb-0">Update this admission</p>
            </div>
            <div className="d-flex gap-2">
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
              <AdmissionForm
                data={admission}
                setData={setAdmission}
                options={options}
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
        title="Update Admission"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update the admission of{" "}
        <strong>{admission.patient?.name ?? "this patient"}</strong>?
      </ConfirmModal>
    </>
  );
}

export default AdmissionEdit;
