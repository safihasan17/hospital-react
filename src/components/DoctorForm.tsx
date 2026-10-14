import type { User } from "../interfaces/User";
import type { Department } from "../interfaces/Department";
import { doctorImageUrl, type Doctor } from "../interfaces/Doctor";
import {
  Form,
  FormFile,
  FormInput,
  FormSelect,
  type FormProps,
} from "./form";

interface DoctorFormProps extends FormProps<Doctor> {
  users: User[];
  departments: Department[];
}

function DoctorForm({ users, departments, ...formProps }: DoctorFormProps) {
  // shudhu Doctor role-er user gulo dekhabe
  const doctorUsers = users.filter((u) => u.role?.name === "Doctor");
  const image = formProps.data.image;

  return (
    <Form {...formProps}>
      <FormSelect
        label="Doctor account (user with Doctor role)"
        name="user_id"
        placeholder="Select…"
        options={doctorUsers.map((u) => ({
          value: u.id,
          label: `${u.name} (${u.email})`,
        }))}
      />
      <FormSelect
        label="Department"
        name="department_id"
        placeholder="Select…"
        required={false}
        options={departments.map((d) => ({ value: d.id, label: d.name }))}
      />
      <FormInput
        label="Specialization"
        name="specialization"
        required={false}
      />
      <FormInput
        label="Qualification"
        name="qualification"
        required={false}
      />
      <FormInput
        label="Consultation fee"
        name="consultation_fee"
        type="number"
        required={false}
      />
      <FormFile
        label="Photo (max 500 KB)"
        name="image"
        preview={
          typeof image === "string" && image
            ? doctorImageUrl(image)
            : undefined
        }
      />
    </Form>
  );
}

export default DoctorForm;