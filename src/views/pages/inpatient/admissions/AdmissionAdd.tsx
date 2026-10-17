import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { api } from "../../../../api";
import {
  admissionToCreatePayload,
  emptyAdmission,
  errorAdmission,
  type Admission,
} from "../../../../interfaces/Admission";
import { useAdmissionOptions } from "../../../../hooks/UseAdmissionOptions";
import ConfirmModal from "../../../../components/ConfirmModoal";
import AdmissionForm from "../../../../components/AdmissionForm";
import { nowLocalInput } from "../../../../utils/format";

function AdmissionAdd() {
  // /add-admission?prescription_id=5 dile oi prescription-er patient/doctor age thekei select hoy
  const [params] = useSearchParams();
  const prescriptionId = params.get("prescription_id") ?? undefined;
  const navigate = useNavigate();

  const { options, conflictAdmissionId } = useAdmissionOptions({
    prescription_id: prescriptionId,
  });
  const [admission, setAdmission] = useState<Admission>(emptyAdmission());
  const [error, setError] = useState(errorAdmission);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  // prescription ache hole patient ar doctor auto-fill
  useEffect(() => {
    const p = options.prescription;
    if (p) {
      setAdmission((prev) => ({
        ...prev,
        prescription_id: p.id,
        patient_id: p.patient_id,
        doctor_id: p.doctor_id,
      }));
    }
  }, [options.prescription]);

  // admission date default = prescription-er date (ajker date na), shomoy ekhonkar
  const [rxDate, setRxDate] = useState("");
  useEffect(() => {
    if (!prescriptionId) return;
    api
      .get(`prescriptions/${prescriptionId}`)
      .then(function (res) {
        const date = String(res.data.prescription?.prescription_date ?? "").split("T")[0];
        if (!date) return;
        setRxDate(date);
        setAdmission((prev) => ({
          ...prev,
          admission_date: `${date}T${nowLocalInput().slice(11)}`,
        }));
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [prescriptionId]);

  // prescription-er already admission thakle oi admission-e niye jai
  useEffect(() => {
    if (conflictAdmissionId) {
      navigate(`/admission-details/${conflictAdmissionId}`);
    }
  }, [conflictAdmissionId, navigate]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), prescriptionId ? 3000 : 1000);
    return () => clearTimeout(timer);
  }, [message, prescriptionId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleClear = () => {
    const p = options.prescription;
    setAdmission({
      ...emptyAdmission(),
      ...(p
        ? { prescription_id: p.id, patient_id: p.patient_id, doctor_id: p.doctor_id }
        : {}),
      ...(rxDate
        ? { admission_date: `${rxDate}T${nowLocalInput().slice(11)}` }
        : {}),
    });
    setError(errorAdmission);
  };

  // modal-er "Add Admission" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("admissions", admissionToCreatePayload(admission))
      .then(function (res) {
        if (res.data.success) {
          setMessage({ type: "success", text: res.data.success });
          if (prescriptionId) {
            // prescription theke admit korle list-e fire jai (ekhane Admitted dekhabe)
            setTimeout(() => navigate("/prescriptions"), 800);
          } else {
            handleClear();
          }
        }
      })
      .catch(function (err) {
        console.log(err.response?.data);
        if (err.response?.status === 422) {
          setError(err.response.data.errors);
        } else {
          setMessage({ type: "danger", text: "Failed to add admission" });
        }
      })
      .finally(function () {
        setShowConfirm(false);
      });
  };

  const suggestedPatient =
    options.patients.find((p) => p.id === options.prescription?.patient_id)
      ?.name ?? "the patient";
  const suggestedDoctor =
    options.doctors.find((d) => d.id === options.prescription?.doctor_id)?.user
      ?.name ?? "the doctor";

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
              <h1 className="fs-3 mb-1">Add Admission</h1>
              <p className="mb-0">
                {options.prescription
                  ? `Admit the patient of prescription #${options.prescription.id}`
                  : "Create a new admission record"}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/admissions" className="btn btn-primary">
                Go to Admissions List
              </Link>
            </div>
          </div>
        </div>
      </div>
      {options.prescription && (
        <div className="alert alert-info" role="alert">
          Admission suggested by <strong>{suggestedDoctor}</strong> in
          prescription{" "}
          <strong>
            RX-{String(options.prescription.id).padStart(4, "0")}
          </strong>{" "}
          for <strong>{suggestedPatient}</strong>. Choose the ward &amp; bed
          below.
        </div>
      )}
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
                submitText="Add Admission"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add Admission"
        confirmText="Add Admission"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add this admission?
      </ConfirmModal>
    </>
  );
}

export default AdmissionAdd;
