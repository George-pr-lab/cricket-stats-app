import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { userConfig } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const userObjinit = {
    userid: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  };
  const [userObj, setUserObj] = useState(userObjinit);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ userid:String, firstname: string, lastname: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    // const userObj = {
    //   "username": formData.target.username.value,
    //   "password": formData.target.password.value,
    //   "confirmPassword": formData.target.confirmPassword.value,
    // };
    if (validateInput(formData)) {
      setIsRegistering(true);
      //delete formData.confirmPassword;
      console.log(`${userConfig.endpoint}/auth/register`);
      console.log(userObj);
      const res = await axios
        .post(`${userConfig.endpoint}/auth/register`, {
          userId: formData.userid,
          firstName: formData.firstname,
          lastName: formData.lastname,
          userPassword: formData.confirmPassword,
        })
        .catch((error) => {
          if (error.response) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
          } else {
            enqueueSnackbar(
              "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
              { variant: "error" }
            );
          }
        });
      setIsRegistering(false);
      if (res) {
        enqueueSnackbar("Registered successfully", { variant: "success" });
        navigate("/");
      }
    }
  };

  // validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (data.userid === "") {
      enqueueSnackbar("User Id is a required field", { variant: "error" });
      return false;
    } else if (data.userid.length < 5) {
      enqueueSnackbar("User Id must be at 5 characters", {
        variant: "error",
      });
      return false;
    } else if (data.firstname === "") {
      enqueueSnackbar("Firstname is a required field", { variant: "error" });
      return false;
    } else if (data.firstname.length < 2) {
      enqueueSnackbar("firstname must be at atleast 2 characters", {
        variant: "error",
      });
      return false;
    } else if (data.lastname === "") {
      enqueueSnackbar("Lastname is a required field", { variant: "error" });
      return false;
    } else if (data.lastname.length < 2) {
      enqueueSnackbar("Lastname must be at 2 characters", {
        variant: "error",
      });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return false;
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }
    return true;
  };

  if (localStorage.getItem("userId") !== null) navigate("/players");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <form
          className="formhandler"
          onSubmit={(e) => {
            e.preventDefault();
            register(userObj);
          }}
        >
          <Stack spacing={2} className="form">
            <h2 className="title">Register</h2>
            <TextField
              id="userid"
              label="User Id"
              variant="outlined"
              title="User Id"
              name="user id"
              placeholder="Enter User id"
              size="small"
              value={userObj.userid}
              onChange={(e) => {
                setUserObj({ ...userObj, userid: e.target.value });
              }}
            />
            <TextField
              id="firstname"
              data-testid="firstname"
              label="First Name"
              variant="outlined"
              title="Firstname"
              name="firstname"
              size="small"
              placeholder="Enter firstname"
              value={userObj.firstname}
              onChange={(e) => {
                setUserObj({ ...userObj, firstname: e.target.value });
              }}
            />
            <TextField
              data-testid="lastname"
              id="lastname"
              label="Last Name"
              variant="outlined"
              title="Lastname"
              name="lastname"
              size="small"
              placeholder="Enter lastname"
              value={userObj.lastname}
              onChange={(e) => {
                setUserObj({ ...userObj, lastname: e.target.value });
              }}
            />
            <TextField
              data-testid="password"
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              size="small"
              helperText="Password must be atleast 6 characters length"
              placeholder="Enter a password with minimum 6 characters"
              value={userObj.password}
              onChange={(e) => {
                setUserObj({ ...userObj, password: e.target.value });
              }}
            />
            <TextField
              data-testid="confirmPassword"
              id="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              value={userObj.confirmPassword}
              type="password"
              size="small"
              onChange={(e) => {
                setUserObj({ ...userObj, confirmPassword: e.target.value });
              }}
            />
            <p className="s-sction">
              Already have an account?{" "}
              <Link className="link-class" to="/">
                Login here
              </Link>
            </p>

            {isRegistering ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Button type="submit" className="button" variant="contained">
                Register Now
              </Button>
            )}
          </Stack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
