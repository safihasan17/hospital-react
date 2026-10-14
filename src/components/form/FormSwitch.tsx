import { useFormContext } from "./FormContext";

interface FormSwitchProps {
  label: string;
  name: string;
  col?: string;
}

function FormSwitch({ label, name, col = "col-md-6" }: FormSwitchProps) {
  const { data, setData, error } = useFormContext();

  return (
    <div className={`${col} mb-3`}>
      <div className="form-check form-switch">
        <input
          id={name}
          type="checkbox"
          className="form-check-input"
          checked={Boolean(data[name])}
          onChange={(e) => setData({ ...data, [name]: e.target.checked })}
        />
        <label htmlFor={name} className="form-check-label">
          {label}
        </label>
      </div>
      <small className="text-danger">{error[name]?.[0]}</small>
    </div>
  );
}

export default FormSwitch;
