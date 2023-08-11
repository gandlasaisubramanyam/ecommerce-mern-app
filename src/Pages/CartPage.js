import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../Global";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      // eslint-disable-next-line
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API}/api/products/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(`${API}/api/products/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="row justify-content-center p-2">
        <div className="my-2">
          <h3 className="text-center  mb-2">
            {!auth?.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
          </h3>
          <p className="text-center">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : "Your Cart Is Empty"}
          </p>
          <p className="text-center">
            <b>Card Number :</b>4242 4242 4242 4242 and <b>CVV:</b>123
          </p>
        </div>
        <div className="col-md-6 ">
          {cart?.map((p) => (
            <div className="d-flex border-bottom border-dark" key={p._id}>
              <div className="text-left m-1 w-100">
                <h5 className="fw-bold text-capitalize">{p.name}</h5>
                <p>{p.description.substring(0, 30)}</p>
                <p>
                  Price :{" "}
                  <span className="card-price px-2">
                    {" "}
                    {p?.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}{" "}
                  </span>
                </p>
              </div>
              <div className="m-1 w-100 d-flex align-items-center justify-content-center">
                <img
                  src={p.photo}
                  style={{ height: "100px", width: "100px" }}
                  alt={p.name}
                />
              </div>

              <div className="m-1 w-100 d-flex align-items-center justify-content-center">
                <IconButton
                  aria-label="delete"
                  onClick={() => removeCartItem(p._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : {totalPrice()} </h4>
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h6>Current Address :</h6>
                <p className="text-uppercase">{auth?.user?.address}</p>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Change Address
                </button>
              </div>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Plase Login to checkout
                </button>
              )}
            </div>
          )}
          <div className="mt-2">
            {!clientToken || !auth?.token || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing ...." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;