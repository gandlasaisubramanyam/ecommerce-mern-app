import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoute from "./Components/Routes/AdminRoute";
import PrivateRoute from "./Components/Routes/Private";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminOrders from "./Pages/Admin/AdminOrders";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Register from "./Pages/Auth/Register";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Notfound from "./Pages/Auth/Notfound";
import Dashboard from "./Pages/user/Dashboard";
import Orders from "./Pages/user/Orders";
import Profile from "./Pages/user/Profile";
import ProductDetail from "./Pages/ProductDetail";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import Search from "./Pages/Search";
import CartPage from "./Pages/CartPage";
import About from "./Pages/About";
import Privacy from "./Pages/Privacy";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Privacy />} />

        {/* Users Route */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        {/* admin routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;