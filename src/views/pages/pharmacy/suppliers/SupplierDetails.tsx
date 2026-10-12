import { Link } from "react-router";

function SupplierDetails() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Supplier</h1>
              <p className="mb-0">Supplier details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link to="/edit-supplier/1" className="btn btn-outline-primary"><i className="bi bi-pencil"></i> Edit</Link>
              <button type="button" className="btn btn-outline-secondary" onClick={() => window.print()}><i className="bi bi-printer"></i> Print</button>
              <Link to="/suppliers" className="btn btn-primary">Go to Suppliers List</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Name</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Contact</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Address</div>
                  <div className="fw-medium">—</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupplierDetails;
