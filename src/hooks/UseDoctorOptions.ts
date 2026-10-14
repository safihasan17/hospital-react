import { useEffect, useState } from "react";
import { api } from "../api";
import type { User } from "../interfaces/User";
import type { Department } from "../interfaces/Department";

// Doctor form-er dropdown-er jonno user ar department list ane
export function useDoctorOptions() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    api
      .get("users")
      .then(function (res) {
        setUsers(res.data.users);
      })
      .catch(function (err) {
        console.log(err);
      });

    api
      .get("departments")
      .then(function (res) {
        setDepartments(res.data.departments);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return { users, departments };
}