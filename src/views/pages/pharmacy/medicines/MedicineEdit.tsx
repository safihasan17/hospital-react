import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../../api";
import {
  medicineToPayload,
  defaultMedicine,
  errorMedicine,
  type Medicine,
} from "../../../../interfaces/Medicine";
import ConfirmModal from "../../../../components/ConfirmModoal";
import MedicineForm from "../../../../components/MedicineForm";

function MedicineEdit() {
  const { id } = useParams();
  const [item, setItem] = useState<Medicine>({ ...defaultMedicine });
  const [error, setError] = useState(errorMedicine);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`medicines/${id}`)
      .then(function (res) {
        const x = res.data.medicine;
        // DB-r null value gulo form-er jonno "" kore nei
        setItem({
          ...defaultMedicine,
          ...x,
          generic_name: x.generic_name ?? "",
          category: x.category ?? "",
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

  // modal-er "Update" button e click korle asol API call hobe
  const confirmUpdate = () => {
    api
      .put(`medicines/${id}`, medicineToPayload(item))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorMedicine);
          navigate("/medicines");
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
              <h1 className="fs-3 mb-1">Edit Medicine</h1>
              <p className="mb-0">Update this medicine</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/medicines" className="btn btn-primary">
                Go to Medicines List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <MedicineForm
                data={item}
                setData={setItem}
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
        title="Update Medicine"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update this medicine?
      </ConfirmModal>
    </>
  );
}

export default MedicineEdit;
