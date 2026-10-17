import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../../api";
import {
  defaultMedicine,
  stockStatus,
  type Medicine,
} from "../../../../interfaces/Medicine";
import { money } from "../../../../utils/format";

function MedicineDetails() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState<Medicine>({ ...defaultMedicine });
  const [lowStockLimit, setLowStockLimit] = useState(10);

  useEffect(() => {
    api
      .get(`medicines/${id}`)
      .then(function (res) {
        setMedicine(res.data.medicine);
      })
      .catch(function (err) {
        console.log(err);
      });

    // low stock limit index API theke ashe
    api
      .get("medicines")
      .then(function (res) {
        setLowStockLimit(res.data.lowStockLimit ?? 10);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const st = stockStatus(medicine.stock_quantity, lowStockLimit);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Name", value: medicine.name },
    { label: "Generic name", value: medicine.generic_name },
    { label: "Category", value: medicine.category },
    {
      label: "Unit price",
      value: medicine.id ? money(medicine.unit_price) : "",
    },
    { label: "Stock", value: medicine.id ? medicine.stock_quantity : "" },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Medicine</h1>
              <p className="mb-0">Medicine details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-medicine/${id}`}
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
              <Link to="/medicines" className="btn btn-primary">
                Go to Medicines List
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
                {fields.map((f) => (
                  <div className="col-md-6 mb-4" key={f.label}>
                    <div className="text-muted small mb-1">{f.label}</div>
                    <div className="fw-medium">{f.value || "—"}</div>
                  </div>
                ))}
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Stock status</div>
                  <div className="fw-medium">
                    {medicine.id ? (
                      <span className={`badge ${st.cls}`}>{st.label}</span>
                    ) : (
                      "—"
                    )}
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

export default MedicineDetails;
