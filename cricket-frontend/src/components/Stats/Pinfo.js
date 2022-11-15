import { SentimentDissatisfied } from "@mui/icons-material";
// import { Box, Grid, Stack } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Stack,
} from "@mui/material";
import "./PlayerInfo.css";

export const Pinfo = ({ PlayerInf }) => {
  console.log("PlayerDetails::", PlayerInf);
  // } else setHasStatsData(false);
  // }, []);

  return (
    <div>
      <Box>
        <table
          className="table text-white table-right caption-top table-md"
          //   style={{ width: "40%" }}
        >
          <caption>Personal Information</caption>
          <thead>
            <tr>
              <th scope="col">Born</th>
              <th scope="col">Role</th>
              <th scope="col">BattingStyle</th>
              <th scope="col">BowlingStyle</th>
              <th scope="col">PlaceOfBirth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{PlayerInf.dateOfBirth}</td>
              <td>{PlayerInf.role}</td>
              <td>{PlayerInf.battingStyle}</td>
              <td>{PlayerInf.bowlingStyle}</td>
              <td>{PlayerInf.placeOfBirth}</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </Box>
    </div>
  );
};
