import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../../../api";
import {
  wardToPayload,
  defaultWard,
  errorWard,
  type Ward,
} from "../../../../interfaces/Ward";
import { useWardOptions } from "../../../../hooks/UseWardOptions";
import ConfirmModal from "../../../../components/ConfirmModoal";
import WardForm from "../../../../components/WardForm";

function WardAdd() {
  const options = useWardOptions();
  const [item, setItem] = useState<Ward>({ ...defaultWard });
  const [error, setError] = useState(errorWard);
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
    setItem({ ...defaultWard });
    setError(errorWard);
  };

  // modal-er "Add Ward" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("wards", wardToPayload(item))
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
          setMessage({ type: "danger", text: "Failed to add ward" });
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
              <h1 className="fs-3 mb-1">Add Ward</h1>
              <p className="mb-0">Create a new ward record</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/wards" className="btn btn-primary">
                Go to Wards List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <WardForm
                data={item}
                setData={setItem}
                options={options}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Ward"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Ward"
        confirmText="Add Ward"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this ward?
      </ConfirmModal>
    </>
  );
}

export default WardAdd;
