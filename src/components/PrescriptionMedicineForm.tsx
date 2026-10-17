import type { Prescription } from "../interfaces/Prescription";
import type { Medicine } from "../interfaces/Medicine";
import type { PrescriptionMedicine } from "../interfaces/PrescriptionMedicine";
import { onlyDate } from "../utils/format";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
  type FormProps,
} from "./form";

interface Props extends FormProps<PrescriptionMedicine> {
  prescriptions: Prescription[];
  medicines: Medicine[];
}

function PrescriptionMedicineForm({
  prescriptions,
  medicines,
  ...formProps
}: Props) {
  return (
    <Form {...formProps}>
      <FormSelect
        label="Prescription"
        name="prescription_id"
        placeholder="Select…"
        options={prescriptions.map((p) => ({
          value: p.id,
          label: `#${p.id} — ${p.patient?.name ?? "Patient"} (${onlyDate(p.prescription_date)})`,
        }))}
      />
      <FormSelect
        label="Medicine"
        name="medicine_id"
        placeholder="Select…"
        options={medicines.map((m) => ({ value: m.id, label: m.name }))}
      />
      <FormInput label="Dosage" name="dosage" required={false} placeholder="1+0+1" />
      <FormInput label="Duration" name="duration" required={false} placeholder="7 days" />
      <FormTextarea label="Instructions" name="instructions" required={false} />
    </Form>
  );
}

export default PrescriptionMedicineForm;
