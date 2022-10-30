import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppBar, styled, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Config/firebaseConfig";
import { CryptoState } from "../../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GoogleBox = styled(Box)({
  
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 15,
  fontSize: 15,
  color: 'white',
  
});

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  //   console.log(value)
  const { setAlert } = CryptoState()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth,googleProvider).then(res=>{
      setAlert({
        open: true,
        message: `Sign up Successful. Welcome ${res.user.email}`,
        type:"success"
      })
      handleClose();
    }).catch(error=>{
      setAlert({
        open: true,
        message: error.message,
        type:"error"
      })
    })
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          width: 85,
          height: 40,
          backgroundColor: "#EEBC1D",
        }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{ borderRadius: 10 }}
            >
              <Tab label="Login" />
              <Tab label="Sign up" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <SignUp handleClose={handleClose} />}

          <GoogleBox>
            <span style={{marginTop:'10px'}}>OR</span>
            <GoogleButton
              style={{
                width: "100%",
                outline: "none",
              }}
              onClick={signInWithGoogle}
            />
          </GoogleBox>
        </Box>
      </Modal>
    </div>
  );
}
