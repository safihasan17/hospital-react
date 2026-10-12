import { Link } from "react-router";

function PaymentEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Payment</h1>
              <p className="mb-0">Update this payment</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/payments" className="btn btn-primary">Go to Payments List</Link>
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
                  <label htmlFor="amount" className="form-label">Amount <span className="text-danger">*</span></label>
                  <input id="amount" type="number" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="payment_method" className="form-label">Method <span className="text-danger">*</span></label>
                  <select id="payment_method" className="form-select" required>
                    <option value="">Select…</option>
                    <option value="Cash">Cash</option><option value="bKash">bKash</option><option value="Nagad">Nagad</option><option value="Rocket">Rocket</option><option value="Card">Card</option><option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="payment_date" className="form-label">Payment date <span className="text-danger">*</span></label>
                  <input id="payment_date" type="date" className="form-control" required />
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

export default PaymentEdit;
