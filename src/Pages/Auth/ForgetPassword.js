import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../Global";
import * as yup from "yup";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../../Components/Layout/Layout";

const loginValidationSchema = yup.object({
  email: yup.string().email().required().min(6),
  newPassword: yup.string().required().min(6),
  answer: yup.string().required().min(2),
});

function ForgetPassword() {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        newPassword: "",
        answer: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const login = await axios.post(
            `${API}/api/user/forgot-password`,
            values
          );

          if (login && login.data.success) {
            toast.success(login.data.message);
            navigate("/login");
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

  const btnstyle = { margin: "8px 0" };
  return (
    <Layout>
      <Grid>
        <Toaster />
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <h2 className="fw-bold my-3">Reset Passowrd</h2>
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
              label="New Password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.newPassword && !!errors.newPassword}
              helperText={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : null
              }
              className="mb-3"
              type="password"
              fullWidth
              required
            />
            <TextField
              label="Enter your Favorite Food Name"
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              className="my-2"
            >
              Reset Password
            </Button>
          </form>

          <Typography className="text-center p-2">
            <Link to={"/login"}>Login</Link>
          </Typography>
        </Paper>
      </Grid>
    </Layout>
  );
}

export default ForgetPassword;