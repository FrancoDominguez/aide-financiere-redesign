import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MyApplicationsPage() {
const installments = [
    { date: "March 10, 2025", amount: "$1025.43" },
    { date: "April 10, 2025", amount: "$1025.37" },
    ];

  const buttonLabels = [
    "Decision",
    "Financial Assistance Statements",
    "Eligibility Period",
    "Debt Load",
  ];

  const buttons = buttonLabels.map((label, index) => (
    <Button
      key={index}
      fullWidth
      sx={{
        height: 60,
        backgroundColor: "#f2f2f2",
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
    <div className="m-auto max-w-[400px]">
      <div className="text-center text-3xl text-[#263652] font-bold">
        <h1>Loans and Bursaries</h1>
        <h1>Full-Time Studies</h1>
      </div>

          <Button
            fullWidth
            sx={{
                mt: '20px',
                height: 60,
                backgroundColor: "#235893",
                color: "#FFFFFF",
                fontWeight: "bold",
                justifyContent: "space-between",
                borderRadius: '12px',
                textAlign: "left",
                pl: 2,
            }}
            >
                <span className="capitalize">
                    New Application
                </span>
            <ArrowForwardIosIcon sx={{ mr: 1, fontSize: 16, color: "#FFFFFF" }} />
        </Button>

      <div className="mt-[20px] bg-white rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
        <table className="w-full text-sm text-left text-gray-700">
            <thead>
            <tr className="text-[#263652] border-b border-gray-200">
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold text-right">Amount</th>
            </tr>
            </thead>
            <tbody>
            {installments.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 text-right">{item.amount}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <div className="flex text-[#263652] justify-between items-center px-4 py-3 hover:bg-gray-50 cursor-pointer rounded-b-xl">
            <span className="text-sm font-medium">All Installments</span>
            <span className="text-xl">&rsaquo;</span>
        </div>
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
