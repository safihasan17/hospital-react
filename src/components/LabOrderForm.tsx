import {
  labOrderStatuses,
  type LabOrder,
  type LabOrderOptions,
} from "../interfaces/LabOrder";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
  type FormProps,
} from "./form";
import { useFormContext } from "./form/FormContext";

interface LabOrderFormProps extends FormProps<LabOrder> {
  options: LabOrderOptions;
  // add: ek shathe onek test, edit: ekta test
  mode: "add" | "edit";
}

const statusOptions = labOrderStatuses.map((s) => ({ value: s, label: s }));

// ---- Add-e test row gulo ----
function LabTestRows({ labTests }: { labTests: LabOrderOptions["labTests"] }) {
  const { data, setData, error } = useFormContext<LabOrder>();

  const update = (index: number, value: number | "") =>
    setData({
      ...data,
      lab_tests: data.lab_tests.map((r, i) =>
        i === index ? { test_id: value } : r,
      ),
    });

  const add = () =>
    setData({ ...data, lab_tests: [...data.lab_tests, { test_id: "" }] });

  const remove = (index: number) =>
    setData({
      ...data,
      lab_tests: data.lab_tests.filter((_, i) => i !== index),
    });

  return (
    <div className="col-12 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label mb-0">
          Tests{" "}
          <small className="text-muted fw-normal">
            — one order is created per test
          </small>{" "}
          <span className="text-danger">*</span>
        </label>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={add}
        >
          <i className="bi bi-plus-lg"></i> Add lab test
        </button>
      </div>
      {data.lab_tests.length === 0 && (
        <div className="text-muted small">No lab tests added.</div>
      )}
      <small className="text-danger">{error["lab_tests"]?.[0]}</small>
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
            <small className="text-danger">
              {error[`lab_tests.${i}.test_id`]?.[0]}
            </small>
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

function LabOrderForm({ options, mode, ...formProps }: LabOrderFormProps) {
  return (
    <Form {...formProps}>
      <FormSelect
        label="Patient"
        name="patient_id"
        placeholder="Select…"
        options={options.patients.map((p) => ({
          value: p.id,
          label: p.phone ? `${p.name} (${p.phone})` : p.name,
        }))}
      />
      <FormSelect
        label="Doctor"
        name="doctor_id"
        placeholder="Select…"
        options={options.doctors.map((d) => ({
          value: d.id,
          label:
            (d.user?.name ?? `Doctor #${d.id}`) +
            (d.department ? ` — ${d.department.name}` : ""),
        }))}
      />
      <FormInput label="Order date" name="order_date" type="date" />
      <FormSelect
        label="Status"
        name="status"
        placeholder="Select…"
        options={statusOptions}
      />
      {mode === "add" ? (
        <LabTestRows labTests={options.labTests} />
      ) : (
        <FormSelect
          label="Test"
          name="test_id"
          placeholder="Select…"
          options={options.labTests.map((t) => ({
            value: t.id,
            label: t.test_name,
          }))}
        />
      )}
      <FormTextarea label="Result" name="result" required={false} />
    </Form>
  );
}

export default LabOrderForm;
