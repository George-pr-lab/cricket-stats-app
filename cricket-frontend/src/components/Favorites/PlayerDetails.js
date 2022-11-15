import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { playerConfig } from "../../App";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export const PlayerDetails = ({ playerID }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [playerInfo, setPlayerInfo] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const getInfo = performAPICall(playerID);
      setPlayerInfo(getInfo);
    };
    callApi();
  }, []);

  const performAPICall = async (playerId) => {
    try {
      const res = await axios.get(`${playerConfig.statEndpoint}${playerId}`);
      console.log("res.data::", res.data.data);
      return res.data.data;
      //   return res.data[0].data;
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      return null;
    }
  };

  return (
    <div>
      <div class="card bg-dark text-white">
        <div className="cardimg">
          <img src="statstheme.png" className="card-img" alt="ThemeCricket" />
          {/* <img src="playercard5.png" className="card-img" alt="ThemeCricket" /> */}
        </div>

        <div class="card-img-overlay">
          <h5 class="card-title">{playerInfo.name}</h5>
          <h8 class="card-title">{playerInfo.country}</h8>
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
                  <td>{playerInfo.dateOfBirth}</td>
                  <td>{playerInfo.role}</td>
                  <td>{playerInfo.battingStyle}</td>
                  <td>{playerInfo.bowlingStyle}</td>
                  <td>{playerInfo.placeOfBirth}</td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </Box>
        </div>
      </div>
    </div>
  );
};
