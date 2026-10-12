import { Link } from "react-router";

function AppointmentEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Appointment</h1>
              <p className="mb-0">Update this appointment</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/appointments" className="btn btn-primary">Go to Appointments List</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              {/* Add your own submit logic here (useState / API call) */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="patient_id" className="form-label">Patient <span className="text-danger">*</span></label>
                  <select id="patient_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="doctor_id" className="form-label">Doctor <span className="text-danger">*</span></label>
                  <select id="doctor_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="appointment_date" className="form-label">Date <span className="text-danger">*</span></label>
                  <input id="appointment_date" type="date" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="appointment_time" className="form-label">Time <span className="text-danger">*</span></label>
                  <input id="appointment_time" type="time" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                  <select id="status" className="form-select" required>
                    <option value="">Select…</option>
                    <option value="Scheduled">Scheduled</option><option value="Checked-in">Checked-in</option><option value="Waiting">Waiting</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="reason" className="form-label">Reason for visit</label>
                  <textarea id="reason" className="form-control" rows={3}></textarea>
                </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Save changes</button>
                  <button type="reset" className="btn btn-secondary">Clear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentEdit;
