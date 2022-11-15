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
// import "./FavoriteCard.css";

const FavoriteCard = ({ children, player, handleAddToFavorite, ifExists }) => {
  return (
    <Card className="card">
      {/* <CardMedia      
      component="img"
      image="playercard5.png"
      alt="image"
      /> */}
      <Avatar src="avatar.png" alt={player.name} />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {player.name}
        </Typography>
        <Typography
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

    //     <Stack spacing={0.5}>
    //     <Typography variant="h6" color="textSecondary">
    //         Name
    //     </Typography>
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Typography variant="h4" color="inherit">
    //                 {player.name}
    //             </Typography>
    //         </Grid>

    //             <Grid item>
    //                 <Chip
    //                     variant="combined"
    //                     color="textSecondary"
    //                     // icon={
    //                     //     <>
    //                     //         {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
    //                     //         {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
    //                     //     </>
    //                     // }
    //                     label={player.country}
    //                     sx={{ ml: 1.25, pl: 1 }}
    //                     size="small"
    //                 />
    //             </Grid>

    //     </Grid>
    // </Stack>
  );
};

export default FavoriteCard;
