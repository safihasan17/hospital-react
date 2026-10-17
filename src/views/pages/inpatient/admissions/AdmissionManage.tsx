import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../../api";
import {
  admissionStatuses,
  admissionStatusBadgeClass,
  type Admission,
} from "../../../../interfaces/Admission";
import { formatDateTime } from "../../../../utils/format";
import ConfirmModal from "../../../../components/ConfirmModoal";

function AdmissionManage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [stats, setStats] = useState({ total: 0, admitted: 0, discharged: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function getall() {
    api
      .get("admissions")
      .then(function (res) {
        setAdmissions(res.data.admissions);
        setStats({
          total: res.data.totalAdmissions,
          admitted: res.data.currentlyAdmitted,
          discharged: res.data.dischargedCount,
        });
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
      .delete(`admissions/${deleteTarget.id}`)
      .then(function () {
        getall();
      })
      .catch(function (err) {
        console.log(err);
        setMessage(err.response?.data?.message ?? "Failed to delete admission");
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  // search: patient, doctor, ward ba bed; status dropdown (list-er upor)
  const q = search.trim().toLowerCase();
  const visible = admissions.filter((a) => {
    if (status && a.status !== status) return false;
    if (!q) return true;
    return (
      (a.patient?.name ?? "").toLowerCase().includes(q) ||
      (a.doctor?.user?.name ?? "").toLowerCase().includes(q) ||
      (a.ward?.name ?? "").toLowerCase().includes(q) ||
      (a.bed?.bed_number ?? "").toLowerCase().includes(q)
    );
  });

  const statCards = [
    { label: "Total admissions", value: stats.total },
    { label: "Currently admitted", value: stats.admitted },
    { label: "Discharged", value: stats.discharged },
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
              <h1 className="fs-3 mb-1">Admissions</h1>
              <p className="mb-0">
                Admit patients to a ward and bed, and discharge them
              </p>
            </div>
            <div>
              <Link to="/add-admission" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Admission
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
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search admissions..."
                style={{ maxWidth: "250px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All status</option>
                {admissionStatuses.map((s) => (
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
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Ward / bed</th>
                  <th>Admitted</th>
                  <th>Discharged</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  visible.map((item) => {
                    const patientName =
                      item.patient?.name ?? `Patient #${item.patient_id}`;
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{patientName}</td>
                        <td>
                          {item.doctor?.user?.name ?? `Doctor #${item.doctor_id}`}
                        </td>
                        <td>
                          {item.ward?.name ?? "—"} / {item.bed?.bed_number ?? "—"}
                        </td>
                        <td>{formatDateTime(item.admission_date) || "—"}</td>
                        <td>{formatDateTime(item.discharge_date) || "—"}</td>
                        <td>
                          <span
                            className={`badge ${admissionStatusBadgeClass(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/admission-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-admission/${item.id}`}
                            title="Edit"
                            className="btn btn-sm btn-outline-secondary me-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({ id: item.id, name: patientName })
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
                  <td colSpan={5} className="border-bottom-0">
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
        title="Delete Admission"
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      >
        Are you sure you want to delete the admission of{" "}
        <strong>{deleteTarget?.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default AdmissionManage;
