export const bedStatuses = [
  "Available",
  "Occupied",
  "Reserved",
  "Maintenance",
] as const;

export type BedStatus = (typeof bedStatuses)[number];

export interface Bed {
  id: number;
  ward_id: number | "";
  bed_number: string;
  status: BedStatus;

  ward?: { id: number; name: string; floor?: string; type?: string } | null;
}

export const defaultBed: Bed = {
  id: 0,
  ward_id: "",
  bed_number: "",
  status: "Available",
};

export type BedError = Record<string, string[] | undefined>;
export const errorBed: BedError = {};

export function bedStatusBadgeClass(status: string) {
  switch (status) {
    case "Available":
      return "bg-success";
    case "Occupied":
      return "bg-danger";
    case "Reserved":
      return "bg-warning text-dark";
    default:
      return "bg-secondary";
  }
}

export function bedToPayload(b: Bed) {
  return { ward_id: b.ward_id, bed_number: b.bed_number, status: b.status };
}
