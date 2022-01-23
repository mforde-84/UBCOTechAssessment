import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, Apps } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function UbcoAppBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "inherit" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: "#5f6368" }}
            >
              <span style={{ color: "#71A3F7" }}>U</span>
              <span style={{ color: "#EA4335" }}>B</span>
              <span style={{ color: "#FCC934" }}>C</span>
              <span style={{ color: "#63BD7C" }}>O</span> Translate
            </Typography>
            <IconButton
              size="large"
              aria-label="select other apps"
              color="default"
            >
              <Apps />
            </IconButton>
            <IconButton size="large" aria-label="user account" color="default">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
