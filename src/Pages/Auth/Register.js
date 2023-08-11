import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../Global";
import * as yup from "yup";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";

const loginValidationSchema = yup.object({
  name: yup.string().required().min(4),
  email: yup.string().email().required().min(6),
  phone: yup.string().required().min(10),
  address: yup.string().required().min(6),
  answer: yup.string().required().min(2),
  password: yup.string().required().min(6),
});
const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        answer: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const res = await axios.post(`${API}/api/user/register`, values);
          if (res && res.data.success) {
            toast.success(res.data.message);
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Invalid Credential");
        }
      },
    });
  const paperStyle = {
    padding: 20,
    minHeight: "100vh",
    width: 380,
    margin: "40px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <Layout>
      <Grid>
        <Toaster />
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <h2 className="fw-bold my-2">Sign Up</h2>
          </Grid>
          <form onSubmit={handleSubmit} className="mt-3">
            <TextField
              label="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name ? errors.name : null}
              className="mb-3"
              type="text"
              fullWidth
              required
            />

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
              label="Phone Number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone ? errors.phone : null}
              className="mb-3"
              type="text"
              fullWidth
              required
            />

            <TextField
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && !!errors.address}
              helperText={
                touched.address && errors.address ? errors.address : null
              }
              className="mb-3"
              type="text"
              fullWidth
              required
            />
            <TextField
              label="What is your favorite Food Name ?"
              name="answer"
              value={values.answer}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.answer && !!errors.answer}
              helperText={
                touched.answer && errors.answer ? errors.answer : null
              }
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
              className="my-3"
            >
              Sign Up
            </Button>
          </form>
          <Typography className="text-center p-2">
            Already have an account ?
            <Link to="/" className="mx-2 fw-bold">
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Register;