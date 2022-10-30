import React from "react";
import {
  AppBar,
  styled,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSideBar from "./Authentication/UserSideBar";

const Title = styled(Typography)(({theme})=>({
  flex: 1,
  color: "gold",
  cursor: "pointer",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: '30px',

  [theme.breakpoints.down("sm")]: {
    fontSize: '13px',
    flex: 1,
    marginRight: '20px'
  },
}));


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    text: {
      main: '#fff'
    },
    mode: "dark",
  },
});

function Header() {
  const navigate = useNavigate();
  const { currency , setCurrency , user } = CryptoState()
// console.log(currency)
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate("/")} variant='h6'>Crypto Hunter</Title>
            <Select
              variant="outlined"
              value={currency}
              onChange={(e)=> setCurrency(e.target.value)}
              style={{ width: 100, height: 40, marginRight: 15 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ?<UserSideBar/> : <AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
