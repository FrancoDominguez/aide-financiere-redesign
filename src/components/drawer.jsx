import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  Typography,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import {
  Home,
  AccountCircle,
  ExitToApp,
  Login,
  PersonAdd,
  Description,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const AppDrawer = ({ open, toggleDrawer }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toggleDrawer(false)();
    navigate("/login");
  };
  
  // Define menu items based on authentication status
  const getMenuItems = () => {
    if (isAuthenticated) {
      return [
        { text: "Home", href: "/landing", icon: <Home /> },
        { text: "My Account", href: "/my-account", icon: <AccountCircle /> },
        { text: "Application", href: "/application", icon: <Description /> },
      ];
    } else {
      return [
        { text: "Login", href: "/login", icon: <Login /> },
        { text: "Sign Up", href: "/signup", icon: <PersonAdd /> },
      ];
    }
  };
  
  const menuItems = getMenuItems();

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
      {/* User profile section if logged in */}
      {isAuthenticated && currentUser && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'white', color: '#235893' }}>
            {currentUser.firstName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {currentUser.email}
            </Typography>
          </Box>
        </Box>
      )}
      
      <Box sx={{ pt: 2, pb: 2 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.href);
                  toggleDrawer(false)();
                }}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {item.icon && (
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                )}
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
          
          {/* Logout button - only show when authenticated */}
          {isAuthenticated && (
            <>
              <Divider sx={{ my: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    py: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: "1.1rem",
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
