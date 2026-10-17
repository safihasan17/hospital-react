import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../../api";
import {
  bedToPayload,
  defaultBed,
  errorBed,
  type Bed,
} from "../../../../interfaces/Bed";
import { useBedOptions } from "../../../../hooks/UseBedOptions";
import ConfirmModal from "../../../../components/ConfirmModoal";
import BedForm from "../../../../components/BedForm";

function BedEdit() {
  const { id } = useParams();
  const { wards } = useBedOptions();
  const [item, setItem] = useState<Bed>({ ...defaultBed });
  const [error, setError] = useState(errorBed);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`beds/${id}`)
      .then(function (res) {
        const x = res.data.bed;
        // DB-r null value gulo form-er jonno "" kore nei
        setItem({ ...defaultBed, ...x });
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
      .put(`beds/${id}`, bedToPayload(item))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorBed);
          navigate("/beds");
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
              <h1 className="fs-3 mb-1">Edit Bed</h1>
              <p className="mb-0">Update this bed</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/beds" className="btn btn-primary">
                Go to Beds List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <BedForm
                data={item}
                setData={setItem}
                wards={wards}
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
        title="Update Bed"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update this bed?
      </ConfirmModal>
    </>
  );
}

export default BedEdit;
