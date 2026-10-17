import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../../api";
import { defaultWard, type Ward } from "../../../../interfaces/Ward";
import {
  bedStatusBadgeClass,
  type Bed,
} from "../../../../interfaces/Bed";

function WardDetails() {
  const { id } = useParams();
  const [ward, setWard] = useState<Ward>({ ...defaultWard });
  const [beds, setBeds] = useState<Bed[]>([]);

  useEffect(() => {
    api
      .get(`wards/${id}`)
      .then(function (res) {
        setWard(res.data.ward);
      })
      .catch(function (err) {
        console.log(err);
      });

    // ei ward-er bed gulo
    api
      .get("beds", { params: { ward_id: id } })
      .then(function (res) {
        setBeds(res.data.beds);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const free = beds.filter((b) => b.status === "Available").length;

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Ward name", value: ward.name },
    { label: "Floor", value: ward.floor },
    { label: "Type", value: ward.type },
    { label: "Beds (free / total)", value: ward.id ? `${free} / ${beds.length}` : "" },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Ward</h1>
              <p className="mb-0">Ward details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link to={`/edit-ward/${id}`} className="btn btn-outline-primary">
                <i className="bi bi-pencil"></i> Edit
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer"></i> Print
              </button>
              <Link to="/wards" className="btn btn-primary">
                Go to Wards List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-body p-4">
              <div className="row">
                {fields.map((f) => (
                  <div className="col-md-6 mb-4" key={f.label}>
                    <div className="text-muted small mb-1">{f.label}</div>
                    <div className="fw-medium">{f.value || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white fw-semibold">Beds</div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Bed number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {beds.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center text-muted py-3">
                        No beds yet.
                      </td>
                    </tr>
                  ) : (
                    beds.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <Link to={`/bed-details/${b.id}`}>{b.bed_number}</Link>
                        </td>
                        <td>
                          <span className={`badge ${bedStatusBadgeClass(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WardDetails;
