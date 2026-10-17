import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import {
  labTestToPayload,
  defaultLabTest,
  errorLabTest,
  type LabTest,
} from "../../../interfaces/LabTest";
import ConfirmModal from "../../../components/ConfirmModoal";
import LabTestForm from "../../../components/LabTestForm";

function LabTestAdd() {
  const [item, setItem] = useState<LabTest>({ ...defaultLabTest });
  const [error, setError] = useState(errorLabTest);
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
    setItem({ ...defaultLabTest });
    setError(errorLabTest);
  };

  // modal-er "Add Lab Test" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("lab-tests", labTestToPayload(item))
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
          setMessage({ type: "danger", text: "Failed to add lab test" });
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
              <h1 className="fs-3 mb-1">Add Lab Test</h1>
              <p className="mb-0">Add a test to the lab catalogue</p>
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
                submitText="Add Lab Test"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Lab Test"
        confirmText="Add Lab Test"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this lab test?
      </ConfirmModal>
    </>
  );
}

export default LabTestAdd;
