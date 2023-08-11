import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Badge } from "antd";
import { useCart } from "../../Context/cart";
import SearchInput from "./SearchInput";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const HandleSumbit = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear();
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light rounded border-bottom shadow-nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <span className="fw-bold">
              <em className="text-danger">Asia Shop </em>
            </span>
            <LocalMallIcon color="error" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <SearchInput />
              <li className="nav-item d-flex align-items-center">
                <NavLink className="nav-link mx-3" to={"/"}>
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <NavLink className="nav-link mx-3" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item d-flex align-items-center">
                    <NavLink className="nav-link mx-3" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown d-flex align-items-center">
                    <a
                      className="nav-link mx-3 dropdown-toggle text-capitalize"
                      href="/dashboard"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/login"
                          onClick={HandleSumbit}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item mx-3 d-flex align-items-center">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    <ShoppingCartIcon />
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;