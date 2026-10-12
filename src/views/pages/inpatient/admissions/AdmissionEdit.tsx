import { Link } from "react-router";

function AdmissionEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Admission</h1>
              <p className="mb-0">Update this admission</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/admissions" className="btn btn-primary">Go to Admissions List</Link>
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
                  <label htmlFor="ward_id" className="form-label">Ward <span className="text-danger">*</span></label>
                  <select id="ward_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="bed_id" className="form-label">Bed <span className="text-danger">*</span></label>
                  <select id="bed_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="admission_date" className="form-label">Admission date & time <span className="text-danger">*</span></label>
                  <input id="admission_date" type="datetime-local" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="discharge_date" className="form-label">Discharge date & time</label>
                  <input id="discharge_date" type="datetime-local" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                  <select id="status" className="form-select" required>
                    <option value="">Select…</option>
                    <option value="Admitted">Admitted</option><option value="Discharged">Discharged</option><option value="Transferred">Transferred</option>
                  </select>
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

export default AdmissionEdit;
