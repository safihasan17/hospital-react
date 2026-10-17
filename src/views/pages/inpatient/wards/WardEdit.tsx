import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../../api";
import {
  wardToPayload,
  defaultWard,
  errorWard,
  type Ward,
} from "../../../../interfaces/Ward";
import { useWardOptions } from "../../../../hooks/UseWardOptions";
import ConfirmModal from "../../../../components/ConfirmModoal";
import WardForm from "../../../../components/WardForm";

function WardEdit() {
  const { id } = useParams();
  const options = useWardOptions();
  const [item, setItem] = useState<Ward>({ ...defaultWard });
  const [error, setError] = useState(errorWard);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`wards/${id}`)
      .then(function (res) {
        const x = res.data.ward;
        // DB-r null value gulo form-er jonno "" kore nei
        setItem({ ...defaultWard, ...x });
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
      .put(`wards/${id}`, wardToPayload(item))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorWard);
          navigate("/wards");
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
              <h1 className="fs-3 mb-1">Edit Ward</h1>
              <p className="mb-0">Update this ward</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/wards" className="btn btn-primary">
                Go to Wards List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <WardForm
                data={item}
                setData={setItem}
                options={options}
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
        title="Update Ward"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update this ward?
      </ConfirmModal>
    </>
  );
}

export default WardEdit;
