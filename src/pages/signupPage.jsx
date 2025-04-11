import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Alert, Snackbar } from "@mui/material";
import { saveUser, exportUsersToFile } from "../utils/userStorage";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Secret admin mode - click 5 times on heading to show the export button
  const handleHeadingClick = () => {
    if (!showAdmin) {
      let clicks = parseInt(localStorage.getItem("adminClicks") || "0");
      clicks++;
      localStorage.setItem("adminClicks", clicks.toString());

      if (clicks >= 5) {
        setShowAdmin(true);
      }
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.userType) newErrors.userType = "Please select user type";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.idNumber) newErrors.idNumber = "ID number is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare user data
      const userData = {
        userType: formData.userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        idNumber: formData.idNumber,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      // Save user to local storage
      const success = saveUser(userData);

      if (success) {
        setShowSuccess(true);

        // Reset form
        setFormData({
          userType: "",
          firstName: "",
          lastName: "",
          email: "",
          idNumber: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <main className="flex-grow container mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold pb-4" onClick={handleHeadingClick}>
          Sign Up
        </h1>

        {showAdmin && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={exportUsersToFile}
            sx={{ mb: 2 }}
          >
            Export Users Data
          </Button>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.userType}
          >
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              label="User Type"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="advisor">Advisor</MenuItem>
            </Select>
            {errors.userType && (
              <span className="text-red-500 text-xs">{errors.userType}</span>
            )}
          </FormControl>

          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Permanent Code / Social Insurance Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="Enter your number"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.idNumber}
            helperText={errors.idNumber}
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
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
            Sign Up
          </Button>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span>Already have an account?</span>
            <a className="text-blue-600 hover:underline" href="/login">
              Log In
            </a>
          </div>
        </form>
      </div>

      {/* Success message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created successfully! Redirecting to login...
        </Alert>
      </Snackbar>
    </main>
  );
};

export default SignupPage;
