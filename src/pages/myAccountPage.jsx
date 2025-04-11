import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MyAccountPage() {
  const buttonLabels = [
    "Quebec Permanent Code",
    "Change Password",
    "Mailing Address",
    "Telephone Number",
    "Email Address",
    "Language of Correspondence",
    "Tax Receipts",
    "Family Profile",
    "Health Expenses",
  ];

  const buttons = buttonLabels.map((label, index) => (
    <Button
      key={index}
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
      {label}
      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
    </Button>
  ));

  return (
    <div style={{ width: "100%" }}>
      <h1 className="text-3xl text-center mb-7 text-[#263652]">My Account</h1>
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
