import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API } from "../../Global";
import * as yup from "yup";
import axios from "axios";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/auth";

const loginValidationSchema = yup.object({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(6),
});
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const login = await axios.post(`${API}/api/user/login`, values);

          if (login && login.data.success) {
            toast.success(login.data.message);
            setAuth({
              ...auth,
              user: login.data.user,
              token: login.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(login.data));
            navigate(location.state || "/");
          } else {
            toast.error(login.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Invalid Credential");
        }
      },
    });
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 380,
    margin: "50px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Layout>
      <Grid>
        <Toaster />
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle} className="mt-2">
              <LockOutlinedIcon />
            </Avatar>
            <h2 className="fw-bold my-3">Sign In</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email ? errors.email : null}
              className="mb-3"
              type="text"
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={
                touched.password && errors.password ? errors.password : null
              }
              className="mb-3"
              type="password"
              fullWidth
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              className="my-2"
            >
              Sign in
            </Button>
          </form>
          <Typography className="text-center p-2">
            <Link to="/forgot-password">Forgot password ?</Link>
          </Typography>
          <Typography className="text-center p-2">
            Don't have an account ?
            <Link to="/register" className="mx-2 fw-bold">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Login;