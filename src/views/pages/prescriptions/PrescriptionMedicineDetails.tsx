import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import {
  defaultPrescriptionMedicine,
  type PrescriptionMedicine,
} from "../../../interfaces/PrescriptionMedicine";

function PrescriptionMedicineDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<PrescriptionMedicine>({
    ...defaultPrescriptionMedicine,
  });

  useEffect(() => {
    api
      .get(`prescription-medicines/${id}`)
      .then(function (res) {
        setItem(res.data.prescriptionMedicine);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Medicine", value: item.medicine?.name },
    { label: "Generic name", value: item.medicine?.generic_name },
    { label: "Dosage", value: item.dosage },
    { label: "Duration", value: item.duration },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Prescription medicine</h1>
              <p className="mb-0">Prescription medicine details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-prescription-medicine/${id}`}
                className="btn btn-outline-primary"
              >
                <i className="bi bi-pencil"></i> Edit
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer"></i> Print
              </button>
              <Link to="/prescription-medicines" className="btn btn-primary">
                Go to Prescription Medicines List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Prescription</div>
                  <div className="fw-medium">
                    {item.prescription_id ? (
                      <Link to={`/prescription-details/${item.prescription_id}`}>
                        #{item.prescription_id}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
                {fields.map((f) => (
                  <div className="col-md-6 mb-4" key={f.label}>
                    <div className="text-muted small mb-1">{f.label}</div>
                    <div className="fw-medium">{f.value || "—"}</div>
                  </div>
                ))}
                <div className="col-12 mb-4">
                  <div className="text-muted small mb-1">Instructions</div>
                  <div className="fw-medium" style={{ whiteSpace: "pre-wrap" }}>
                    {item.instructions || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrescriptionMedicineDetails;
