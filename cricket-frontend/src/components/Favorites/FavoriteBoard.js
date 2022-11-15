import React from "react";
// import { FavoriteCard } from "./FavoriteCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSnackbar } from "notistack";
import axios from "axios";
import { favConfig, playerConfig } from "../../App";
import { useEffect, useState } from "react";
import {
  DeleteOutline,
  Search,
  SentimentDissatisfied,
} from "@mui/icons-material";
import Footer from "../Footer";
import FavoriteCard from "./FavoriteCard";
import {
  CircularProgress,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Favorite from "@mui/icons-material/Favorite";
import { PlayerInfo } from "../Stats/PlayerInfo";

import { PlayerDetails } from "./PlayerDetails";

const FavoriteBoard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // const [addedFavorite, setAddedFavorite] = useState([]);
  const [fetchedFavorite, setFetchedFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStatView, setHasStatView] = useState(false);
  const [playerId, setPlyerId] = useState();
  const [statsTab, setStatsTab] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      if (localStorage.getItem("userId") && !hasStatView) {
        const getFavorite = await fetchFavorite(localStorage.getItem("token"));
        setFetchedFavorite(getFavorite);

        // setFavoriteList(generateFavoriteItemsFrom(getFavorite, getPlayers));
        // console.log();
      }
      setIsLoading(false);
    };
    callApi();
  }, []);

  // const newAdd = (player) => {
  //   setAddedFavorite([...addedFavorite, player]);
  // };

  const fetchFavorite2 = async (token) => {
    if (!token) return;

    try {
      //  Pass Bearer token inside "Authorization" header to get data from "GET /favorite" API and return the response data
      const url = `${favConfig.endpoint}/favourite/${localStorage.getItem(
        "userId"
      )}`;
      const res = axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("URI Fav::", `${favConfig.endpoint}/favourite`);
      // const res = await axios.get(`${favConfig.endpoint}/favourite`);
      //   console.log("Fetch Favorite::", res.data);
      return res.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        localStorage.clear();
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
        localStorage.clear();
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

  const deleteFavorite = async (token, item) => {
    // console.log("DeleteFavorite::", item);
    try {
      // console.log(token,items,players,playerId,options)
      if (!token) {
        enqueueSnackbar("Login to add an item to the Cart", {
          variant: "error",
        });
      } else {
        console.log("Delete URI::", item);
        const url = `${favConfig.endpoint}/favourite/${item.id}`;
        // const res = await axios.delete(
        //   `${favConfig.endpoint}/favourite/${item.id}`,
        //   {
        //     headers: { "Content-Type": "application/json" },
        //     Authorization: `Bearer ${token}`,
        //   }
        // );
        const res = await axios.delete(url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          //   console.log("Deleted::", item.id, item.name);
          const filteredPlayers = fetchedFavorite.filter(
            (fav) => fav.id !== item.id
          );
          //   console.log("post Delettion::", filteredPlayers);
          setFetchedFavorite(filteredPlayers);
          enqueueSnackbar(`Favorite Player ${item.name} deleted successfully`, {
            variant: "success",
          });
        }
      }
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.message, { variant: "error" });
      }
    }
  };

  const getStats = (token, player) => {
    setPlyerId(player.id);
    setHasStatView(true);

    // if (getPlayerInfo.) setStatsTab(getPlayerInfo.stats);
  };

  if (localStorage.getItem("userId") === null) navigate("/");

  return (
    <div>
      {/* <FavoriteCard /> */}
      <Header children>
        {hasStatView ? (
          <Button
            className="explore-button"
            style={{ color: "#ffff" }}
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => {
              setHasStatView(false);
              navigate("/favorites");
            }}
          >
            Back TO Favourites
          </Button>
        ) : (
          <Stack direction="row">
            <Button
              variant="text"
              style={{ color: "#ffff" }}
              onClick={() => navigate("/stats")}
            >
              Player Stats
            </Button>

            <Button
              variant="text"
              style={{ color: "#ffff" }}
              onClick={() => navigate("/players")}
            >
              Players Board
            </Button>
          </Stack>
        )}
      </Header>
      {hasStatView ? (
        <PlayerDetails playerID={playerId} />
      ) : (
        <Stack>
          <Grid container>
            <Grid item className="product-grid">
              <Box className="hero">
                <p className="hero-heading">
                  Your favorite{" "}
                  <span className="hero-highlight">CRICKET SQUAD'S</span>{" "}
                  details at your finger tip.
                </p>
              </Box>
            </Grid>
          </Grid>
          {isLoading ? (
            <Box className="loading">
              <CircularProgress />
              <p>Loading Favorites...</p>
            </Box>
          ) : fetchedFavorite.length === 0 ? (
            <Box spacing={2} className="loading">
              <SentimentDissatisfied />
              <p>You have not shortlisted your favorite players yet.</p>
            </Box>
          ) : fetchedFavorite === null ? (
            <Box spacing={2} className="loading">
              <SentimentDissatisfied />
              <p>We will be back soon..</p>
            </Box>
          ) : (
            <Grid container spacing={2} my={3}>
              {fetchedFavorite.map((item) => (
                <Grid
                  item
                  xs={6}
                  md={3}
                  key={item.id}
                  style={{ backgroundColor: "#E9F5E1" }}
                >
                  <FavoriteCard player={item} key={item.id} children>
                    <Button
                      fullWidth
                      className="card-button"
                      variant="contained"
                      // startIcon={<FavoriteIcon />}

                      startIcon={<DeleteOutline />}
                      onClick={() =>
                        deleteFavorite(localStorage.getItem("token"), item)
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      fullWidth
                      className="card-button"
                      variant="contained"
                      // startIcon={<FavoriteIcon />}
                      onClick={() =>
                        // getStats(localStorage.getItem("token"), item)
                        navigate(`/${item.id}`)
                      }
                    >
                      View Stats
                    </Button>
                  </FavoriteCard>
                </Grid>
              ))}
            </Grid>
          )}

          {/* <Footer /> */}
        </Stack>
      )}
    </div>
  );
};

export default FavoriteBoard;
