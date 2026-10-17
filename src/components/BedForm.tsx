import { bedStatuses, type Bed } from "../interfaces/Bed";
import { Form, FormInput, FormSelect, type FormProps } from "./form";

interface BedFormProps extends FormProps<Bed> {
  wards: { id: number; name: string }[];
}

const statusOptions = bedStatuses.map((s) => ({ value: s, label: s }));

function BedForm({ wards, ...formProps }: BedFormProps) {
  return (
    <Form {...formProps}>
      <FormSelect
        label="Ward"
        name="ward_id"
        placeholder="Select…"
        options={wards.map((w) => ({ value: w.id, label: w.name }))}
      />
      <FormInput label="Bed number" name="bed_number" />
      <FormSelect
        label="Status"
        name="status"
        placeholder="Select…"
        options={statusOptions}
      />
    </Form>
  );
}

export default BedForm;
