import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MyAccountPage() {
  const buttons = [
    <Button
      key="one"
      fullWidth
      sx={{
        height: 60,
        backgroundColor: "#f0f0f0",
        color: "#263652",
        fontWeight: "bold", // Bold font
        justifyContent: "space-between", // Space between text and icon
        textAlign: "left",
        pl: 2,
      }}
    >
      Quebec Permanent Code
      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
    </Button>,
    <Button
      key="two"
      fullWidth
      sx={{
        height: 60,
        backgroundColor: "#f0f0f0",
        color: "#263652",
        fontWeight: "bold",
        justifyContent: "space-between",
        textAlign: "left",
        pl: 2,
      }}
    >
      Change Password
      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
    </Button>,
    <Button
      key="three"
      fullWidth
      sx={{
        height: 60,
        backgroundColor: "#f0f0f0",
        color: "#263652",
        fontWeight: "bold",
        justifyContent: "space-between",
        textAlign: "left",
        pl: 2,
      }}
    >
      Mailing Address
      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
    </Button>,
    <Button
      key="four"
      fullWidth
      sx={{
        height: 60,
        backgroundColor: "#f0f0f0",
        color: "#263652",
        fontWeight: "bold",
        justifyContent: "space-between",
        textAlign: "left",
        pl: 2,
      }}
    >
      Telephone Number
      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
    </Button>,
    <Button
      key="five"
      fullWidth
      sx={{
        height: 60,
        backgroundColor: "#f0f0f0",
        color: "#263652",
        fontWeight: "bold",
        justifyContent: "space-between",
        textAlign: "left",
        pl: 2,
      }}
    >
      Email Address
      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
    </Button>,
  ];

  return (
    <div style={{ width: "100%" }}>
      <h1 className="text-3xl text-center text-[#263652]">My Account</h1>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        sx={{
          width: "100%",
          borderColor: "lightgray",
          "& .MuiButtonGroup-grouped:not(:last-of-type)": {
            borderBottom: "1px solid lightgray",
          },
        }}
      >
        {buttons}
      </ButtonGroup>
    </div>
  );
}

export default MyAccountPage;
