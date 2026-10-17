import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import {
  appointmentStatuses,
  formatTime,
  statusBadgeClass,
  type Appointment,
} from "../../../interfaces/Appointment";
import ConfirmModal from "../../../components/ConfirmModoal";

const onlyDate = (value?: string | null) => (value ?? "").split("T")[0];

function AppointmentManage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const getall = useCallback(() => {
    api
      .get("appointments", { params: { search, status } })
      .then(function (res) {
        setAppointments(res.data.appointments);
        setStats({
          today: res.data.todayCount,
          pending: res.data.pendingCount,
          completed: res.data.completedCount,
          cancelled: res.data.cancelledCount,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [search, status]);

  // search/status change hole 300ms pore notun kore ane
  useEffect(() => {
    const timer = setTimeout(getall, 300);
    return () => clearTimeout(timer);
  }, [getall]);

  const handleDelete = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`appointments/${deleteTarget.id}`)
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

  const statCards = [
    { label: "Today", value: stats.today },
    { label: "Pending", value: stats.pending },
    { label: "Completed", value: stats.completed },
    { label: "Cancelled", value: stats.cancelled },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Appointments</h1>
              <p className="mb-0">Book, track and bill patient appointments</p>
            </div>
            <div>
              <Link to="/add-appointment" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Appointment
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
            <div className="d-flex gap-2 ">
              <input
                type="text"
                className="form-control"
                placeholder="Search patient or doctor..."
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
                {appointmentStatuses.map((s) => (
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
                  <th>Date</th>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  appointments.map((item) => {
                    const patientName =
                      item.patient?.name ?? `Patient #${item.patient_id}`;
                    const doctorName =
                      item.doctor?.user?.name ?? `Doctor #${item.doctor_id}`;
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>{onlyDate(item.appointment_date)}</td>
                        <td>{formatTime(item.appointment_time)}</td>
                        <td>{patientName}</td>
                        <td>{doctorName}</td>
                        <td>
                          <span className={`badge ${statusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "220px" }}
                        >
                          {item.reason}
                        </td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/appointment-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          <Link
                            to={`/edit-appointment/${item.id}`}
                            title="Edit"
                            className="btn btn-sm btn-outline-secondary me-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                item.id,
                                `${patientName} with ${doctorName}`,
                              )
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
                    Showing{" "}
                    {appointments.length ? `1–${appointments.length}` : "0–0"}{" "}
                    of {appointments.length}
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
        title="Delete Appointment"
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      >
        Are you sure you want to delete the appointment of{" "}
        <strong>{deleteTarget?.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default AppointmentManage;
