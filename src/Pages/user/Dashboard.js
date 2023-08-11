import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/auth";
import UserMenu from "./UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 mt-3">
              <h4 className="list-group-item ">
                Username :
                <span className="p-2 fw-bold text-capitalize">
                  {auth?.user?.name}
                </span>
              </h4>
              <h4 className="list-group-item ">
                Email : <span className="p-2 fw-bold">{auth?.user?.email}</span>
              </h4>
              <h4 className="list-group-item ">
                Contact :
                <span className="p-2 fw-bold">{auth?.user?.phone}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;