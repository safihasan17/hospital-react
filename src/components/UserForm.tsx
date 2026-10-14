import type { Role } from "../interfaces/Role";
import type { User } from "../interfaces/User";
import { Form, FormInput, FormSelect, FormSwitch, type FormProps } from "./form";


interface UserFormProps extends FormProps<User> {
  roles: Role[];
  passwordRequired?: boolean; // false dile password optional (* thake na)
  showPassword?: boolean; // false dile password field dui ta dekhabe na (edit page)
}

function UserForm({
  roles,
  passwordRequired = true,
  showPassword = true,
  ...formProps
}: UserFormProps) {
  return (
    <Form {...formProps}>
      <FormInput label="Name" name="name" />
      <FormInput label="Email" name="email" type="email" />
      <FormInput label="Phone" name="phone" type="tel" />
      <FormSelect
        label="Role"
        name="role_id"
        options={roles.map((r) => ({ value: r.id, label: r.name }))}
      />
      {showPassword && (
        <>
          <FormInput
            label="Password (3–15 characters)"
            name="password"
            type="password"
            required={passwordRequired}
          />
          <FormInput
            label="Confirm password"
            name="password_confirmation"
            type="password"
            required={passwordRequired}
          />
        </>
      )}
      <FormSwitch label="Active" name="active" />
    </Form>
  );
}

export default UserForm;