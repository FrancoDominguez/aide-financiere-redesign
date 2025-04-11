import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PageTitle from "../components/pageTitle";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  // Get current user from auth context
  const { currentUser } = useAuth();
  
  // Extract name from current user data
  const firstName = currentUser?.firstName || "User";
  const lastName = currentUser?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  
  const notifications = ["Notification 1", "Notification 2"];
  const applications = [
    "My full time loan application",
    "My bursary application",
  ];

  function createButtons(buttons) {
    return buttons.map((label, index) => (
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
  }

  return (
    <div style={{ width: "100%" }}>
      <PageTitle title={`Hello, ${fullName}`} />
      <div>
        <h1 className="font-bold text-2xl mb-2 text-[#235893]">
          Notifications
        </h1>
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="text"
          sx={{
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            "& .MuiButtonGroup-grouped:not(:last-of-type)": {
              borderBottom: "1px solid darkgrey",
            },
          }}
        >
          {createButtons(notifications)}
        </ButtonGroup>
      </div>

      <div className="mt-10">
        <h1 className="font-bold text-2xl mb-2 text-[#235893]">
          Applications
        </h1>
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="text"
          sx={{
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            "& .MuiButtonGroup-grouped:not(:last-of-type)": {
              borderBottom: "1px solid darkgrey",
            },
          }}
        >
          {createButtons(applications)}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default LandingPage;
