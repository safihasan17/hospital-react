import { Link } from "react-router";

function WardEdit() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit Ward</h1>
              <p className="mb-0">Update this ward</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/wards" className="btn btn-primary">Go to Wards List</Link>
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
                  <label htmlFor="name" className="form-label">Ward name <span className="text-danger">*</span></label>
                  <input id="name" type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="floor" className="form-label">Floor <span className="text-danger">*</span></label>
                  <input id="floor" type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="type" className="form-label">Type <span className="text-danger">*</span></label>
                  <input id="type" type="text" className="form-control" required />
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

export default WardEdit;
