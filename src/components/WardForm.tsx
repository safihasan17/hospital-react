import type { Ward, WardOptions } from "../interfaces/Ward";
import { Form, FormInput, FormSelect, type FormProps } from "./form";

interface WardFormProps extends FormProps<Ward> {
  options: WardOptions;
}

function WardForm({ options, ...formProps }: WardFormProps) {
  return (
    <Form {...formProps}>
      <FormInput label="Ward name" name="name" />
      <FormSelect
        label="Floor"
        name="floor"
        placeholder="Select…"
        options={options.floors.map((f) => ({ value: f, label: f }))}
      />
      <FormSelect
        label="Type"
        name="type"
        placeholder="Select…"
        options={options.types.map((t) => ({ value: t, label: t }))}
      />
    </Form>
  );
}

export default WardForm;
