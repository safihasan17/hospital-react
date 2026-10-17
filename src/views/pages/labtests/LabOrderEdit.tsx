import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  labOrderToUpdatePayload,
  emptyLabOrder,
  errorLabOrder,
  type LabOrder,
} from "../../../interfaces/LabOrder";
import { useLabOrderOptions } from "../../../hooks/UseLabOrderOptions";
import { onlyDate } from "../../../utils/format";
import ConfirmModal from "../../../components/ConfirmModoal";
import LabOrderForm from "../../../components/LabOrderForm";

function LabOrderEdit() {
  const { id } = useParams();
  const options = useLabOrderOptions();
  const [item, setItem] = useState<LabOrder>(emptyLabOrder());
  const [error, setError] = useState(errorLabOrder);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const getItem = () => {
    api
      .get(`lab-test-orders/${id}`)
      .then(function (res) {
        const x = res.data.labTestOrder;
        // DB-r null value gulo form-er jonno "" kore nei
        setItem({
          ...emptyLabOrder(),
          ...x,
          test_id: x.test_id ?? "",
          result: x.result ?? "",
          order_date: onlyDate(x.order_date),
          lab_tests: [],
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
      .put(`lab-test-orders/${id}`, labOrderToUpdatePayload(item))
      .then(function (res) {
        if (res.data.success) {
          setShowConfirm(false);
          setError(errorLabOrder);
          navigate("/lab-orders");
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
              <h1 className="fs-3 mb-1">Edit Lab Order</h1>
              <p className="mb-0">Update this lab order</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/lab-orders" className="btn btn-primary">
                Go to Lab Orders List
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <LabOrderForm
                data={item}
                setData={setItem}
                options={options}
                mode="edit"
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
        title="Update Lab Order"
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onClose={() => setShowConfirm(false)}
      >
        Are you sure you want to update this lab order?
      </ConfirmModal>
    </>
  );
}

export default LabOrderEdit;
