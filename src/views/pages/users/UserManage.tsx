import { useEffect, useState } from "react";
import { Link } from "react-router";
import { defaultUser, type User } from "../../../interfaces/User";
import { api } from "../../../api";

function UserManage() {
  const [users, setUsers] = useState<User[]>([defaultUser]);

  function getall(){
    api
    .get("users")
    .then(function(res){
      // console.log(res.data.users);
      setUsers(res.data.users);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  useEffect(()=>{
    getall();
  },[]);
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
                {users.map((item)=>(

                <tr className="align-middle">
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.role?.name}</td>
                  <td>{item.active ? 'active' : 'inactive'}</td>
                  <td className="text-end text-nowrap">
                    <Link to="/user-details/1" title="Details" className="btn btn-sm btn-outline-primary me-1"><i className="bi bi-eye"></i></Link>

                    <Link to="/edit-user/1" title="Edit" className="btn btn-sm btn-outline-secondary me-1"><i className="bi bi-pencil"></i>

                    </Link><button type="button" className="btn btn-sm btn-outline-danger" title="Delete"><i className="bi bi-trash"></i></button>
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
    </>
  );
}

export default UserManage;
