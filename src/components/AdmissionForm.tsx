import {
  admissionStatuses,
  type Admission,
  type AdmissionOptions,
} from "../interfaces/Admission";
import { Form, FormInput, FormSelect, type FormProps } from "./form";

interface AdmissionFormProps extends FormProps<Admission> {
  options: AdmissionOptions;
}

const statusOptions = admissionStatuses.map((s) => ({ value: s, label: s }));

function AdmissionForm({ options, ...formProps }: AdmissionFormProps) {
  const { data, setData } = formProps;

  // Ward bodlale oi ward-er bed na hole bed_id clear hoy
  const handleSetData = (next: Admission) => {
    if (next.ward_id !== data.ward_id && next.bed_id !== "") {
      const bed = options.beds.find((b) => b.id === next.bed_id);
      if (bed && bed.ward_id !== next.ward_id) {
        next = { ...next, bed_id: "" };
      }
    }
    setData(next);
  };

  // Ward select kora thakle shudhu oi ward-er bed dekhai
  const beds = options.beds.filter(
    (b) => data.ward_id === "" || b.ward_id === data.ward_id,
  );

  return (
    <Form {...formProps} setData={handleSetData}>
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
      <FormSelect
        label="Ward"
        name="ward_id"
        placeholder="Select…"
        options={options.wards.map((w) => ({ value: w.id, label: w.name }))}
      />
      <FormSelect
        label="Bed"
        name="bed_id"
        placeholder="Select…"
        options={beds.map((b) => ({
          value: b.id,
          label:
            data.ward_id === ""
              ? `${b.ward?.name ?? "Ward"} — ${b.bed_number}`
              : b.bed_number,
        }))}
      />
      <FormInput
        label="Admission date & time"
        name="admission_date"
        type="datetime-local"
      />
      <FormInput
        label="Discharge date & time"
        name="discharge_date"
        type="datetime-local"
        required={false}
      />
      <FormSelect
        label="Status"
        name="status"
        placeholder="Select…"
        options={statusOptions}
      />
    </Form>
  );
}

export default AdmissionForm;
