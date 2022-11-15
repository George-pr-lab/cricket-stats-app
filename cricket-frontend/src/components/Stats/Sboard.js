// import React from "react";
// import React from 'react'
import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import { useSnackbar } from "notistack";
// import NativeSelect from "@material-ui/core/NativeSelect";
import "./StatsBoard.css";
import {
  CircularProgress,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import Header from "../Header";
import { playerConfig } from "../../App";
import { Favorite, SentimentDissatisfied } from "@mui/icons-material";
import { PlayerInfo } from "./PlayerInfo";
import { useParams } from "react-router-dom";
import { PlayerStats } from "./PlayerStats";
import { Box } from "@mui/system";
import { Pinfo } from "./Pinfo";

const Sboard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectPlayer, setSelectPlayer] = useState([]);
  const [playerDetails, setPlayerDetails] = useState([]);
  const [playerStats, SetPlayerStats] = useState([]);
  const [fHasStatView, setFHasStatView] = useState(false);
  const [bowlingStats, setBowlingStats] = useState([]);
  const [hasPlayerData, setHasPlayerData] = useState(false);
  const [statsAvailable, setStatsAvailable] = useState(false);
  const [pId, setPId] = useState("73c98e1b-e7f4-4a5e-91ff-c4fbf7af78fa");
  const { playerId } = useParams();

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      const getPlayerIds = await callPlayerList();
      const getPlayerStats = await performAPICall();
      setIsLoading(false);
      setSelectPlayer(getPlayerIds);
      setPlayerDetails(getPlayerStats);
      SetPlayerStats(getPlayerStats.stats);
    };
    // callApi();

    callApi();
  }, [pId, playerId]);

  const handleChange = (event) => {
    const plId = event.target.value;
    // console.log("Player ID::" + pId);
    setPId(plId);
    setStatsAvailable(true);
    event.preventDefault();
  };
  // const validatePlayerInfo = (getPlayerinfo) => {
  //   // if (Object.keys(getPlayerinfo).length > 1) {
  //   setPlayerDetails(getPlayerinfo);
  //   setHasPlayerData(true);
  //   return true;
  //   // } else return false;
  // };
  // const validateStats = (playerDetails) => {
  //   // if (Object.prototype.hasOwnProperty.call(playerDetails, "stats")) {
  //   //   SetPlayerStats(playerDetails.stats);
  //   //   setStatsAvailable(true);
  //   //   console.log("SetPlayerStats::", playerDetails.stats);
  //   //   return true;
  //   // } else return false;
  //   if (playerDetails["stats"]) {
  //     SetPlayerStats(playerDetails.stats);
  //     setStatsAvailable(true);
  //     return true;
  //   } else return false;
  // };

  const callPlayerList = async () => {
    try {
      const res = await axios.get(`${playerConfig.statPlayers}`);
      // console.log("res.data::", res.data[0].data);
      return res.data;
      // return res.data[0].data;
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      return null;
    }
  };

  const performAPICall = async () => {
    try {
      //   console.log("playerId::", playerId);
      playerId ? setFHasStatView(true) : setStatsAvailable(true);
      let url = `${playerConfig.statEndpoint}${playerId ? playerId : pId}`;
      //   console.log("url::", url);
      // console.log("Updated PlayerID::", playerId);
      const res = await axios.get(url);
      //   console.log("res.data::", res.data.data.name);
      return res.data.data;
      //   return res.data[0].data;
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      return null;
    }
  };

  if (localStorage.getItem("userId") === null) navigate("/");

  return (
    <div>
      <Header children>
        {fHasStatView ? (
          <Button
            className="explore-button"
            style={{ color: "#ffff" }}
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => {
              setFHasStatView(false);
              navigate("/favorites");
            }}
          >
            Back TO Favourites
          </Button>
        ) : (
          <Stack direction="row">
            <select
              name="player"
              className="form-control"
              style={{ width: "40%" }}
              onChange={(e) => handleChange(e)}
            >
              <option disabled="disabled" selected="selected">
                Default Player
              </option>
              {selectPlayer.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <Button
              variant="text"
              style={{ color: "#ffff" }}
              onClick={() => navigate("/players")}
            >
              Players Board
            </Button>
            <Button
              className="explore-button"
              style={{ color: "#ffff" }}
              startIcon={<Favorite />}
              variant="text"
              onClick={() => {
                navigate("/favorites");
              }}
            >
              Favourites
            </Button>
          </Stack>
        )}
        {/* </FormControl> */}
      </Header>
      {isLoading ? (
        <Box className="loading">
          <CircularProgress />
          <p>Loading Players...</p>
        </Box>
      ) : selectPlayer === null && playerDetails === null ? (
        <Box spacing={2} className="loading">
          <SentimentDissatisfied />
          <p>You have reached maximum hits for the day</p>
        </Box>
      ) : (
        <Box>
          <div class="card bg-dark text-white">
            <div className="cardimg">
              <img
                src="statstheme.png"
                className="card-img"
                alt="ThemeCricket"
              />
            </div>

            <div class="card-img-overlay">
              <h4 class="card-title">{playerDetails.name}</h4>
              <h6 class="card-title">{playerDetails.country}</h6>
              <Pinfo PlayerInf={playerDetails} />
              {statsAvailable | (playerStats != null) ? (
                <Box>
                  <PlayerStats
                    bbstatsInfo={playerStats.filter(
                      ({ fn }) => fn === "batting"
                    )}
                    playerType="Batting Stats"
                  />
                  <PlayerStats
                    bbstatsInfo={playerStats.filter(
                      ({ fn }) => fn === "bowling"
                    )}
                    playerType="Bowling Stats"
                  />
                </Box>
              ) : (
                <Box spacing={2} className="loading">
                  <SentimentDissatisfied />
                  <p>Stats coming soon....</p>
                </Box>
              )}
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Sboard;
