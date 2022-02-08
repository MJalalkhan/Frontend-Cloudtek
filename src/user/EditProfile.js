import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Comps/Header";
import { useEffect } from "react";
import { useState } from "react";

const theme = createTheme();

export default function EditProfile() {
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState([]);

  let userId = localStorage.getItem("userId");
  useEffect(() => {
    fetch(`https://taskforum.herokuapp.com/api/users/${userId}`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setProfile(res.data);
        setName(res.data.name);
        console.log("Profile:", res);

        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      name: data.get("name"),
    };
    console.log("data obj ", obj);
    fetch(`https://taskforum.herokuapp.com/api/users/${userId}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success:", res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(profile.name);
                  setName(e.target.value);
                  console.log(e.target.value);
                }}
                id="name"
                label="Name"
                // focused="none"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="id"
                // required
                value={profile._id}
                fullWidth
                id="id"
                label="Id"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="email"
                value={profile.email}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
