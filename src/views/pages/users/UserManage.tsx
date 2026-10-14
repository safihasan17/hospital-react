import { useEffect, useState } from "react";
import { Link } from "react-router";
import { defaultUser, type User } from "../../../interfaces/User";
import { api } from "../../../api";
import ConfirmModal from "../../../components/ConfirmModoal";


function UserManage() {
  const [users, setUsers] = useState<User[]>([defaultUser]);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function getall() {
    api
      .get("users")
      .then(function (res) {
        // console.log(res.data.users);
        setUsers(res.data.users);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getall();
  }, []);

  // delete button click korle shudhu modal khulbe
  const handleDelete = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  // modal-er "Delete" button e click korle asol delete hobe
  const confirmDelete = () => {
    if (!deleteTarget) return;

    api
      .delete(`users/${deleteTarget.id}`)
      .then(function () {
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
              <h1 className="fs-3 mb-1">Users</h1>
              <p className="mb-0">Staff accounts and their roles</p>
            </div>
            <div>
              <Link to="/add-user" className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add User
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
              placeholder="Search users..."
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr className="align-middle" key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role?.name}</td>
                    <td>{item.active ? "active" : "inactive"}</td>
                    <td className="text-end text-nowrap">
                      <Link
                        to={`/users/${item.id}`}
                        title="Details"
                        className="btn btn-sm btn-outline-primary me-1"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>

                      <Link
                        to={`/users/${item.id}/edit`}
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
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-bottom-0" colSpan={2}>
                    {/* Showing 0–0 of 0 */}
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
        title="Delete User"
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

export default UserManage;