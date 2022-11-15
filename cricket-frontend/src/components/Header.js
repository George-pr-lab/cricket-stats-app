import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Header.css";
import { Favorite } from "@mui/icons-material";
// import Footer from './Footer'

const Header = ({ children, hasHiddenAuthButtons }) => {
  const username = localStorage.getItem("userId");
  const navigate = useNavigate();
  return (
    <div>
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="Crick-icon"></img>
        </Box>
        {children}
        {hasHiddenAuthButtons ? (
          <Button
            className="explore-button"
            style={{ color: "#ffff" }}
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => {
              navigate("/");
            }}
          ></Button>
        ) : username ? (
          <Stack direction="row" alignItems="center">
            <Avatar src="avatar.png" alt={username} />
            <p
              style={{
                marginTop: "13px",
                width: "40%",
                color: "#ffff",
                fontSize: "small",
              }}
            >
              {username}
            </p>
            <Button
              variant="text"
              style={{ color: "#ffff" }}
              onClick={() => {
                //localStorage.removeItem("myUser");
                localStorage.clear();

                // window.location.href = "/login";
                navigate("/");
              }}
            >
              LOGOUT
            </Button>
          </Stack>
        ) : (
          <Stack direction="row">
            <Button
              variant="text"
              style={{ color: "#ffff" }}
              onClick={() => navigate("/")}
            >
              LOGIN
            </Button>
            <Button
              name="register"
              variant="contained"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </Button>
          </Stack>
        )}
      </Box>
      {/* <Footer /> */}
    </div>
  );
};

export default Header;
