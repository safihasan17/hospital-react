import { Link } from "react-router";

function LabOrderAdd() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add Lab Order</h1>
              <p className="mb-0">Order one or more lab tests for a patient</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/lab-orders" className="btn btn-primary">Go to Lab Orders List</Link>
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
                  <label htmlFor="order_date" className="form-label">Order date <span className="text-danger">*</span></label>
                  <input id="order_date" type="date" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                  <select id="status" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="field4" className="form-label">Tests  <small className="text-muted fw-normal">— one order is created per test</small> <span className="text-danger">*</span></label>
                  <input id="field4" type="text" className="form-control" required />
                </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Add Lab Order</button>
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

export default LabOrderAdd;
