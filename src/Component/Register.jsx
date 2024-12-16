import React, { Component } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: "",
      password: "",
      success: false,
      error: "",
    };
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = this.state;
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      this.setState({ success: true, error: "" });
      window.location = '/login'
    } catch (err) {
      this.setState({ error: err.response?.data?.message || "Registration failed" });
    }
  };

  render() {
    const { name, email, password , success, error } = this.state;

    return (
      <Box maxWidth="400px" mx="auto" mt={5}>
        <Typography variant="h4" mb={3}>
          Register
        </Typography>
        {success && <Alert severity="success">Registration successful!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box >
          <TextField
            fullWidth
            label="Name:"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            margin="normal"
            required
          />
          <Button fullWidth type="submit" onClick={this.handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Register;
