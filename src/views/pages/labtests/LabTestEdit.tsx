import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  labTestToPayload,
  defaultLabTest,
  errorLabTest,
  type LabTest,
} from "../../../interfaces/LabTest";
import ConfirmModal from "../../../components/ConfirmModoal";
import LabTestForm from "../../../components/LabTestForm";

function LabTestEdit() {
  const { id } = useParams();
  const [item, setItem] = useState<LabTest>({ ...defaultLabTest });
  const [error, setError] = useState(errorLabTest);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`lab-tests/${id}`)
      .then(function (res) {
        const x = res.data.labTest;
        // DB-r null value gulo form-er jonno "" kore nei
        setItem({ ...defaultLabTest, ...x });
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
      .put(`lab-tests/${id}`, labTestToPayload(item))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorLabTest);
          navigate("/lab-tests");
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
              <h1 className="fs-3 mb-1">Edit Lab Test</h1>
              <p className="mb-0">Update this lab test</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/lab-tests" className="btn btn-primary">
                Go to Lab Tests List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <LabTestForm
                data={item}
                setData={setItem}
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
        title="Update Lab Test"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update this lab test?
      </ConfirmModal>
    </>
  );
}

export default LabTestEdit;
