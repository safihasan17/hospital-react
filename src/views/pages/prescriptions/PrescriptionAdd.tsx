import { Link } from "react-router";

function PrescriptionAdd() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add Prescription</h1>
              <p className="mb-0">Write a new prescription with medicines and lab tests</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/prescriptions" className="btn btn-primary">Go to Prescriptions List</Link>
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
                  <label htmlFor="appointment_id" className="form-label">Appointment (optional)</label>
                  <select id="appointment_id" className="form-select">
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="prescription_date" className="form-label">Date <span className="text-danger">*</span></label>
                  <input id="prescription_date" type="date" className="form-control" required />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="notes" className="form-label">Notes / diagnosis</label>
                  <textarea id="notes" className="form-control" rows={3}></textarea>
                </div>
                <div className="col-12 mb-3">
                  <div className="form-check form-switch">
                    <input id="admission_advised" type="checkbox" className="form-check-input" />
                    <label htmlFor="admission_advised" className="form-check-label">Admission advised</label>
                  </div>
                </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Add Prescription</button>
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

export default PrescriptionAdd;
