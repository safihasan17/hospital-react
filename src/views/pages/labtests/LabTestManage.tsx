import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import type { LabTest } from "../../../interfaces/LabTest";
import { money } from "../../../utils/format";
import ConfirmModal from "../../../components/ConfirmModoal";
import Loader from "../../../components/Loader";

function LabTestManage() {
  const [loading, setLoading] = useState(true);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function getall() {
    api
      .get("lab-tests")
      .then(function (res) {
        setLabTests(res.data.labTests);
        setTotal(res.data.totalLabTests);
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  useEffect(() => {
    getall();
  }, []);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`lab-tests/${deleteTarget.id}`)
      .then(function () {
        getall();
      })
      .catch(function (err) {
        console.log(err);
        setMessage(err.response?.data?.message ?? "Failed to delete lab test");
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  const q = search.trim().toLowerCase();
  const visible = labTests.filter(
    (t) => !q || t.test_name.toLowerCase().includes(q),
  );

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
              <h1 className="fs-3 mb-1">Lab Tests</h1>
              <p className="mb-0">Catalogue of available lab tests</p>
            </div>
            <div>
              <Link to="/add-lab-test" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Lab Test
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-between">
            <input
              type="text"
              className="form-control"
              placeholder="Search lab tests..."
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
                  <th>ID</th>
                  <th>Test</th>
                  <th>Price</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      <Loader />
                    </td>
                  </tr>
                ) : visible.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  visible.map((item) => (
                    <tr className="align-middle" key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.test_name}</td>
                      <td>{money(item.price)}</td>
                      <td className="text-end text-nowrap">
                        <Link
                          to={`/lab-test-details/${item.id}`}
                          title="Details"
                          className="btn btn-sm btn-outline-primary me-1"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link
                          to={`/edit-lab-test/${item.id}`}
                          title="Edit"
                          className="btn btn-sm btn-outline-secondary me-1"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({ id: item.id, name: item.test_name })
                          }
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-bottom-0" colSpan={2}>
                    Showing {visible.length ? `1–${visible.length}` : "0–0"} of{" "}
                    {total}
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
        title="Delete Lab Test"
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

export default LabTestManage;
