import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebaseConfig";

function SignUp({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Password do not match",
        type: "error",
      });
    }

    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: 'Sign Up Successful.',
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
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
        autoComplete="true"
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enetr Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUp;
