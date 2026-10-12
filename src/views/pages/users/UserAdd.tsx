import { Link } from "react-router";

function UserAdd() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add User</h1>
              <p className="mb-0">Create a new user record</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/users" className="btn btn-primary">Go to Users List</Link>
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
                  <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                  <input id="name" type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                  <input id="email" type="email" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">Phone <span className="text-danger">*</span></label>
                  <input id="phone" type="tel" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="role_id" className="form-label">Role <span className="text-danger">*</span></label>
                  <select id="role_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">Password (3–15 characters) <span className="text-danger">*</span></label>
                  <input id="password" type="password" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="password_confirmation" className="form-label">Confirm password <span className="text-danger">*</span></label>
                  <input id="password_confirmation" type="password" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-check form-switch">
                    <input id="active" type="checkbox" className="form-check-input" />
                    <label htmlFor="active" className="form-check-label">Active</label>
                  </div>
                </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Add User</button>
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

export default UserAdd;
