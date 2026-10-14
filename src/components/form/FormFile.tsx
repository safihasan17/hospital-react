import { useEffect, useRef } from "react";
import { useFormContext } from "./FormContext";

interface FormFileProps {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  col?: string;
  preview?: string; // age upload kora image-er URL (edit page-e dekhate)
}

function FormFile({
  label,
  name,
  accept = "image/*",
  required = false,
  col = "col-md-6",
  preview,
}: FormFileProps) {
  const { data, setData, error } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const value = data[name];

  // Clear hole (value File na hole) file input-o khali kore dei
  useEffect(() => {
    if (!(value instanceof File) && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [value]);

  return (
    <div className={`${col} mb-3`}>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        ref={inputRef}
        id={name}
        type="file"
        accept={accept}
        className="form-control"
        onChange={(e) =>
          setData({ ...data, [name]: e.target.files?.[0] ?? null })
        }
      />
      {preview && !(value instanceof File) && (
        <img
          src={preview}
          alt=""
          className="mt-2 rounded border"
          style={{ height: 64 }}
        />
      )}
      <small className="text-danger">{error[name]?.[0]}</small>
    </div>
  );
}

export default FormFile;