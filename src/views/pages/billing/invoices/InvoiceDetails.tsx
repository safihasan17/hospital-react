import { Link } from "react-router";

function InvoiceDetails() {
  return (
    <>
      <div className="row no-print">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Invoice</h1>
              <p className="mb-0">Items, payments and the balance due</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/edit-invoice/1" className="btn btn-outline-secondary"><i className="bi bi-pencil"></i> Edit</Link>
              <button type="button" className="btn btn-outline-primary" onClick={() => window.print()}><i className="bi bi-printer"></i> Print</button>
              <Link to="/invoices" className="btn btn-primary">Back to list</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body p-4 row g-3">
          <div className="col-md-3"><div className="text-muted small">Patient</div><strong>—</strong></div>
          <div className="col-md-3"><div className="text-muted small">Date</div><strong>—</strong></div>
          <div className="col-md-2"><div className="text-muted small">Total</div><strong>৳0.00</strong></div>
          <div className="col-md-2"><div className="text-muted small">Paid</div><strong className="text-success">৳0.00</strong></div>
          <div className="col-md-2"><div className="text-muted small">Due</div><strong>৳0.00</strong></div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header bg-white fw-semibold">Items</div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead><tr><th>Type</th><th>Description</th><th className="text-end">Amount</th></tr></thead>
            <tbody>
              <tr><td colSpan={3} className="text-center text-muted py-3">No items yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-white fw-semibold">Payments</div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead><tr><th>Date</th><th>Method</th><th>Status</th><th className="text-end">Amount</th></tr></thead>
            <tbody>
              <tr><td colSpan={4} className="text-center text-muted py-3">No payments yet.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InvoiceDetails;
