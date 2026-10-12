import { Link } from "react-router";

function PaymentDetails() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Payment</h1>
              <p className="mb-0">Payment details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link to="/edit-payment/1" className="btn btn-outline-primary"><i className="bi bi-pencil"></i> Edit</Link>
              <button type="button" className="btn btn-outline-secondary" onClick={() => window.print()}><i className="bi bi-printer"></i> Print</button>
              <Link to="/payments" className="btn btn-primary">Go to Payments List</Link>
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
                  <div className="text-muted small mb-1">Date</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Invoice</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Amount</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Method</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Gateway</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Transaction</div>
                  <div className="fw-medium">—</div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Status</div>
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

export default PaymentDetails;
