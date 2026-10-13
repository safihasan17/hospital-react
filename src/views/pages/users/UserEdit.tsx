import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Role } from "../../../interfaces/Role";
import { api } from "../../../api";
import { defaultUser, errorUser, type User } from "../../../interfaces/User";

function UserEdit() {
  const {id} = useParams();
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<User>({ ...defaultUser });
  const [error, setError] =  useState(errorUser);

  const getItem = () =>{
    api
       .get(`users/${id}`)
       .then(function(res){
        console.log(res.data)
       })
       .catch(function(err){
        console.log(err)
       })
  }

  const getRole = () => {
    api
      .get("roles")
      .then(function (res) {
        // console.log(res.data);
        setRoles(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getItem();
    getRole();
  }, []);

  const handleSubmit = () => {
    api
      .post("users", user)
      .then(function (res) {
        // console.log(res.data.success);
         if(res.data.success){
           alert(res.data.success);
          setUser(defaultUser);
          setError(errorUser);
            
         }

      })
      .catch(function (err) {
        console.log(err.response.data);
        if(err.response.status ===422){
            setError(err.response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Edit User</h1>
              <p className="mb-0">Update User</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/users" className="btn btn-primary">
                Go to Users List
              </Link>
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
                    <label htmlFor="name" className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                    <small className="text-danger"> {error.name? error.name[0] : ''}</small>
                  </div>
                 
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  <small className="text-danger"> {error.email? error.email[0] : ''}</small>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-control"
                      
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    />
                  <small className="text-danger"> {error.phone? error.phone[0] : ''}</small>
                  </div>


                  <div className="col-md-6 mb-3">
                    <label htmlFor="role_id" className="form-label">
                      Role <span className="text-danger">*</span>
                    </label>

                    <select
                      id="role_id"
                      className="form-select"
                      required
                      value={user.role_id || ""}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          role_id: Number(e.target.value),
                        })
                      }
                    >
                      <option>Select Role</option>
                      {roles.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  
                  </div>

                 
                  <div className="col-md-6 mb-3">
                    <div className="form-check form-switch">
                      <input
                        id="active"
                        type="checkbox"
                        className="form-check-input"
                        checked={Boolean(user.active)}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            active: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="active" className="form-check-label">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserEdit;
