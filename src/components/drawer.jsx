import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

const AppDrawer = ({ open, toggleDrawer }) => {
  const menuItems = [
    { text: "Home", href: "/landing" },
    { text: "Login", href: "/login" },
    { text: "Sign Up", href: "/signup" },
    { text: "My Account", href: "/my-account" },
    { text: "Application", href: "/application" },
  ];

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          backgroundColor: "#235893",
          color: "white",
          width: 280,
        },
      }}
    >
      <Box sx={{ pt: 2, pb: 2 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "1.1rem",
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
