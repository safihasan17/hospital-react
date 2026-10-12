import { Link } from "react-router";

function BedEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Bed</h1>
              <p className="mb-0">Update this bed</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/beds" className="btn btn-primary">Go to Beds List</Link>
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
                  <label htmlFor="ward_id" className="form-label">Ward <span className="text-danger">*</span></label>
                  <select id="ward_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="bed_number" className="form-label">Bed number <span className="text-danger">*</span></label>
                  <input id="bed_number" type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                  <select id="status" className="form-select" required>
                    <option value="">Select…</option>
                    <option value="Available">Available</option><option value="Occupied">Occupied</option><option value="Reserved">Reserved</option><option value="Maintenance">Maintenance</option>
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

export default BedEdit;
