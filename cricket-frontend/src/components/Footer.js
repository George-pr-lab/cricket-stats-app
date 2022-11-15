import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Box>
        <img src="logo_dark.svg" className="footer-svg" alt="crick-icon"></img>
      </Box>
      <p className="footer-text">
        Cricket App is your one stop solution to the find the latest trending info.
      </p>
    </Box>
  );
};

export default Footer;
