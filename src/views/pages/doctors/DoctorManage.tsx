import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import { doctorImageUrl, type Doctor } from "../../../interfaces/Doctor";
import ConfirmModal from "../../../components/ConfirmModoal";


function DoctorManage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function getall() {
    api
      .get("doctors")
      .then(function (res) {
        setDoctors(res.data.doctors);
        setTotal(res.data.totalDoctors);
      })
      .catch(function (err) {
        console.log(err);
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
      .delete(`doctors/${deleteTarget.id}`)
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
              <h1 className="fs-3 mb-1">Doctors</h1>
              <p className="mb-0">
                Doctors, their departments and consultation fees
              </p>
            </div>
            <div>
              <Link to="/add-doctor" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add Doctor
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
              placeholder="Search doctors..."
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
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Specialization</th>
                  <th>Qualification</th>
                  <th>Fee</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No data yet.
                    </td>
                  </tr>
                ) : (
                  doctors.map((item) => {
                    const name = item.user?.name ?? `Doctor #${item.id}`;
                    return (
                      <tr className="align-middle" key={item.id}>
                        <td>
                          {typeof item.image === "string" && item.image && (
                            <img
                              src={doctorImageUrl(item.image)}
                              alt=""
                              width={32}
                              height={32}
                              className="rounded-circle me-2 object-fit-cover"
                            />
                          )}
                          {name}
                        </td>
                        <td>{item.department?.name}</td>
                        <td>{item.specialization}</td>
                        <td>{item.qualification}</td>
                        <td>{item.consultation_fee}</td>
                        <td className="text-end text-nowrap">
                          <Link
                            to={`/doctor-details/${item.id}`}
                            title="Details"
                            className="btn btn-sm btn-outline-primary me-1"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          <Link
                            to={`/edit-doctor/${item.id}`}
                            title="Edit"
                            className="btn btn-sm btn-outline-secondary me-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, name)}
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-bottom-0" colSpan={2}>
                    Showing {doctors.length ? `1–${doctors.length}` : "0–0"} of{" "}
                    {total}
                  </td>
                  <td colSpan={4} className="border-bottom-0">
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
        title="Delete Doctor"
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

export default DoctorManage;