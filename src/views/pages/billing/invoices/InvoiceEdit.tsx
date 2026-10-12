import { Link } from "react-router";

function InvoiceEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Invoice</h1>
              <p className="mb-0">Update this invoice</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/invoices" className="btn btn-primary">Go to Invoices List</Link>
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
                  <label htmlFor="invoice_date" className="form-label">Invoice date <span className="text-danger">*</span></label>
                  <input id="invoice_date" type="date" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="admission_id" className="form-label">Admission (optional)</label>
                  <select id="admission_id" className="form-select">
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
                  <label htmlFor="total_amount" className="form-label">Total amount <span className="text-danger">*</span></label>
                  <input id="total_amount" type="number" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select id="status" className="form-select">
                    <option value="">Select…</option>
                    <option value="Active">Active</option><option value="Cancelled">Cancelled</option>
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

export default InvoiceEdit;
