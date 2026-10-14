import { useFormContext } from "./FormContext";

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  col?: string;
}

function FormSelect({
  label,
  name,
  options,
  placeholder = `Select ${label}`,
  required = true,
  col = "col-md-6",
}: FormSelectProps) {
  const { data, setData, error } = useFormContext();

  const handleChange = (value: string) => {
    // number id hole number-i thakbe (jemon role_id)
    const picked = options.find((o) => String(o.value) === value);
    setData({ ...data, [name]: picked ? picked.value : "" });
  };

  return (
    <div className={`${col} mb-3`}>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        id={name}
        className="form-select"
        required={required}
        value={String(data[name] ?? "") === "0" ? "" : String(data[name] ?? "")}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <small className="text-danger">{error[name]?.[0]}</small>
    </div>
  );
}

export default FormSelect;
