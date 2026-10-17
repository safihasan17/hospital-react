export interface Ward {
  id: number;
  name: string;
  floor: string;
  type: string;
}

export const defaultWard: Ward = { id: 0, name: "", floor: "", type: "" };

export type WardError = Record<string, string[] | undefined>;
export const errorWard: WardError = {};

// GET wards/options
export interface WardOptions {
  floors: string[];
  types: string[];
}

export function wardToPayload(w: Ward) {
  return { name: w.name, floor: w.floor, type: w.type };
}
