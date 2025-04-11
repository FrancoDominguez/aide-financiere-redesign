import React from "react";
import TextField from "@mui/material/TextField";

export default function LoginPage() {
  return (
    <main className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
      <div className="space-x-4">
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
        <TextField
          label="hello"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
      </div>
    </main>
  );
};
