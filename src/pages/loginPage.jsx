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
    userType: "~",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    console.log(e)
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
      const user = await login(
        formData.identifier,
        formData.password,
        formData.userType
      );

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
    <main className="flex-grow container mx-auto p-6 bg-white rounded-lg flex items-center justify-center">
      <div className="flex flex-col space-y-4 w-full max-w-md">
      <div className="text-center text-3xl text-[#263652] font-bold">
        <h1>Login</h1>
      </div>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          required
          sx={{
            mt: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: 56,
            },
            '& .MuiSelect-select': {
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
            },
          }}
        >
          <InputLabel id="user-type-label" shrink>
            User Type
          </InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            label="User Type"
          >
              <MenuItem value="~" disabled>
                <span style={{color: '#afafaf' }}>Select a user type</span>
              </MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
            <MenuItem value="sponsor">Sponsor</MenuItem>
          </Select>
        </FormControl>

          <TextField
            label={
              formData.userType === "student"
                ? "Email or Permanent Code"
                : formData.userType === "parent" ||
                  formData.userType === "sponsor"
                ? "Email or SIN"
                : "Email or ID"
            }
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder={
              formData.userType === "student"
                ? "Enter your email or permanent code"
                : formData.userType === "parent" ||
                  formData.userType === "sponsor"
                ? "Enter your email or SIN"
                : "Enter your email or ID number"
            }
            size="small"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              mt: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: 56,
              },
              '& .MuiInputBase-input': {
                padding: '20px 24px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
              },
            }}
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            size="small"
            type="password"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              mt: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: 56,
              },
              '& .MuiInputBase-input': {
                padding: '20px 24px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
              },
            }}
          />

          <Button
            fullWidth
            disabled={loading}
            type="submit"
            sx={{
                mt: '20px',
                height: 60,
                backgroundColor: "#235893",
                color: "#FFFFFF",
                fontWeight: "bold",
                justifyContent: "space-between",
                borderRadius: '12px',
                pl: 2,
            }}
            >
                <div className="capitalize w-full text-center">
                  {loading ? "Logging in..." : "Log In"}
                </div>
          </Button>

          <div className="mt-[20px] flex items-center justify-center gap-2">
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
