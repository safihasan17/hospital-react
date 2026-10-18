import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import type { Patient } from "../../../interfaces/Patient";
import ConfirmModal from "../../../components/ConfirmModoal";
import Loader from "../../../components/Loader";


function PatientManage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [loader, setLoder] = useState(true);

  function getall() {
    api
      .get("patients")
      .then(function (res) {
        setPatients(res.data.patients);
        setTotal(res.data.totalPatients);
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        setLoder(false);
      });
  }

  useEffect(() => {
    getall();
  }, []);

  
  const handleDelete = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  
  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`patients/${deleteTarget.id}`)
      .then(function () {
        setDeleteTarget(null);
        // alert(res.data.message);
        getall();
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        setDeleteTarget(null);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Patients</h1>
              <p className="mb-0">
                Manage patient records, contacts and blood groups
              </p>
            </div>
            <div>
              <Link to="/add-patient" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Patient
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-between">
            <input
              type="text"
              className="form-control"
              placeholder="Search patients..."
              style={{ maxWidth: "250px" }}
            />
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary">
                <i className="bi bi-file-earmark-excel"></i> Excel
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-file-earmark-pdf"></i> PDF
              </button>
            </div>
          </div>
          <div className="card table-responsive">
            <table className="table mb-0 text-nowrap table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Blood</th>
                  <th>Date of birth</th>
                  <th>Phone</th>
                  <th>Guardian</th>
                  <th>Emergency contact</th>
                  <th>Address</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {loader ? (
                  <tr>
                    <td colSpan={10} className="text-center py-4">
                      <Loader />
                    </td>
                  </tr>
                ) : patients.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  patients.map((item) => (
                    <tr className="align-middle" key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.gender}</td>
                      <td>{item.blood_group}</td>
                      <td>{item.dob?.slice(0, 10)}</td>
                      <td>{item.phone}</td>
                      <td>{item.guardian_name}</td>
                      <td>{item.emergency_contact}</td>
                      <td>{item.address}</td>
                      <td className="text-end text-nowrap">
                        <Link
                          to={`/patient-details/${item.id}`}
                          title="Details"
                          className="btn btn-sm btn-outline-primary me-1"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>

                        <Link
                          to={`/edit-patient/${item.id}`}
                          title="Edit"
                          className="btn btn-sm btn-outline-secondary me-1"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-bottom-0" colSpan={2}>
                    Showing {patients.length ? `1–${patients.length}` : "0–0"}{" "}
                    of {total}
                  </td>
                  <td colSpan={8} className="border-bottom-0">
                    <nav
                      aria-label="Page navigation"
                      className="d-flex justify-content-end"
                    >
                      <ul className="pagination mb-0">
                        <li className="page-item disabled">
                          <button className="page-link">Previous</button>
                        </li>
                        <li className="page-item active">
                          <button className="page-link">1</button>
                        </li>
                        <li className="page-item disabled">
                          <button className="page-link">Next</button>
                        </li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={deleteTarget !== null}
        title="Delete Patient"
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      >
        Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default PatientManage;