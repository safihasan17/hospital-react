import { Link } from "react-router";

function AppointmentDetails() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Appointment</h1>
              <p className="mb-0">Appointment details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link to="/edit-appointment/1" className="btn btn-outline-primary"><i className="bi bi-pencil"></i> Edit</Link>
              <button type="button" className="btn btn-outline-secondary" onClick={() => window.print()}><i className="bi bi-printer"></i> Print</button>
              <Link to="/appointments" className="btn btn-primary">Go to Appointments List</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Date</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Time</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Patient</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Doctor</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Status</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Reason</div>
                  <div className="fw-medium">—</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentDetails;
