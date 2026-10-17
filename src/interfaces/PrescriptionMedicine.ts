export interface PrescriptionMedicine {
  id: number;
  prescription_id: number | "";
  medicine_id: number | "";
  dosage: string;
  duration: string;
  instructions: string;

  medicine?: { id: number; name: string; generic_name?: string | null };
}

export const defaultPrescriptionMedicine: PrescriptionMedicine = {
  id: 0,
  prescription_id: "",
  medicine_id: "",
  dosage: "",
  duration: "",
  instructions: "",
};

export type PrescriptionMedicineError = Record<string, string[] | undefined>;
export const errorPrescriptionMedicine: PrescriptionMedicineError = {};

export function prescriptionMedicineToPayload(p: PrescriptionMedicine) {
  return {
    prescription_id: p.prescription_id,
    medicine_id: p.medicine_id,
    dosage: p.dosage || null,
    duration: p.duration || null,
    instructions: p.instructions || null,
  };
}
