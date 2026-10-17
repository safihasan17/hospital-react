import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
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

function PrescriptionMedicineEdit() {
  const { id } = useParams();
  const { prescriptions, medicines } = usePrescriptionMedicineOptions();
  const [item, setItem] = useState<PrescriptionMedicine>({ ...defaultPrescriptionMedicine });
  const [error, setError] = useState(errorPrescriptionMedicine);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`prescription-medicines/${id}`)
      .then(function (res) {
        const x = res.data.prescriptionMedicine;
        // DB-r null value gulo form-er jonno "" kore nei
        setItem({
          ...defaultPrescriptionMedicine,
          ...x,
          dosage: x.dosage ?? "",
          duration: x.duration ?? "",
          instructions: x.instructions ?? "",
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
      .put(`prescription-medicines/${id}`, prescriptionMedicineToPayload(item))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorPrescriptionMedicine);
          navigate("/prescription-medicines");
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
              <h1 className="fs-3 mb-1">Edit Prescription Medicine</h1>
              <p className="mb-0">Update this prescription medicine</p>
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
                submitText="Save changes"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Update Prescription Medicine"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update this prescription medicine?
      </ConfirmModal>
    </>
  );
}

export default PrescriptionMedicineEdit;
