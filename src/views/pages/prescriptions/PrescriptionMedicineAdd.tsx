import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { api } from "../../../api";
import {
  prescriptionMedicineToPayload,
  defaultPrescriptionMedicine,
  errorPrescriptionMedicine,
  type PrescriptionMedicine,
} from "../../../interfaces/PrescriptionMedicine";
import { usePrescriptionMedicineOptions } from "../../../hooks/UsePrescriptionMedicineOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import PrescriptionMedicineForm from "../../../components/PrescriptionMedicineForm";

function PrescriptionMedicineAdd() {
  // /add-prescription-medicine?prescription_id=5 dile oi prescription age thekei select thake
  const [params] = useSearchParams();
  const presetId = Number(params.get("prescription_id")) || "";
  const { prescriptions, medicines } = usePrescriptionMedicineOptions();
  const [item, setItem] = useState<PrescriptionMedicine>({
    ...defaultPrescriptionMedicine,
    prescription_id: presetId,
  });
  const [error, setError] = useState(errorPrescriptionMedicine);
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
    setItem({ ...defaultPrescriptionMedicine, prescription_id: presetId });
    setError(errorPrescriptionMedicine);
  };

  // modal-er "Add Prescription Medicine" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("prescription-medicines", prescriptionMedicineToPayload(item))
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
          setMessage({ type: "danger", text: "Failed to add prescription medicine" });
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
              <h1 className="fs-3 mb-1">Add Prescription Medicine</h1>
              <p className="mb-0">Add one medicine row to a prescription</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/prescription-medicines" className="btn btn-primary">
                Go to Prescription Medicines List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <PrescriptionMedicineForm
                data={item}
                setData={setItem}
                prescriptions={prescriptions}
                medicines={medicines}
                error={error}
                onSubmit={handleSubmit}
                submitText="Add Prescription Medicine"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Prescription Medicine"
        confirmText="Add Prescription Medicine"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this prescription medicine?
      </ConfirmModal>
    </>
  );
}

export default PrescriptionMedicineAdd;
