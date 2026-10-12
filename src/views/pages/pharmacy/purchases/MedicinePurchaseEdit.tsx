import { Link } from "react-router";

function MedicinePurchaseEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Purchase</h1>
              <p className="mb-0">Update this purchase</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/purchases" className="btn btn-primary">Go to Medicine Purchases List</Link>
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
                  <label htmlFor="supplier_id" className="form-label">Supplier <span className="text-danger">*</span></label>
                  <select id="supplier_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="medicine_id" className="form-label">Medicine <span className="text-danger">*</span></label>
                  <select id="medicine_id" className="form-select" required>
                    <option value="">Select…</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity <span className="text-danger">*</span></label>
                  <input id="quantity" type="number" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="purchase_price" className="form-label">Purchase price (each) <span className="text-danger">*</span></label>
                  <input id="purchase_price" type="number" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="purchase_date" className="form-label">Purchase date <span className="text-danger">*</span></label>
                  <input id="purchase_date" type="date" className="form-control" required />
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

export default MedicinePurchaseEdit;
