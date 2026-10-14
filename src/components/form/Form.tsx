import type { FormEvent, ReactNode } from "react";
import { FormContext, type FormErrors } from "./FormContext";

// Shob form-er common props. Entity-r data-r type T hishebe dite hobe.
export interface FormProps<T> {
  data: T;
  setData: (data: T) => void;
  error: object; // backend-er 422 errors, jemon { name: ["required"] }
  onSubmit: (e: FormEvent) => void;
  submitText?: string;
  onClear?: () => void; // dile "Clear" button dekhabe
}

interface Props<T> extends FormProps<T> {
  children: ReactNode;
}

function Form<T>({
  data,
  setData,
  error,
  onSubmit,
  submitText = "Save",
  onClear,
  children,
}: Props<T>) {
  return (
    <FormContext.Provider
      value={{ data, setData, error: error as FormErrors }}
    >
      <form onSubmit={onSubmit}>
        <div className="row">{children}</div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
          {onClear && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClear}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </FormContext.Provider>
  );
}

export default Form;
