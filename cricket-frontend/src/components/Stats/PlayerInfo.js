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
// import "./Stats.css";
// import "./all.min.css";

export const PlayerInfo = ({
  PlayerInf,
  battingStats,
  bowlingStats,
  hasStatsData,
  hasPlayerData,
}) => {
  // const [hasStatsData, setHasStatsData] = useState(false);
  // const [battingStats, setBattingStats] = useState([]);
  // const [bowlingStats, setBowlingStats] = useState([]);

  // useEffect(() => {
  // if (PlayerInf.includes("stats")) {
  // setBattingStats(PlayerInf.stats.filter(({ fn }) => fn === "batting"));
  // setBowlingStats(PlayerInf.stats.filter(({ fn }) => fn === "bowling"));

  // const bats = PlayerInf.stats.filter((fn) => fn === "batting");

  console.log("PlayerDetails::", PlayerInf);
  // } else setHasStatsData(false);
  // }, []);

  return (
    <div>
      <div class="card bg-dark text-white">
        <div className="cardimg">
          <img src="statstheme.png" className="card-img" alt="ThemeCricket" />
          {/* <img src="playercard5.png" className="card-img" alt="ThemeCricket" /> */}
        </div>

        <div class="card-img-overlay">
          <h4 class="card-title">{PlayerInf.name}</h4>
          <h6 class="card-title">{PlayerInf.country}</h6>
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
          {hasStatsData ? (
            <div>
              <Grid container spacing={-44} my={8}>
                <Box>
                  <table
                    id="table"
                    class="table text-white table-sm caption-top"
                    style={{ width: "40%" }}
                  >
                    <caption>Batting Stats</caption>
                    <thead>
                      <tr>
                        {battingStats.map((column, index) => (
                          <th key={index} scope="col">
                            {column.stat}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {battingStats.map((row, index) => (
                          <td key={index}>{row.value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Grid>

              <Grid container spacing={-44} my={8}>
                <Box>
                  <table
                    id="table"
                    class="table text-white table-sm caption-top"
                    style={{ width: "40%" }}
                  >
                    <caption>Bowling Stats</caption>
                    <thead>
                      <tr>
                        {bowlingStats.map((column, index) => (
                          <th key={index} scope="col">
                            {column.stat}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {bowlingStats.map((row, index) => (
                          <td key={index}>{row.value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Grid>
            </div>
          ) : (
            <Box spacing={2} className="loading">
              <SentimentDissatisfied />
              <p>Stats coming soon....</p>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};
