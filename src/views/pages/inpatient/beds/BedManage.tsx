import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../../api";
import {
  bedStatuses,
  bedStatusBadgeClass,
  type Bed,
} from "../../../../interfaces/Bed";
import { useBedOptions } from "../../../../hooks/UseBedOptions";
import ConfirmModal from "../../../../components/ConfirmModoal";

function BedManage() {
  const { wards } = useBedOptions();
  const [beds, setBeds] = useState<Bed[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    occupied: 0,
    maintenance: 0,
  });
  const [search, setSearch] = useState("");
  const [wardId, setWardId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const getall = useCallback(() => {
    api
      .get("beds", { params: { ward_id: wardId, status } })
      .then(function (res) {
        setBeds(res.data.beds);
        setStats({
          total: res.data.totalBeds,
          available: res.data.availableCount,
          occupied: res.data.occupiedCount,
          maintenance: res.data.maintenanceCount,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [wardId, status]);

  useEffect(() => {
    getall();
  }, [getall]);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`beds/${deleteTarget.id}`)
      .then(function () {
        getall();
      })
      .catch(function (err) {
        console.log(err);
        setMessage(err.response?.data?.message ?? "Failed to delete bed");
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  const q = search.trim().toLowerCase();
  const visible = beds.filter(
    (b) =>
      !q ||
      b.bed_number.toLowerCase().includes(q) ||
      (b.ward?.name ?? "").toLowerCase().includes(q),
  );

  const statCards = [
    { label: "Total beds", value: stats.total },
    { label: "Available", value: stats.available },
    { label: "Occupied", value: stats.occupied },
    { label: "Maintenance", value: stats.maintenance },
  ];

  return (
    <>
      {message && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Beds</h1>
              <p className="mb-0">Beds in each ward and their status</p>
            </div>
            <div>
              <Link to="/add-bed" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Bed
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {statCards.map((s) => (
          <div className="col-6 col-md-3 mb-3" key={s.label}>
            <div className="card">
              <div className="card-body">
                <div className="text-muted small">{s.label}</div>
                <div className="fs-4 fw-semibold">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-between">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search beds..."
                style={{ maxWidth: "250px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={wardId}
                onChange={(e) => setWardId(e.target.value)}
              >
                <option value="">All wards</option>
                {wards.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All status</option>
                {bedStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary">
                <i className="bi bi-file-earmark-excel"></i> Excel
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-file-earmark-pdf"></i> PDF
              </button>
            </div>
          </div>
          <div className="card table-responsive">
            <table className="table mb-0 text-nowrap table-hover">
              <thead>
                <tr>
                  <th>Ward</th>
                  <th>Bed number</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  visible.map((item) => {
                    const wardName = item.ward?.name ?? `Ward #${item.ward_id}`;
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{wardName}</td>
                        <td>{item.bed_number}</td>
                        <td>
                          <span
                            className={`badge ${bedStatusBadgeClass(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/bed-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-bed/${item.id}`}
                            title="Edit"
                            className="btn btn-sm btn-outline-secondary me-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                id: item.id,
                                name: `${wardName} — ${item.bed_number}`,
                              })
                            }
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-bottom-0" colSpan={2}>
                    Showing {visible.length ? `1–${visible.length}` : "0–0"} of{" "}
                    {stats.total}
                  </td>
                  <td colSpan={2} className="border-bottom-0">
                    <nav
                      aria-label="Page navigation"
                      className="d-flex justify-content-end"
                    >
                      <ul className="pagination mb-0">
                        <li className="page-item disabled">
                          <button className="page-link">Previous</button>
                        </li>
                        <li className="page-item active">
                          <button className="page-link">1</button>
                        </li>
                        <li className="page-item disabled">
                          <button className="page-link">Next</button>
                        </li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={deleteTarget !== null}
        title="Delete Bed"
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      >
        Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default BedManage;
