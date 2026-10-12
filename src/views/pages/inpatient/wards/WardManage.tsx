import { Link } from "react-router";

function WardManage() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Wards</h1>
              <p className="mb-0">Hospital wards and how many beds are free</p>
            </div>
            <div>
              <Link to="/add-ward" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Add Ward</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-between">
            <input type="text" className="form-control" placeholder="Search wards..." style={{ maxWidth: "250px" }} />
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary"><i className="bi bi-file-earmark-excel"></i> Excel</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => window.print()}><i className="bi bi-file-earmark-pdf"></i> PDF</button>
            </div>
          </div>
          <div className="card table-responsive">
            <table className="table mb-0 text-nowrap table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Floor</th>
                  <th>Type</th>
                  <th>Beds (free / total)</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row — replace with your own data, e.g. rows.map((r) => ( ... )) */}
                {/*
                <tr className="align-middle">
                  <td>Name</td>
                  <td>Floor</td>
                  <td>Type</td>
                  <td>Beds (free / total)</td>
                  <td className="text-end text-nowrap"><Link to="/ward-details/1" title="Details" className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-eye"></i></Link><Link to="/edit-ward/1" title="Edit" className="btn btn-sm btn-outline-secondary me-1"><i className="bi bi-pencil"></i></Link><button type="button" className="btn btn-sm btn-outline-danger" title="Delete"><i className="bi bi-trash"></i></button></td>
                </tr>
                */}
                <tr><td colSpan={5} className="text-center text-muted py-4">No data yet.</td></tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-bottom-0" colSpan={2}>Showing 0–0 of 0</td>
                  <td colSpan={3} className="border-bottom-0">
                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
                      <ul className="pagination mb-0">
                        <li className="page-item disabled"><button className="page-link">Previous</button></li>
                        <li className="page-item active"><button className="page-link">1</button></li>
                        <li className="page-item disabled"><button className="page-link">Next</button></li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default WardManage;
