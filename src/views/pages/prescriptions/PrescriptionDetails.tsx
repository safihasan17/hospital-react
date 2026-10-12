import { Link } from "react-router";

function PrescriptionDetails() {
  return (
    <>
      <div className="row no-print">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Prescription</h1>
              <p className="mb-0">Prescription details and medicines</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/edit-prescription/1" className="btn btn-outline-secondary"><i className="bi bi-pencil"></i> Edit</Link>
              <button type="button" className="btn btn-outline-primary" onClick={() => window.print()}><i className="bi bi-printer"></i> Print</button>
              <Link to="/prescriptions" className="btn btn-primary">Back to list</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body p-4 row g-3">
          <div className="col-md-3"><div className="text-muted small">Patient</div><strong>—</strong></div>
          <div className="col-md-3"><div className="text-muted small">Doctor</div><strong>—</strong></div>
          <div className="col-md-3"><div className="text-muted small">Date</div><strong>—</strong></div>
          <div className="col-md-3"><div className="text-muted small">Admission advised</div><strong>—</strong></div>
          <div className="col-12"><div className="text-muted small">Notes / diagnosis</div><div>—</div></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-white fw-semibold">Medicines</div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th><th>Instructions</th></tr></thead>
            <tbody>
              <tr><td colSpan={5} className="text-center text-muted py-3">No medicines yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PrescriptionDetails;
