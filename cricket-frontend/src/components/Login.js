import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userConfig } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const loginObjinit = {
    userId: "",
    userPassword: "",
  };
  const [loginObj, setLoginObj] = useState(loginObjinit);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  // Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ userId: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "stackroute",
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    if (validateInput(formData)) {
      setIsLogin(true);
      const res = await axios
        .post(`${userConfig.endpoint}/auth/login`, formData)
        .catch((e) => {
          if (e.response) {
            enqueueSnackbar(e.response.data.message, { variant: "error" });
          } else {
            enqueueSnackbar(
              "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
              {
                variant: "error",
              }
            );
          }
        });
      setIsLogin(false);
      if (res) {
        const user = res.data;
        persistLogin(user.token, user.userId);
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        navigate("/players");
      }
    }
  };

  //  Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ userId: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if (data.userId === "") {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    } else if (data.userPassword === "") {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    return true;
  };

  //  user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username

   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, userId) => {
    // const myUser = {"token":token,"username":username}
    // localStorage.setItem("myUser",JSON.stringify(myUser))
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    //  localStorage
  };

  if (localStorage.getItem("userId")) navigate("/players");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header />
      <Box className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(loginObj);
          }}
        >
          <Stack spacing={2} className="form">
            <h2 className="title">Login</h2>
            <TextField
              id="username"
              label="Username"
              data-testid="Username"
              value={loginObj.userId}
              onChange={(e) => {
                setLoginObj({ ...loginObj, userId: e.target.value });
              }}
            />
            <TextField
              id="password"
              data-testid="password"
              label="Password"
              type="password"
              value={loginObj.userPassword}
              onChange={(e) => {
                setLoginObj({ ...loginObj, userPassword: e.target.value });
              }}
            />
            {isLogin ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Button className="button" variant="contained" type="submit">
                Login To Cricket App
              </Button>
            )}
            <p className="s-sction">
              Don’t have an account?
              <Link className="link" to="/register">
                {" "}
                Register now
              </Link>
            </p>
          </Stack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
