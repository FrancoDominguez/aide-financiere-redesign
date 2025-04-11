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
        { text: "Home", href: "/landing" },
        { text: "Part-Time Loans", href: "/my-applications?type=partTime" },
        { text: "Full-Time Loans", href: "/my-applications?type=fullTime" },
        { text: "Special Needs Loans", href: "/my-applications?type=specialNeeds" },
        { text: "Intern Scholarship", href: "/my-applications?type=internScholarship" },
        { text: "Québec Perspective Scholarship", href: "/my-applications?type=perspectiveScholarship" },
      ];
    } else {
      return [
        { text: "Login", href: "/login" },
        { text: "Sign Up", href: "/signup" },
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
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "white", color: "#235893", flexShrink: 0 }}>
            {currentUser.firstName?.charAt(0) ||
              currentUser.email?.charAt(0) ||
              "U"}
          </Avatar>
          <Box sx={{ minWidth: 0, width: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={currentUser.email} // Add tooltip showing full email on hover
            >
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
              <Divider
                sx={{ my: 1.5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => { navigate('my-account'); toggleDrawer(false)(); }}
                  sx={{
                    py: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary="My Account"
                    primaryTypographyProps={{
                      fontSize: "1.1rem",
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              </ListItem>
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
