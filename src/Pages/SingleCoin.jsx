import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { Singlecoin } from "../Config/api";
import { Box, Button, LinearProgress, styled, Typography } from "@mui/material";
import ChartInfo from "../Components/ChartInfo";
import parse from "html-react-parser";
import { numberWithCommas } from "../Components/CoinTable";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Desc = styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
});

const Heading = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "Montserrat",
  marginBottom: 20,
  fontsize: 50,
});

const MarketData = styled(Box)(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

function SingleCoin() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(Singlecoin(id));
    setCoin(data);
  };
  // console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to Watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch)=>watch !== coin?.id)
        
      },
      {merge: 'true'});
      setAlert({
        open: true,
        message: `${coin.name} Removed from Watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading>{coin?.name}</Heading>
        <Desc variant="subtitle">
          {parse(coin?.description.en.split(". ")[0])}
        </Desc>

        <MarketData>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">Rank:</Heading>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">Current Price:</Heading>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">Market Cap: </Heading>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

          {user && (
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Wishlist"}
            </Button>
          )}
        </MarketData>
      </Sidebar>

      {/* Chart */}
      <ChartInfo coin={coin} />
    </Container>
  );
}

export default SingleCoin;
