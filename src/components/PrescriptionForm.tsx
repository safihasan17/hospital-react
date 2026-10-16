import {
  emptyLabTestRow,
  emptyMedicineRow,
  type Prescription,
  type PrescriptionOptions,
} from "../interfaces/Prescription";
import {
  Form,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  type FormProps,
} from "./form";
import { useFormContext } from "./form/FormContext";

interface PrescriptionFormProps extends FormProps<Prescription> {
  options: PrescriptionOptions;
  locked?: boolean; // true hole appointment/patient/doctor change kora jay na
}

// ---- Medicine row gulo ----
function MedicineRows({ medicines }: { medicines: PrescriptionOptions["medicines"] }) {
  const { data, setData, error } = useFormContext<Prescription>();

  const update = (index: number, field: string, value: string | number) => {
    const rows = data.medicines.map((r, i) =>
      i === index ? { ...r, [field]: value } : r,
    );
    setData({ ...data, medicines: rows });
  };

  const add = () =>
    setData({ ...data, medicines: [...data.medicines, { ...emptyMedicineRow }] });

  const remove = (index: number) =>
    setData({ ...data, medicines: data.medicines.filter((_, i) => i !== index) });

  return (
    <div className="col-12 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label mb-0 fw-semibold">Medicines</label>
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={add}>
          <i className="bi bi-plus-lg"></i> Add medicine
        </button>
      </div>
      {data.medicines.length === 0 && (
        <div className="text-muted small">No medicines added.</div>
      )}
      {data.medicines.map((row, i) => (
        <div className="row g-2 mb-2 align-items-start" key={i}>
          <div className="col-md-4">
            <select
              className="form-select"
              required
              value={String(row.medicine_id)}
              onChange={(e) =>
                update(i, "medicine_id", e.target.value === "" ? "" : Number(e.target.value))
              }
            >
              <option value="">Select medicine…</option>
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <small className="text-danger">{error[`medicines.${i}.medicine_id`]?.[0]}</small>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Dosage"
              value={row.dosage}
              onChange={(e) => update(i, "dosage", e.target.value)}
            />
            <small className="text-danger">{error[`medicines.${i}.dosage`]?.[0]}</small>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Duration"
              value={row.duration}
              onChange={(e) => update(i, "duration", e.target.value)}
            />
            <small className="text-danger">{error[`medicines.${i}.duration`]?.[0]}</small>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Instructions"
              value={row.instructions}
              onChange={(e) => update(i, "instructions", e.target.value)}
            />
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-outline-danger"
              title="Remove"
              onClick={() => remove(i)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Lab test row gulo ----
function LabTestRows({ labTests }: { labTests: PrescriptionOptions["labTests"] }) {
  const { data, setData, error } = useFormContext<Prescription>();

  const update = (index: number, value: number | "") => {
    const rows = data.lab_tests.map((r, i) => (i === index ? { test_id: value } : r));
    setData({ ...data, lab_tests: rows });
  };

  const add = () =>
    setData({ ...data, lab_tests: [...data.lab_tests, { ...emptyLabTestRow }] });

  const remove = (index: number) =>
    setData({ ...data, lab_tests: data.lab_tests.filter((_, i) => i !== index) });

  return (
    <div className="col-12 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label mb-0 fw-semibold">Lab tests</label>
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={add}>
          <i className="bi bi-plus-lg"></i> Add lab test
        </button>
      </div>
      {data.lab_tests.length === 0 && (
        <div className="text-muted small">No lab tests added.</div>
      )}
      {data.lab_tests.map((row, i) => (
        <div className="row g-2 mb-2 align-items-start" key={i}>
          <div className="col-md-6">
            <select
              className="form-select"
              required
              value={String(row.test_id)}
              onChange={(e) =>
                update(i, e.target.value === "" ? "" : Number(e.target.value))
              }
            >
              <option value="">Select lab test…</option>
              {labTests.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.test_name}
                </option>
              ))}
            </select>
            <small className="text-danger">{error[`lab_tests.${i}.test_id`]?.[0]}</small>
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-outline-danger"
              title="Remove"
              onClick={() => remove(i)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PrescriptionForm({
  options,
  locked = false,
  ...formProps
}: PrescriptionFormProps) {
  const { data, setData } = formProps;

  // Appointment select korle oi appointment-er patient ar doctor auto-fill hoy
  const handleSetData = (next: Prescription) => {
    if (next.appointment_id !== data.appointment_id && next.appointment_id !== "") {
      const appt = options.appointments.find((a) => a.id === next.appointment_id);
      if (appt) {
        next = { ...next, patient_id: appt.patient_id, doctor_id: appt.doctor_id };
      }
    }
    setData(next);
  };

  return (
    <Form {...formProps} setData={handleSetData}>
      <FormSelect
        label="Appointment (optional)"
        name="appointment_id"
        placeholder="Select…"
        required={false}
        disabled={locked}
        options={options.appointments.map((a) => ({
          value: a.id,
          label: `#${a.id} — ${a.patient?.name ?? "Patient"} (${a.appointment_date})`,
        }))}
      />
      <FormInput label="Date" name="prescription_date" type="date" />
      <FormSelect
        label="Patient"
        name="patient_id"
        placeholder="Select…"
        disabled={locked}
        options={options.patients.map((p) => ({
          value: p.id,
          label: p.phone ? `${p.name} (${p.phone})` : p.name,
        }))}
      />
      <FormSelect
        label="Doctor"
        name="doctor_id"
        placeholder="Select…"
        disabled={locked}
        options={options.doctors.map((d) => ({
          value: d.id,
          label:
            (d.user?.name ?? `Doctor #${d.id}`) +
            (d.department ? ` — ${d.department.name}` : ""),
        }))}
      />
      <FormTextarea label="Notes / diagnosis" name="notes" required={false} />
      <FormSwitch label="Admission advised" name="admission_advised" col="col-12" />
      <MedicineRows medicines={options.medicines} />
      <LabTestRows labTests={options.labTests} />
    </Form>
  );
}

export default PrescriptionForm;