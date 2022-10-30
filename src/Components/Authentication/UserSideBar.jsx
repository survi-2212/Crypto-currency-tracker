import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Box, Button, styled } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Config/firebaseConfig";
import { numberWithCommas } from '../CoinTable'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { doc, setDoc } from "firebase/firestore";

const Container = styled(Box)({
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
});

const Profile = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
});

const Picture = styled(Avatar)({
  width: 200,
  height: 200,
  cursor: "pointer",
  backgroundColor: "#EEBC1D",
  objectFit: "contain",
});

const LogOut = styled(Button)({
  height: "8%",
  width: "100%",
  backgroundColor: "#EEBC1D",
  marginTop: 20,
});

const WatchList = styled(Box)({
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
});

const CoinBox = styled(Box)({
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
})

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist,coins,symbol } = CryptoState();
//   console.log(user)
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    setTimeout(() => {
      signOut(auth);

      setAlert({
        open: true,
        type: "success",
        message: "Logout Successful",
      });
      toggleDrawer();
    }, 1000);
  };



  const removeFromWatchlist = async (coin) => {
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


  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container>
              <Profile>
                <Picture
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>

                <WatchList>
                  <span
                    style={{
                      fontSize: 15,
                      textShadow: "0 0 5px black",
                    }}
                  >
                    Watchlist
                  </span>
                    {coins.map(coin=>{
                      if(watchlist.includes(coin.id)){
                        return (
                          <CoinBox>
                            <span>{coin.name}</span>
                            <span
                            style={{display:'flex',gap: 8}}
                            >{symbol}</span>
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <DeleteOutlineIcon
                              style={{cursor: 'pointer'}}
                              fontSize= '16'
                              onClick={()=>removeFromWatchlist(coin)}
                            />
                          </CoinBox>
                        )
                      }
                    })}

                </WatchList>
              </Profile>

              <LogOut variant="contained" onClick={logout}>
                Log Out
              </LogOut>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
