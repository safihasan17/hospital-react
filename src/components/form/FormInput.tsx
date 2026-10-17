import { useFormContext } from "./FormContext";

interface FormInputProps {
  label: string;
  name: string; // data-r field-er nam, backend error-er key-o eta
  type?: string; // text, email, tel, password, date, number...
  required?: boolean; // shudhu * chinho dekhay
  col?: string; // grid column class, default half width
  placeholder?: string;
  step?: string; // number input-e decimal-er jonno, jemon "0.01"
  min?: string;
}

function FormInput({
  label,
  name,
  type = "text",
  required = true,
  col = "col-md-6",
  placeholder,
  step,
  min,
}: FormInputProps) {
  const { data, setData, error } = useFormContext();

  return (
    <div className={`${col} mb-3`}>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        step={step}
        min={min}
        value={String(data[name] ?? "")}
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
      />
      <small className="text-danger">{error[name]?.[0]}</small>
    </div>
  );
}

export default FormInput;
