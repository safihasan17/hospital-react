import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Role } from "../../../interfaces/Role";
import { api } from "../../../api";
import { defaultUser, errorUser, type User } from "../../../interfaces/User";

import UserForm from "../../../components/UserForm";
import ConfirmModal from "../../../components/ConfirmModoal";

function UserAdd() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<User>({ ...defaultUser });
  const [error, setError] = useState(errorUser);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  // message 3 second pore nijei soriye jabe
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

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
    getRole();
  }, []);

  // form submit hole shudhu modal khulbe
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleClear = () => {
    setUser({ ...defaultUser });
    setError(errorUser);
  };

  // modal-er "Add User" button e click korle asol API call hobe
  const confirmAdd = () => {
    api
      .post("users", user)
      .then(function (res) {
        if (res.data.success) {
          setMessage({ type: "success", text: res.data.success });
          handleClear();
        }
      })
      .catch(function (err) {
        console.log(err.response?.data);
        if (err.response?.status === 422) {
          setError(err.response.data.errors);
        } else {
          setMessage({ type: "danger", text: "Failed to add user" });
        }
      })
      .finally(function () {
        setShowConfirm(false);
      });
  };

  return (
    <>
      {message && (
        <div
          className={`alert alert-${message.type} alert-dismissible`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Add User</h1>
              <p className="mb-0">Create a new user record</p>
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
                submitText="Add User"
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Add User"
        confirmText="Add User"
        confirmVariant="primary"
        onConfirm={confirmAdd}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to add <strong>{user.name || "this user"}</strong>?
      </ConfirmModal>
    </>
  );
}

export default UserAdd;