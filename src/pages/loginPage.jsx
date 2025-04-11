import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Alert, Snackbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    userType: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error when user changes input
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userType) {
      setError("Please select a user type");
      return;
    }
    
    if (!formData.identifier || !formData.password) {
      setError("Please enter both identifier and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Attempt to login with user type
      const user = await login(formData.identifier, formData.password, formData.userType);

      if (user) {
        // Redirect to the page they were trying to access, or landing page
        const redirectTo = location.state?.from?.pathname || "/landing";
        navigate(redirectTo);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h1 className="text-3xl font-bold pb-4">Log In</h1>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }} size="small" required>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              label="User Type"
              required
            >
              <MenuItem value="">
                <em>Select Type</em>
              </MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="advisor">Advisor</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Email or Permanent Code / SIN"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter your email or ID number"
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            required
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ mb: 3 }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <div className="flex items-center justify-center gap-2">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
