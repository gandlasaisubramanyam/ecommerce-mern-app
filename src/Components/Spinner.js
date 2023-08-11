import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">redirecting to you in {count} second</h1>
      <div className="spinner-border mt-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;