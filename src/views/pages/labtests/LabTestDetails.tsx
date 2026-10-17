import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import { defaultLabTest, type LabTest } from "../../../interfaces/LabTest";
import { money } from "../../../utils/format";

function LabTestDetails() {
  const { id } = useParams();
  const [labTest, setLabTest] = useState<LabTest>({ ...defaultLabTest });

  useEffect(() => {
    api
      .get(`lab-tests/${id}`)
      .then(function (res) {
        setLabTest(res.data.labTest);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const fields: { label: string; value?: string | number | null }[] = [
    { label: "Test", value: labTest.test_name },
    { label: "Price", value: labTest.id ? money(labTest.price) : "" },
  ];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h1 className="fs-3 mb-1">Lab test</h1>
              <p className="mb-0">Lab test details</p>
            </div>
            <div className="d-flex gap-2 no-print">
              <Link
                to={`/edit-lab-test/${id}`}
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
              <Link to="/lab-tests" className="btn btn-primary">
                Go to Lab Tests List
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabTestDetails;
