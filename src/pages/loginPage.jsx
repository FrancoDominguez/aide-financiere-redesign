import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <main className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
      <div className="flex flex-col space-y-4 w-full">
        <heading className="text-3xl font-bold pb-4">Log In</heading>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Student</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ mb: 5 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"student"}>Student</MenuItem>
            <MenuItem value={"parent"}>Parent</MenuItem>
          </Select>
          <TextField
            className="mb-8"
            label="Permanent Code / Social Insurance Number"
            placeholder="enter your number"
            id="outlined-size-small"
            size="small"
            fullWidth
            sx={{ mb: 5 }}
          />
          <TextField
            label="Password"
            id="outlined-size-small"
            placeholder="enter password"
            size="small"
            fullWidth
            sx={{ mb: 5 }}
          />
          <Button variant="contained">Log In</Button>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>Don't have an account?</span>
            <button
              className="text-blue-600 underline"
              onClick={() => navigate("/signup")} // Use navigate to redirect
            >
              Sign Up
            </button>
          </span>
        </FormControl>
      </div>
    </main>
  );
};

export default LoginPage;
