import React, { useState, useEffect } from "react";
import UserMenu from "../../Pages/user/UserMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { API } from "../../Global";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/user/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 my-3">
            <UserMenu />
          </div>
          <div className="col-md-9 my-3">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="table-responsive border shadow mb-3" key={i}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-md-6">
                    {o?.products?.map((p, i) => (
                      <div className="d-flex border-bottom border-dark" key={i}>
                        <div className="m-1 w-100 d-flex align-items-center justify-content-center">
                          <img
                            src={p.photo}
                            style={{ height: "100px", width: "100px" }}
                            alt={p.name}
                          />
                        </div>
                        <div className="text-left m-1 w-100">
                          <h6 className="text-capitalize">{p.name}</h6>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;