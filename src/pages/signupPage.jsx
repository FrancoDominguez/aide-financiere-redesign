import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

const SignupPage = () => {
  return (
    <main className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
      <div className="flex flex-col space-y-4 w-full">
        <heading className="text-xl font-bold pb-4">Sign Up</heading>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Student</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Student"
            sx={{ mb: 5 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

          <TextField
            className="mb-8"
            label="Permanent Code / Social Insurance Number"
            id="outlined-size-small"
            placeholder="Enter your number"
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
          <TextField
            label="Confirm Password"
            id="outlined-size-small"
            placeholder="enter password"
            size="small"
            fullWidth
            sx={{ mb: 5 }}
          />
          <Button variant="contained">Sign Up</Button>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span>Don't have an account?</span>
            <a className="text-blue-600" href="/signup">
              Sign Up
            </a>
          </span>
        </FormControl>
      </div>
    </main>
  );
};

export default SignupPage;
