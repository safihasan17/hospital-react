import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import {
  labOrderToCreatePayload,
  emptyLabOrder,
  errorLabOrder,
  type LabOrder,
} from "../../../interfaces/LabOrder";
import { useLabOrderOptions } from "../../../hooks/UseLabOrderOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import LabOrderForm from "../../../components/LabOrderForm";

function LabOrderAdd() {
  const options = useLabOrderOptions();
  const [item, setItem] = useState<LabOrder>(emptyLabOrder());
  const [error, setError] = useState(errorLabOrder);
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
    setItem(emptyLabOrder());
    setError(errorLabOrder);
  };

  // modal-er "Add Lab Order" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("lab-test-orders", labOrderToCreatePayload(item))
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
          setMessage({ type: "danger", text: "Failed to add lab order" });
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
              <h1 className="fs-3 mb-1">Add Lab Order</h1>
              <p className="mb-0">Order one or more lab tests for a patient</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/lab-orders" className="btn btn-primary">
                Go to Lab Orders List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <LabOrderForm
                data={item}
                setData={setItem}
                options={options}
                mode="add"
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Lab Order"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Lab Order"
        confirmText="Add Lab Order"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this lab order?
      </ConfirmModal>
    </>
  );
}

export default LabOrderAdd;
