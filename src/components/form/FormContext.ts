import { createContext, useContext } from "react";

export type FormErrors = Record<string, string[] | undefined>;

export interface FormContextValue<T> {
  data: T;
  setData: (data: T) => void;
  error: FormErrors;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext<FormContextValue<any> | null>(null);

export function useFormContext<T = Record<string, unknown>>() {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("Form field gulo <Form> er bhitore use korte hobe");
  }
  return ctx as FormContextValue<T>;
}
