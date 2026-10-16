import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import type { Prescription } from "../../../interfaces/Prescription";
import ConfirmModal from "../../../components/ConfirmModoal";

// "2026-10-16T00:00:00.000000Z" -> "2026-10-16"
const onlyDate = (value?: string | null) => (value ?? "").split("T")[0];

function PrescriptionManage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [total, setTotal] = useState(0);
  const [issuedToday, setIssuedToday] = useState(0);
  const [issuedThisMonth, setIssuedThisMonth] = useState(0);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function getall() {
    api
      .get("prescriptions")
      .then(function (res) {
        setPrescriptions(res.data.prescriptions);
        setTotal(res.data.totalPrescriptions);
        setIssuedToday(res.data.issuedToday);
        setIssuedThisMonth(res.data.issuedThisMonth);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getall();
  }, []);

  const handleDelete = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`prescriptions/${deleteTarget.id}`)
      .then(function () {
        setDeleteTarget(null);
        getall();
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  // search: patient ba doctor-er nam diye (list-er upor)
  const q = search.trim().toLowerCase();
  const visible = prescriptions.filter((p) => {
    if (!q) return true;
    return (
      (p.patient?.name ?? "").toLowerCase().includes(q) ||
      (p.doctor?.user?.name ?? "").toLowerCase().includes(q)
    );
  });

  const statCards = [
    { label: "Total prescriptions", value: total },
    { label: "Issued today", value: issuedToday },
    { label: "Issued this month", value: issuedThisMonth },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Prescriptions</h1>
              <p className="mb-0">Medicines and lab tests prescribed to patients</p>
            </div>
            <div>
              <Link to="/add-prescription" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Prescription
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
              placeholder="Search patient or doctor..."
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
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Medicines</th>
                  <th>Lab tests</th>
                  <th>Admission advised</th>
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
                    const doctorName =
                      item.doctor?.user?.name ?? `Doctor #${item.doctor_id}`;
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{onlyDate(item.prescription_date)}</td>
                        <td>{patientName}</td>
                        <td>{doctorName}</td>
                        <td>{item.prescription_medicines_count ?? 0}</td>
                        <td>{item.lab_test_orders_count ?? 0}</td>
                        <td>
                          {item.admission_advised ? (
                            <span className="badge bg-warning text-dark">Yes</span>
                          ) : (
                            <span className="badge bg-secondary">No</span>
                          )}
                        </td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/prescription-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          <Link
                            to={`/edit-prescription/${item.id}`}
                            title="Edit"
                            className="btn btn-sm btn-outline-secondary me-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item.id, `${patientName} (${onlyDate(item.prescription_date)})`)
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
                    {total}
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
        title="Delete Prescription"
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      >
        Are you sure you want to delete the prescription of{" "}
        <strong>{deleteTarget?.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default PrescriptionManage;