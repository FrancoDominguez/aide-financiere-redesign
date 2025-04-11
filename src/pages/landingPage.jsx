import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PageTitle from "../components/pageTitle";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  // Get current user from auth context
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Extract name from current user data
  const firstName = currentUser?.firstName || "User";
  const lastName = currentUser?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  
  const notifications = [{ label: "Notification 1" },{ label: "Notification 2" }];
  const applications = [
    { label: "My full-time loan applications", href: '/my-applications?type=fullTime' },
    { label: "My Québec Perspective Sscholarship applications", href: '/my-applications?type=perspectiveScholarship' }
  ];

  function createButtons(buttons) {
    return buttons.map((item, index) => (
      <Button
        onClick={() => navigate(item.href)}
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
            {item.label}
        </span>
      <ArrowForwardIosIcon sx={{ mr: 1, fontSize: 16, color: "#263652" }} />
      </Button>
    ));
  }

  return (
    <div className="w-full max-w-[640px] m-auto">
      <div className="text-center text-3xl text-[#263652] font-bold">
        <h1>Hello, {fullName}</h1>
      </div>

      <div className="mt-[20px]">
        <h1 className="text-lg text-[#263652] font-bold">
          Notifications
        </h1>
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="text"
          sx={{
            mt: '8px',
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            "& .MuiButtonGroup-grouped:not(:last-of-type)": {
              borderBottom: "1px solid #cdcdcd",
            },
          }}
        >
          {createButtons(notifications)}
        </ButtonGroup>
      </div>

      <div className="mt-[20px]">
      <h1 className="text-lg text-[#263652] font-bold">
          Applications
        </h1>
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="text"
          sx={{
            mt: '8px',
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            "& .MuiButtonGroup-grouped:not(:last-of-type)": {
              borderBottom: "1px solid #cdcdcd",
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
