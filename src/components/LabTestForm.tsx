import type { LabTest } from "../interfaces/LabTest";
import { Form, FormInput, type FormProps } from "./form";

function LabTestForm(props: FormProps<LabTest>) {
  return (
    <Form {...props}>
      <FormInput label="Test name" name="test_name" />
      <FormInput
        label="Price"
        name="price"
        type="number"
        step="0.01"
        min="0"
      />
    </Form>
  );
}

export default LabTestForm;
