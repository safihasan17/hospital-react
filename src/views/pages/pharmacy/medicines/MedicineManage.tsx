import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../../api";
import {
  stockFilters,
  stockStatus,
  type Medicine,
} from "../../../../interfaces/Medicine";
import { money } from "../../../../utils/format";
import ConfirmModal from "../../../../components/ConfirmModoal";
import Loader from "../../../../components/Loader";

function MedicineManage() {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [lowStockLimit, setLowStockLimit] = useState(10);
  const [stats, setStats] = useState({ total: 0, low: 0, out: 0 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const getall = useCallback(() => {
    api
      .get("medicines", { params: { q: search, category, stock } })
      .then(function (res) {
        setMedicines(res.data.medicines);
        setCategories(res.data.categories ?? []);
        setLowStockLimit(res.data.lowStockLimit ?? 10);
        setStats({
          total: res.data.totalMedicines,
          low: res.data.lowStockCount,
          out: res.data.outOfStockCount,
        });
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [search, category, stock]);

  // filter change hole 300ms pore notun kore ane
  useEffect(() => {
    const timer = setTimeout(getall, 300);
    return () => clearTimeout(timer);
  }, [getall]);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`medicines/${deleteTarget.id}`)
      .then(function () {
        getall();
      })
      .catch(function (err) {
        console.log(err);
        setMessage(err.response?.data?.message ?? "Failed to delete medicine");
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  const statCards = [
    { label: "Total medicines", value: stats.total },
    { label: `Low stock (below ${lowStockLimit})`, value: stats.low },
    { label: "Out of stock", value: stats.out },
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
              <h1 className="fs-3 mb-1">Medicines</h1>
              <p className="mb-0">Medicine stock and prices</p>
            </div>
            <div>
              <Link to="/add-medicine" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Medicine
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
            <div className="d-flex gap-2 flex-wrap">
              <input
                type="text"
                className="form-control"
                placeholder="Search name or generic..."
                style={{ maxWidth: "250px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              >
                <option value="">All stock</option>
                {stockFilters.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
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
                  <th>Name</th>
                  <th>Generic name</th>
                  <th>Category</th>
                  <th>Unit price</th>
                  <th>Stock</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <Loader />
                    </td>
                  </tr>
                ) : medicines.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  medicines.map((item) => {
                    const st = stockStatus(item.stock_quantity, lowStockLimit);
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.generic_name || "—"}</td>
                        <td>{item.category || "—"}</td>
                        <td>{money(item.unit_price)}</td>
                        <td>
                          {item.stock_quantity}{" "}
                          <span className={`badge ${st.cls}`}>{st.label}</span>
                        </td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/medicine-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-medicine/${item.id}`}
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
                    Showing {medicines.length ? `1–${medicines.length}` : "0–0"}{" "}
                    of {stats.total}
                  </td>
                  <td colSpan={4} className="border-bottom-0">
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
        title="Delete Medicine"
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

export default MedicineManage;
