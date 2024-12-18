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

  handleSubmit = async () => {
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
    const { name, email, password, success, error } = this.state;

    return (
      <Box sx={{ display: { xs: 'flex' }, justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <Box sx={{ width: '400px', textAlign: 'center', bgcolor: '#1565c0', padding: 2, borderRadius: 5 }} boxShadow={5} >
          <Typography variant="h4" mb={3} color='secondary'>
            Register
          </Typography>
          {success && <Alert severity="success">Registration successful!</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{margin:3}} >
            <TextField
              fullWidth
              label="Name:"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              margin="normal"
              color='secondary'
        
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              margin="normal"
              color='secondary'
              

            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              margin="normal"
              color='secondary'
            
            />
            <Button fullWidth type="submit" onClick={this.handleSubmit} variant="contained" color='secondary' sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
        </Box>
      </Box >
    );
  }
}

export default Register;
