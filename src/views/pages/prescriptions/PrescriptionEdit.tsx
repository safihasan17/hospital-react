import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  emptyPrescription,
  errorPrescription,
  prescriptionToPayload,
  type Prescription,
} from "../../../interfaces/Prescription";
import { usePrescriptionOptions } from "../../../hooks/UsePrescriptionOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import PrescriptionForm from "../../../components/PrescriptionForm";

function PrescriptionEdit() {
  const { id } = useParams();
  const options = usePrescriptionOptions();
  const [prescription, setPrescription] = useState<Prescription>(
    emptyPrescription(),
  );
  const [error, setError] = useState(errorPrescription);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`prescriptions/${id}`)
      .then(function (res) {
        const p = res.data.prescription;
        // DB-r null value gulo form-er jonno "" kore nei.
        // Medicine/lab test row gulo relation theke form-er row-te convert hoy.
        // Lab test-e shudhu Pending gulo edit hoy (backend-o shudhu Pending replace kore).
        setPrescription({
          ...emptyPrescription(),
          ...p,
          appointment_id: p.appointment_id ?? "",
          notes: p.notes ?? "",
          medicines: (p.prescription_medicines ?? []).map(
            (r: {
              medicine_id: number;
              dosage: string | null;
              duration: string | null;
              instructions: string | null;
            }) => ({
              medicine_id: r.medicine_id,
              dosage: r.dosage ?? "",
              duration: r.duration ?? "",
              instructions: r.instructions ?? "",
            }),
          ),
          lab_tests: (p.lab_test_orders ?? [])
            .filter((o: { status: string }) => o.status === "Pending")
            .map((o: { test_id: number }) => ({ test_id: o.test_id })),
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

  // modal-er "Update" button e click korle asol API call hobe.
  // File nei, tai shoja PUT.
  const confirmUpdate = () => {
    api
      .put(`prescriptions/${id}`, prescriptionToPayload(prescription))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorPrescription);
          navigate("/prescriptions");
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
              <h1 className="fs-3 mb-1">Edit Prescription</h1>
              <p className="mb-0">Update this prescription</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/prescriptions" className="btn btn-primary">
                Go to Prescriptions List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <PrescriptionForm
                data={prescription}
                setData={setPrescription}
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
        title="Update Prescription"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update the prescription of{" "}
        <strong>{prescription.patient?.name ?? "this patient"}</strong>?
      </ConfirmModal>
    </>
  );
}

export default PrescriptionEdit;
