import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import Carousal from "./Carousal";

const MainContainer = styled(Box)({
  backgroundImage: "url(./banner.jpg)",
});

const BannerContainer = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const TagLine = styled(Box)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  height: "40%",
  justifyContent: "center",
});

function Banner() {
  return (
    <MainContainer>
      <BannerContainer>
        <TagLine>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favourite crypto currency
          </Typography>
        </TagLine>
        <Carousal />
      </BannerContainer>
    </MainContainer>
  );
}

export default Banner;
