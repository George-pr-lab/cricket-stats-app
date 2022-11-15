import { Box, Grid } from "@mui/material";
import React from "react";
import "./PlayerStats.css";

export const PlayerStats = ({ bbstatsInfo, playerType }) => {
  return (
    <Grid container spacing={-44} my={8}>
      <Box>
        <table
          id="table"
          class="table text-white table-sm caption-top"
          style={{ width: "40%" }}
        >
          <caption>{playerType}</caption>
          <thead>
            <tr>
              {bbstatsInfo.map((column, index) => (
                <th key={index} scope="col">
                  {column.stat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {bbstatsInfo.map((row, index) => (
                <td key={index}>{row.value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Box>
    </Grid>
  );
};
