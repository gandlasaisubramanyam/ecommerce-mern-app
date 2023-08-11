import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center row">
          <h1 className="display-1 fw-bold">404</h1>
          <div className="col">
            <p className="fs-3">
              <span className="text-danger">Opps!</span> Page not found.
            </p>
            <p className="lead">The page you’re looking for doesn’t exist.</p>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notfound;