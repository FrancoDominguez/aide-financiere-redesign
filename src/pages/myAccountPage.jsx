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
        <span className="capitalize">
            {label}
        </span>
      <ArrowForwardIosIcon sx={{ mr: 1, fontSize: 16, color: "#263652" }} />
    </Button>
  ));

  return (
    <div className="w-full max-w-[640px] m-auto">
      <div className="text-center text-3xl text-[#263652] font-bold">
        <h1>My Account</h1>
      </div>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        sx={{
          mt: '20px',
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          "& .MuiButtonGroup-grouped:not(:last-of-type)": {
            borderBottom: "1px solid #cdcdcd",
          },
        }}
      >
        {buttons}
      </ButtonGroup>
    </div>
  );
}

export default MyAccountPage;
