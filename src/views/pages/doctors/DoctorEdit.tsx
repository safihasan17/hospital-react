import { Link } from "react-router";

function DoctorEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Doctor</h1>
              <p className="mb-0">Update this doctor</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/doctors" className="btn btn-primary">Go to Doctors List</Link>
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
                  <label htmlFor="user_id" className="form-label">Doctor account (user with Doctor role) <span className="text-danger">*</span></label>
                  <select id="user_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="department_id" className="form-label">Department</label>
                  <select id="department_id" className="form-select">
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="specialization" className="form-label">Specialization</label>
                  <input id="specialization" type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="qualification" className="form-label">Qualification</label>
                  <input id="qualification" type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="consultation_fee" className="form-label">Consultation fee</label>
                  <input id="consultation_fee" type="number" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="image" className="form-label">Photo (max 500 KB)</label>
                  <input id="image" type="file" className="form-control" />
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

export default DoctorEdit;
