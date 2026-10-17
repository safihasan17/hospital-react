import type { Medicine } from "../interfaces/Medicine";
import { Form, FormInput, type FormProps } from "./form";

function MedicineForm(props: FormProps<Medicine>) {
  return (
    <Form {...props}>
      <FormInput label="Name" name="name" />
      <FormInput label="Generic name" name="generic_name" required={false} />
      <FormInput label="Category" name="category" required={false} />
      <FormInput
        label="Unit price"
        name="unit_price"
        type="number"
        step="0.01"
        min="0"
      />
      <FormInput
        label="Stock quantity"
        name="stock_quantity"
        type="number"
        step="1"
        min="0"
      />
    </Form>
  );
}

export default MedicineForm;
