import type { Patient } from "../interfaces/Patient";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
  type FormProps,
} from "./form";

const genderOptions = ["Male", "Female", "Other"].map((v) => ({
  value: v,
  label: v,
}));

const bloodOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
  (v) => ({ value: v, label: v }),
);

// extra props lage na, tai direct FormProps<Patient>
function PatientForm(props: FormProps<Patient>) {
  return (
    <Form {...props}>
      <FormInput label="Full name" name="name" />
      <FormInput label="Date of birth" name="dob" type="date" required={false} />
      <FormSelect
        label="Gender"
        name="gender"
        options={genderOptions}
        placeholder="Select…"
        required={false}
      />
      <FormSelect
        label="Blood group"
        name="blood_group"
        options={bloodOptions}
        placeholder="Select…"
        required={false}
      />
      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        placeholder="e.g. 01XXX-XXXXXX"
        required={false}
      />
      <FormInput
        label="Emergency contact"
        name="emergency_contact"
        type="tel"
        required={false}
      />
      <FormInput label="Guardian name" name="guardian_name" required={false} />
      <FormTextarea label="Address" name="address" required={false} />
    </Form>
  );
}

export default PatientForm;