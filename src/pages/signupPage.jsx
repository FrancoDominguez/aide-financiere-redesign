import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Alert, Snackbar, FormHelperText } from "@mui/material";
import { saveUser, exportUsersToFile } from "../utils/userStorage";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    permanentCode: "",
    sin: "",
    password: "",
    confirmPassword: "",
    relationship: "",
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

  // Reset irrelevant fields when user type changes
  useEffect(() => {
    if (formData.userType === "student") {
      // If student, clear SIN and relationship
      setFormData(prev => ({
        ...prev,
        sin: "",
        relationship: ""
      }));
    } else if (formData.userType === "parent") {
      // If parent, clear permanent code
      setFormData(prev => ({
        ...prev,
        permanentCode: "",
        relationship: formData.relationship || "parent"
      }));
    } else if (formData.userType === "spouse") {
      // If spouse, clear permanent code
      setFormData(prev => ({
        ...prev,
        permanentCode: "",
        relationship: "spouse"
      }));
    }
  }, [formData.userType]);

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
    
    // Validate identity fields based on user type
    if (formData.userType === "student") {
      if (!formData.permanentCode) {
        newErrors.permanentCode = "Permanent Code is required";
      } else if (!/^[A-Z]{4}\d{8}$/.test(formData.permanentCode)) {
        newErrors.permanentCode = "Permanent Code format: AAAA12345678";
      }
    } else if (formData.userType === "parent" || formData.userType === "spouse") {
      if (!formData.sin) {
        newErrors.sin = "Social Insurance Number is required";
      } else if (!/^\d{9}$/.test(formData.sin)) {
        newErrors.sin = "SIN must be 9 digits";
      }
      
      if (formData.userType === "parent" && !formData.relationship) {
        newErrors.relationship = "Please specify relationship";
      }
    }
    
    // Password validation
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
      // Prepare user data with ID field based on user type
      const userData = {
        userType: formData.userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      // Add appropriate ID field based on user type
      if (formData.userType === "student") {
        userData.idNumber = formData.permanentCode;
        userData.idType = "permanentCode";
      } else {
        userData.idNumber = formData.sin;
        userData.idType = "sin";
        if (formData.userType === "parent") {
          userData.relationship = formData.relationship;
        } else if (formData.userType === "spouse") {
          userData.relationship = "spouse";
        }
      }

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
          permanentCode: "",
          sin: "",
          password: "",
          confirmPassword: "",
          relationship: "",
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  // Determine which ID field to show based on user type
  const renderIdentityField = () => {
    if (formData.userType === "student") {
      return (
        <TextField
          label="Permanent Code"
          name="permanentCode"
          value={formData.permanentCode}
          onChange={handleChange}
          placeholder="e.g., ABCD12345678"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.permanentCode}
          helperText={errors.permanentCode}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
      );
    } else if (formData.userType === "parent" || formData.userType === "spouse") {
      return (
        <>
          <TextField
            label="Social Insurance Number"
            name="sin"
            value={formData.sin}
            onChange={handleChange}
            placeholder="e.g., 123456789"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.sin}
            helperText={errors.sin}
          />
          
          {formData.userType === "parent" && (
            <FormControl fullWidth sx={{ mb: 2 }} size="small" error={!!errors.relationship}>
              <InputLabel>Relationship to Student</InputLabel>
              <Select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                label="Relationship to Student"
              >
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="guardian">Legal Guardian</MenuItem>
              </Select>
              {errors.relationship && (
                <FormHelperText>{errors.relationship}</FormHelperText>
              )}
            </FormControl>
          )}
        </>
      );
    }
    return null;
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
            required
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
              <MenuItem value="spouse">Spouse</MenuItem>
              <MenuItem value="advisor">Advisor</MenuItem>
            </Select>
            {errors.userType && (
              <FormHelperText>{errors.userType}</FormHelperText>
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
            required
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
            required
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
            required
          />

          {/* Conditional identity field based on user type */}
          {renderIdentityField()}

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
            required
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
            required
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
