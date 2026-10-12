import { Link } from "react-router";

// Static dashboard — replace the placeholder numbers/rows with your own data later.
const stats = [
  { label: "Patients", icon: "people", tone: "primary", note: "registered patients" },
  { label: "Doctors", icon: "person-vcard", tone: "info", note: "on staff" },
  { label: "Today's appointments", icon: "calendar-check", tone: "warning", note: "scheduled for today" },
  { label: "Beds free", icon: "layout-sidebar", tone: "success", note: "available / total" },
];

const money = [
  { label: "Collected this month", icon: "cash-stack", tone: "success", note: "of billed", to: "/payments" },
  { label: "Billed this month", icon: "receipt", tone: "primary", note: "Invoices raised this month", to: "/invoices" },
  { label: "Total due", icon: "exclamation-circle", tone: "danger", note: "Unpaid balance on open invoices", to: "/invoices" },
];

function Dashboard() {
  return (
    <>
      <div className="page-head">
        <h1>Dashboard</h1>
        <span className="text-muted small">Hospital overview for today</span>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-6 col-xl-3" key={s.label}>
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className={`stat-icon bg-${s.tone}-subtle text-${s.tone}`}><i className={`bi bi-${s.icon}`} /></div>
                <div>
                  <div className="text-muted small">{s.label}</div>
                  <div className="fs-4 fw-bold">0</div>
                  <div className="text-muted small">{s.note}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">
        {money.map((c) => (
          <div className="col-lg-4" key={c.label}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div><div className="fs-4 fw-bold">৳0.00</div><div className="text-muted">{c.label}</div></div>
                  <div className={`stat-icon bg-${c.tone}-subtle text-${c.tone}`}><i className={`bi bi-${c.icon}`} /></div>
                </div>
                <div className="d-flex justify-content-between align-items-center small border-top pt-2 mt-3">
                  <span className="text-muted">{c.note}</span>
                  <Link to={c.to}>View</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header bg-white fw-semibold d-flex">Today's appointments<Link to="/appointments" className="ms-auto small fw-normal">View all</Link></div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 text-nowrap">
                <thead>
                  <tr><th>Time</th><th>Patient</th><th>Doctor</th><th>Department</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td colSpan={5} className="text-center text-muted py-4">No appointments today.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header bg-white fw-semibold d-flex">Ward occupancy<Link to="/wards" className="ms-auto small fw-normal">Wards</Link></div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-muted">No wards yet.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
