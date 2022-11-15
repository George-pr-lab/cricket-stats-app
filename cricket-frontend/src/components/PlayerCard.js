import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Avatar,
} from "@mui/material";
// import { MaterialIcons } from "@expo/vector-icons";
import { Box, Chip, Grid, Stack } from "@mui/material";
// import { Avatar, Button, Stack } from "@mui/material";
import React from "react";
import { Children } from "react";
import "./PlayerCard.css";

const PlayerCard = ({ children, player, handleAddToFavorite, ifExists }) => {
  return (
    <Card className="card">
      {/* <CardMedia      
      component="img"
      image="playercard5.png"
      alt="image"
      /> */}
      <Avatar src="avatar.png" alt={player.name} />
      <CardContent>
        <Typography data-testid="playername" variant="subtitle1" gutterBottom>
          {player.name}
        </Typography>
        <Typography
          data-testid="country"
          className="card-actions"
          style={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
          {player.country}
        </Typography>
        {/* <Rating value={player.country} readOnly/> */}
      </CardContent>
      <CardActions>
        {/* <Button fullWidth className="card-button" variant="contained" startIcon={<FavoriteIcon/>}
        onClick={handleAddToFavorite}
        >ADD TO Favorite</Button> */}
        {children}
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
