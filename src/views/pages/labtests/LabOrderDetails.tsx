import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../../api";
import {
  emptyLabOrder,
  labStatusBadgeClass,
  type LabOrder,
} from "../../../interfaces/LabOrder";
import { money, onlyDate } from "../../../utils/format";

function LabOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<LabOrder>(emptyLabOrder());
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    api
      .get(`lab-test-orders/${id}`)
      .then(function (res) {
        setOrder(res.data.labTestOrder);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const handleGenerateInvoice = () => {
    api
      .post(`lab-test-orders/${id}/generate-invoice`)
      .then(function (res) {
        navigate(`/invoice-details/${res.data.invoice_id}`);
      })
      .catch(function (err) {
        console.log(err.response?.data);
        setMessage(err.response?.data?.message ?? "Failed to generate invoice");
      });
  };

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Date", value: onlyDate(order.order_date) },
    { label: "Patient", value: order.patient?.name },
    { label: "Patient phone", value: order.patient?.phone },
    { label: "Doctor", value: order.doctor?.user?.name },
    { label: "Department", value: order.doctor?.department?.name },
    { label: "Test", value: order.test?.test_name },
    {
      label: "Test price",
      value: order.test?.price !== undefined ? money(order.test.price) : "",
    },
    {
      label: "Prescription",
      value: order.prescription_id ? `#${order.prescription_id}` : "",
    },
  ];

  return (
    <>
      {message && (
        <div
          className="alert alert-danger alert-dismissible no-print"
          role="alert"
        >
          {message}
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
              <h1 className="fs-3 mb-1">Lab order</h1>
              <p className="mb-0">Lab order details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleGenerateInvoice}
              >
                <i className="bi bi-receipt"></i> Generate invoice
              </button>
              <Link
                to={`/edit-lab-order/${id}`}
                className="btn btn-outline-primary"
              >
                <i className="bi bi-pencil"></i> Edit
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer"></i> Print
              </button>
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
              <div className="row">
                {fields.map((f) => (
                  <div className="col-md-6 mb-4" key={f.label}>
                    <div className="text-muted small mb-1">{f.label}</div>
                    <div className="fw-medium">{f.value || "—"}</div>
                  </div>
                ))}
                <div className="col-md-6 mb-4">
                  <div className="text-muted small mb-1">Status</div>
                  <div className="fw-medium">
                    {order.id ? (
                      <span
                        className={`badge ${labStatusBadgeClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="text-muted small mb-1">Result</div>
                  <div className="fw-medium" style={{ whiteSpace: "pre-wrap" }}>
                    {order.result || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabOrderDetails;
