import React, { useState } from "react";
import { Box, Button, TextField  } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../Config/firebaseConfig";

function Login({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = async ()=>{
    if(!email || !password){
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      })
    }

    try {
      const userData = await signInWithEmailAndPassword(auth,email,password)
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${userData.user.email}`,
        type: "success",
      })
      handleClose();
      
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
    return;

}

  return <Box
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "13px",
  }}
>
  <TextField
    variant="outlined"
    type="email"
    label="Enetr Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    fullWidth
  />
  <TextField
    variant="outlined"
    type="password"
    label="Enetr Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
  />
  

  <Button 
    variant="contained"
    size="large"
    style={{
        backgroundColor:'#EEBC1D'
    }}
    onClick={handleSubmit}
  >
    Login
  </Button>
</Box>;
}

export default Login;
