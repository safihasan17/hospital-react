export interface Medicine {
  id: number;
  name: string;
  generic_name: string;
  category: string;
  unit_price: string | number;
  stock_quantity: string | number;
}

export const defaultMedicine: Medicine = {
  id: 0,
  name: "",
  generic_name: "",
  category: "",
  unit_price: "",
  stock_quantity: "",
};

// backend-er 422 validation error
export type MedicineError = Record<string, string[] | undefined>;
export const errorMedicine: MedicineError = {};

export const stockFilters = [
  { value: "in", label: "In stock" },
  { value: "low", label: "Low stock" },
  { value: "out", label: "Out of stock" },
];

// Stock onujayi badge. low = backend-er lowStockLimit
export function stockStatus(qty: string | number, low: number) {
  const n = Number(qty);
  if (n <= 0) return { label: "Out of stock", cls: "bg-danger" };
  if (n < low) return { label: "Low stock", cls: "bg-warning text-dark" };
  return { label: "In stock", cls: "bg-success" };
}

export function medicineToPayload(m: Medicine) {
  return {
    name: m.name,
    generic_name: m.generic_name || null,
    category: m.category || null,
    unit_price: m.unit_price,
    stock_quantity: m.stock_quantity,
  };
}
