import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../../api";
import {
  bedStatusBadgeClass,
  defaultBed,
  type Bed,
} from "../../../../interfaces/Bed";

function BedDetails() {
  const { id } = useParams();
  const [bed, setBed] = useState<Bed>({ ...defaultBed });

  useEffect(() => {
    api
      .get(`beds/${id}`)
      .then(function (res) {
        setBed(res.data.bed);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Ward", value: bed.ward?.name },
    { label: "Floor", value: bed.ward?.floor },
    { label: "Ward type", value: bed.ward?.type },
    { label: "Bed number", value: bed.bed_number },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Bed</h1>
              <p className="mb-0">Bed details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link to={`/edit-bed/${id}`} className="btn btn-outline-primary">
                <i className="bi bi-pencil"></i> Edit
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer"></i> Print
              </button>
              <Link to="/beds" className="btn btn-primary">
                Go to Beds List
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
                  <div className="text-muted small mb-1">Status</div>
                  <div className="fw-medium">
                    {bed.id ? (
                      <span className={`badge ${bedStatusBadgeClass(bed.status)}`}>
                        {bed.status}
                      </span>
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

export default BedDetails;
