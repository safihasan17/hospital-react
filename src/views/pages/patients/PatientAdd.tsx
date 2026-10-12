import { Link } from "react-router";

function PatientAdd() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add Patient</h1>
              <p className="mb-0">Create a new patient record</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/patients" className="btn btn-primary">Go to Patients List</Link>
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
                  <label htmlFor="name" className="form-label">Full name <span className="text-danger">*</span></label>
                  <input id="name" type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="dob" className="form-label">Date of birth</label>
                  <input id="dob" type="date" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select id="gender" className="form-select">
                    <option value="">Select…</option>
                    <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="blood_group" className="form-label">Blood group</label>
                  <select id="blood_group" className="form-select">
                    <option value="">Select…</option>
                    <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input id="phone" type="tel" className="form-control" placeholder="e.g. 01XXX-XXXXXX" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="emergency_contact" className="form-label">Emergency contact</label>
                  <input id="emergency_contact" type="tel" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="guardian_name" className="form-label">Guardian name</label>
                  <input id="guardian_name" type="text" className="form-control" />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea id="address" className="form-control" rows={3}></textarea>
                </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Add Patient</button>
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

export default PatientAdd;
