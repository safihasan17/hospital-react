import type { Patient } from "../interfaces/Patient";
import type { Doctor } from "../interfaces/Doctor";
import {
  appointmentStatuses,
  type Appointment,
} from "../interfaces/Appointment";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
  type FormProps,
} from "./form";

interface AppointmentFormProps extends FormProps<Appointment> {
  patients: Patient[];
  doctors: Doctor[];
}

const statusOptions = appointmentStatuses.map((s) => ({ value: s, label: s }));

function AppointmentForm({
  patients,
  doctors,
  ...formProps
}: AppointmentFormProps) {
  return (
    <Form {...formProps}>
      <FormSelect
        label="Patient"
        name="patient_id"
        placeholder="Select…"
        options={patients.map((p) => ({
          value: p.id,
          label: p.phone ? `${p.name} (${p.phone})` : p.name,
        }))}
      />
      <FormSelect
        label="Doctor"
        name="doctor_id"
        placeholder="Select…"
        options={doctors.map((d) => ({
          value: d.id,
          label:
            (d.user?.name ?? `Doctor #${d.id}`) +
            (d.department ? ` — ${d.department.name}` : ""),
        }))}
      />
      <FormInput label="Date" name="appointment_date" type="date" />
      <FormInput label="Time" name="appointment_time" type="time" />
      <FormSelect
        label="Status"
        name="status"
        placeholder="Select…"
        options={statusOptions}
      />
      <FormTextarea label="Reason for visit" name="reason" required={false} />
    </Form>
  );
}

export default AppointmentForm;
