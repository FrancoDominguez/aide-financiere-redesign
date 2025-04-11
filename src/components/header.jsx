import React from "react";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Header = ({ onOpenDrawer }) => {
  return (
    <header className="relative flex justify-center items-center bg-white w-full py-4 border-b border-gray-200">
      <IconButton
        onClick={onOpenDrawer}
        sx={{
          position: "absolute",
          left: 16,
          padding: "14px", // Increase padding for an even larger button
          minWidth: "64px", // Ensure a larger minimum width
          minHeight: "64px", // Ensure a larger minimum height
          "&:hover": {
            backgroundColor: "#e0e0e0", // Slightly darker on hover
          },
        }}
        size="large"
        aria-label="menu"
      >
        <Menu sx={{ fontSize: "36px" }} /> {/* Further increase icon size */}
      </IconButton>

      <img src="/qc-logo.svg" alt="QC Logo" className="h-14" />
    </header>
  );
};

export default Header;
