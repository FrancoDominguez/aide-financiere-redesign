import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const AppDrawer = ({ open, toggleDrawer }) => {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <List sx={{ width: 250 }}>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/landing">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/login">
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/signup">
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/my-account">
            <ListItemText primary="My Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/application">
            <ListItemText primary="Application" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;