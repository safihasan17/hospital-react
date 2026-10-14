import { useFormContext } from "./FormContext";

interface FormTextareaProps {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  col?: string;
  placeholder?: string;
}

function FormTextarea({
  label,
  name,
  rows = 3,
  required = true,
  col = "col-12", // textarea shadharonoto full width
  placeholder,
}: FormTextareaProps) {
  const { data, setData, error } = useFormContext();

  return (
    <div className={`${col} mb-3`}>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        className="form-control"
        placeholder={placeholder}
        value={String(data[name] ?? "")}
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
      />
      <small className="text-danger">{error[name]?.[0]}</small>
    </div>
  );
}

export default FormTextarea;
