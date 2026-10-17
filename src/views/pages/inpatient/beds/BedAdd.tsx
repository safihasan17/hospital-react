import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../../api";
import {
  bedToPayload,
  defaultBed,
  errorBed,
  type Bed,
} from "../../../../interfaces/Bed";
import { useBedOptions } from "../../../../hooks/UseBedOptions";
import ConfirmModal from "../../../../components/ConfirmModoal";
import BedForm from "../../../../components/BedForm";

function BedAdd() {
  const { wards } = useBedOptions();
  const [item, setItem] = useState<Bed>({ ...defaultBed });
  const [error, setError] = useState(errorBed);
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
    setItem({ ...defaultBed });
    setError(errorBed);
  };

  // modal-er "Add Bed" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("beds", bedToPayload(item))
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
          setMessage({ type: "danger", text: "Failed to add bed" });
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
              <h1 className="fs-3 mb-1">Add Bed</h1>
              <p className="mb-0">Create a new bed record</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/beds" className="btn btn-primary">
                Go to Beds List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <BedForm
                data={item}
                setData={setItem}
                wards={wards}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Bed"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Bed"
        confirmText="Add Bed"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this bed?
      </ConfirmModal>
    </>
  );
}

export default BedAdd;
