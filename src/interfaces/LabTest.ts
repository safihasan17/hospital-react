export interface LabTest {
  id: number;
  test_name: string;
  price: string | number;
}

export const defaultLabTest: LabTest = { id: 0, test_name: "", price: "" };

export type LabTestError = Record<string, string[] | undefined>;
export const errorLabTest: LabTestError = {};

export function labTestToPayload(t: LabTest) {
  return { test_name: t.test_name, price: t.price };
}
