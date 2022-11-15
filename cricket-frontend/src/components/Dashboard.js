import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import { Button, CircularProgress, Stack, TextField } from "@mui/material";
// import { Search } from "@mui/icons-material";
import { Favorite, Search, SentimentDissatisfied } from "@mui/icons-material";
import Header from "./Header";
import axios from "axios";
// import { PlayerCard } from './PlayerCard';
import PlayerCard from "./PlayerCard";
import Footer from "./Footer";
import { FavoriteBoard } from "./Favorites/FavoriteBoard";
import {
  CircularProgress,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { favConfig, playerConfig } from "../App";
import "./Dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  // const [addedFavorite, setAddedFavorite] = useState([]);
  // const [fetchedFavorite, setFetchedFavorite] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(0);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      const getPlayers = await performAPICall();
      setIsLoading(false);
      setPlayers(getPlayers);
      if (localStorage.getItem("userId")) {
        const getFavorite = await fetchFavorite(localStorage.getItem("token"));
        setFavoriteList(getFavorite);
        //   // setFavoriteList(generateFavoriteItemsFrom(getFavorite, getPlayers));
      }
    };
    callApi();
  }, []);

  const performAPICall = async () => {
    try {
      const res = await axios.get(`${playerConfig.endpoint}`);
      // console.log("res.data::", res.data.data);
      return res.data.data;
      // return res.data[0].data;
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      return null;
    }
  };

  const performSearch = async (text) => {
    let erres = null;
    try {
      console.log(
        "Search.data.URL::",
        `${playerConfig.endpoint}/search=${text}`
      );
      const res = await axios.get(`${playerConfig.endpoint}&search=${text}`);
      // const res = await axios.get(`${playerConfig.endpoint}?search=${text}`);
      if (res) {
        // console.log("Search.data::", res.data[0].data);
        return res.data.data;
        // return res.data[0].data;
      }
    } catch (err) {
      if (err.response) {
        erres = err.response;
      } else {
        console.log(err);
      }
    }
    if (erres) {
      return erres.data;
    }
  };

  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimeout !== 0) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(async () => {
      setPlayers(await performSearch(event));
    }, 500);
    setDebounceTimeout(timeout);
  };

  const addToFavorite = async (
    token,
    items,
    player,
    playerId,
    options = { preventDuplicate: false }
  ) => {
    console.log("addToFavorite::", items);
    try {
      // console.log(token,items,players,playerId,options)
      if (!token) {
        enqueueSnackbar("Login to add an item to the Cart", {
          variant: "error",
        });
      } else if (options.preventDuplicate && isItemInFavorite(playerId)) {
        enqueueSnackbar("Item already in favorite. try adding new favorite", {
          variant: "error",
        });
      } else {
        // console.log(token, items, players, playerId, options);
        player = {
          ...player,
          favouriteCreatedBy: localStorage.getItem("userId"),
          // favId: player.id,
        };
        const url = `${favConfig.endpoint}/favourite`;

        console.log("player::", player);
        // const res = await axios.post(
        //   `${favConfig.endpoint}/favourite`,
        //   player,
        //   { withCredentials: false },
        //   {
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Content-type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        const res = await axios.post(url, player, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // const res = await axios.post(`${favConfig.endpoint}/favourite`, player);
        if (res.status === 201) {
          setFavoriteList([...favoriteList, player]);
          enqueueSnackbar(`Favorite Player ${player.name} added successfully`, {
            variant: "success",
          });
        }
        if (res.status === 400) {
          enqueueSnackbar(`Bad Request ${res.headers}`, {
            variant: "error",
          });
        }
      }
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.message, { variant: "error" });
      }
    }
  };

  const fetchFavorite = async (token) => {
    if (!token) return;

    try {
      //  Pass Bearer token inside "Authorization" header to get data from "GET /favorite" API and return the response data
      // const res = await axios.get(
      //   `${favConfig.endpoint}/favourite`

      // { withCredentials: false },
      // {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      //   },
      // }
      // );
      // console.log("URI Fav::", `${favConfig.endpoint}/favourite`);

      // const res = await axios.get(
      //   `${favConfig.endpoint}/favourite/${localStorage.getItem("userId")}`,
      //   {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   }
      // );
      const url = `${favConfig.endpoint}/favourite/${localStorage.getItem(
        "userId"
      )}`;
      const res = await axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // const res = await axios.get(
      //   `${favConfig.endpoint}/favourite/${localStorage.getItem("userId")}`
      // );

      //   console.log("Fetch Favorite::", res.data);
      return res.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        // localStorage.clear();
      } else {
        enqueueSnackbar(
          "Could not fetch favorite details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return [];
    }
  };

  const isItemInFavorite = (playerId) => {
    if (favoriteList.filter((item) => item.id === playerId).length > 0) {
      return true;
    }
    return false;
  };
  if (localStorage.getItem("userId") === null) navigate("/");
  return (
    <div>
      <Header children>
        <TextField
          className="search-desktop"
          size="small"
          onChange={(e) => {
            debounceSearch(e.target.value, debounceTimeout);
          }}
          style={{ backgroundColor: "#ffff" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for Player"
          name="search"
          color="primary"
        />
        <Button
          variant="text"
          style={{ color: "#ffff" }}
          onClick={() => navigate("/stats")}
        >
          Player Stats
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
      </Header>
      {/* <Grid item md={localStorage.getItem("username")?9:12}> */}
      <Grid container>
        <Grid data-testid="playergrid" item className="product-grid">
          <Box className="hero">
            <p className="hero-heading">
              World’s <span className="hero-highlight">CRICKET SQUAD'S</span>{" "}
              details at your finger tip.
            </p>
          </Box>
        </Grid>
      </Grid>
      {isLoading ? (
        <Box className="loading">
          <CircularProgress />
          <p>Loading Players...</p>
        </Box>
      ) : players.length === 0 ? (
        <Box spacing={2} className="loading">
          <SentimentDissatisfied />
          <p>No players found</p>
        </Box>
      ) : players === null ? (
        <Box spacing={2} className="loading">
          <SentimentDissatisfied />
          <p>You have reached maximum hits for the day</p>
        </Box>
      ) : (
        <Grid container spacing={2} my={3}>
          {players.map((item) => (
            <Grid
              item
              xs={6}
              md={3}
              key={item.id}
              style={{ backgroundColor: "#E9F5E1" }}
            >
              <PlayerCard
                player={item}
                // handleAddToFavorite={() => {
                //   addToFavorite(
                //     localStorage.getItem("token"),
                //     fetchedFavorite,
                //     players,
                //     item,
                //     item.id,
                //     { preventDuplicate: true }
                //   );
                // }}
                key={item.id}
                children
              >
                <Button
                  fullWidth
                  className="card-button"
                  variant="contained"
                  startIcon={
                    <FavoriteBorderOutlinedIcon />
                    // <FavoriteBorderOutlinedIcon />
                  }
                  onClick={() => {
                    addToFavorite(
                      localStorage.getItem("token"),
                      players,
                      item,
                      item.id,
                      { preventDuplicate: true }
                    );
                  }}
                >
                  {/* <MaterialIcons
            name={ifExists ? "favorite" : "favorite-outline"}
            size={32}
            color={"red"}
          /> */}
                  ADD TO Favorite
                </Button>
              </PlayerCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Footer />
    </div>
  );
};
