import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  defaultDoctor,
  doctorToFormData,
  errorDoctor,
  type Doctor,
} from "../../../interfaces/Doctor";
import { useDoctorOptions } from "../../../hooks/UseDoctorOptions";
import ConfirmModal from "../../../components/ConfirmModoal";
import DoctorForm from "../../../components/DoctorForm";

function DoctorEdit() {
  const { id } = useParams();
  const { users, departments } = useDoctorOptions();
  const [doctor, setDoctor] = useState<Doctor>({ ...defaultDoctor });
  const [error, setError] = useState(errorDoctor);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`doctors/${id}`)
      .then(function (res) {
        const d = res.data.doctor;
        // DB-r null value gulo form-er jonno "" kore nei
        setDoctor({
          ...defaultDoctor,
          ...d,
          department_id: d.department_id ?? "",
          specialization: d.specialization ?? "",
          qualification: d.qualification ?? "",
          consultation_fee: d.consultation_fee ?? "",
          image: d.image ?? null,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

 
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // modal-er "Update" button e click korle asol API call hobe.
  // File pathanor jonno POST + _method=PUT
  const confirmUpdate = () => {
    api
      .post(`doctors/${id}`, doctorToFormData(doctor, "PUT"))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false); // alert-er age modal bondho
          // alert(res.data.message);
          setError(errorDoctor);
          navigate("/doctors");
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
              <h1 className="fs-3 mb-1">Edit Doctor</h1>
              <p className="mb-0">Update this doctor</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/doctors" className="btn btn-primary">
                Go to Doctors List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <DoctorForm
                data={doctor}
                setData={setDoctor}
                users={users}
                departments={departments}
                error={error}
                onSubmit={handleSubmit}
                submitText="Save changes"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Update Doctor"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update{" "}
        <strong>{doctor.user?.name ?? "this doctor"}</strong>?
      </ConfirmModal>
    </>
  );
}

export default DoctorEdit;