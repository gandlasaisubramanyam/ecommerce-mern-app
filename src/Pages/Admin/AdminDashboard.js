import React from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 my-4">
            <div className="card w-75 p-3">
              <h3>
                <b>Admin Name :</b> {auth?.user?.name}{" "}
              </h3>
              <h3>
                <b>Admin Email :</b> {auth?.user?.email}{" "}
              </h3>
              <h3>
                <b>Admin Contact :</b> {auth?.user?.phone}{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;