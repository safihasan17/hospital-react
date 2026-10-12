import { Link } from "react-router";

function MedicineAdd() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add Medicine</h1>
              <p className="mb-0">Create a new medicine record</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/medicines" className="btn btn-primary">Go to Medicines List</Link>
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
                  <label htmlFor="generic_name" className="form-label">Generic name</label>
                  <input id="generic_name" type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input id="category" type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="unit_price" className="form-label">Unit price</label>
                  <input id="unit_price" type="number" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="stock_quantity" className="form-label">Stock quantity <span className="text-danger">*</span></label>
                  <input id="stock_quantity" type="number" className="form-control" required />
                </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Add Medicine</button>
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

export default MedicineAdd;
