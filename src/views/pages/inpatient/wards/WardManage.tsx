import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../../api";
import type { Ward } from "../../../../interfaces/Ward";
import ConfirmModal from "../../../../components/ConfirmModoal";
import Loader from "../../../../components/Loader";

function WardManage() {
  const [loading, setLoading] = useState(true);
  const [wards, setWards] = useState<Ward[]>([]);
  const [stats, setStats] = useState({ total: 0, floors: 0, types: 0 });
  // ward_id -> { free, total } (beds API theke hishab kori)
  const [bedCounts, setBedCounts] = useState<
    Record<number, { free: number; total: number }>
  >({});
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function getall() {
    api
      .get("wards")
      .then(function (res) {
        setWards(res.data.wards);
        setStats({
          total: res.data.totalWards,
          floors: res.data.totalFloors,
          types: res.data.totalTypes,
        });
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        setLoading(false);
      });

    api
      .get("beds")
      .then(function (res) {
        const counts: Record<number, { free: number; total: number }> = {};
        (res.data.beds as { ward_id: number; status: string }[]).forEach((b) => {
          const c = counts[b.ward_id] ?? { free: 0, total: 0 };
          c.total += 1;
          if (b.status === "Available") c.free += 1;
          counts[b.ward_id] = c;
        });
        setBedCounts(counts);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getall();
  }, []);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`wards/${deleteTarget.id}`)
      .then(function () {
        getall();
      })
      .catch(function (err) {
        console.log(err);
        setMessage(err.response?.data?.message ?? "Failed to delete ward");
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  const q = search.trim().toLowerCase();
  const visible = wards.filter(
    (w) =>
      !q ||
      w.name.toLowerCase().includes(q) ||
      (w.type ?? "").toLowerCase().includes(q) ||
      (w.floor ?? "").toLowerCase().includes(q),
  );

  const statCards = [
    { label: "Total wards", value: stats.total },
    { label: "Floors", value: stats.floors },
    { label: "Ward types", value: stats.types },
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
              <h1 className="fs-3 mb-1">Wards</h1>
              <p className="mb-0">Hospital wards and how many beds are free</p>
            </div>
            <div>
              <Link to="/add-ward" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Ward
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {statCards.map((s) => (
          <div className="col-12 col-md-4 mb-3" key={s.label}>
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
            <input
              type="text"
              className="form-control"
              placeholder="Search wards..."
              style={{ maxWidth: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                  <th>Name</th>
                  <th>Floor</th>
                  <th>Type</th>
                  <th>Beds (free / total)</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <Loader />
                    </td>
                  </tr>
                ) : visible.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  visible.map((item) => {
                    const c = bedCounts[item.id] ?? { free: 0, total: 0 };
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.floor || "—"}</td>
                        <td>{item.type || "—"}</td>
                        <td>
                          {c.free} / {c.total}
                        </td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/ward-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-ward/${item.id}`}
                            title="Edit"
                            className="btn btn-sm btn-outline-secondary me-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({ id: item.id, name: item.name })
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
                  <td colSpan={3} className="border-bottom-0">
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
        title="Delete Ward"
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

export default WardManage;
