import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Role } from "../../../interfaces/Role";
import { api } from "../../../api";
import { defaultUser, errorUser, type User } from "../../../interfaces/User";
import UserForm from "../../../components/UserForm";
import ConfirmModal from "../../../components/ConfirmModoal";


function UserEdit() {
  const { id } = useParams();
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<User>({ ...defaultUser });
  const [error, setError] = useState(errorUser);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`users/${id}`)
      .then(function (res) {
        setUser(res.data.user);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getRole = () => {
    api
      .get("roles")
      .then(function (res) {
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

  // form submit hole shudhu modal khulbe
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // modal-er "Update" button e click korle asol API call hobe
  const confirmUpdate = () => {
    api
      .put("users/" + id, user)
      .then(function (res) {
        console.log(res.data);
        if (res.data.success) {
          setShowConfirm(false); // alert-er age modal bondho
          // alert(res.data.message);
          setUser(defaultUser);
          setError(errorUser);
          navigate("/users");
        }
      })
      .catch(function (err) {
        console.log(err.response?.data);
        if (err.response?.status === 422) {
          setError(err.response.data.errors);
        }
      })
      .finally(function () {
        setShowConfirm(false);
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
              <UserForm
                data={user}
                setData={setUser}
                roles={roles}
                error={error}
                onSubmit={handleSubmit}
                submitText="Update"
                showPassword={false}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Update User"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update <strong>{user.name}</strong>?
      </ConfirmModal>
    </>
  );
}

export default UserEdit;