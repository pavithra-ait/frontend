import React, { Component } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      error: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };



  handleSubmit = async () => {

    const { name, password } = this.state;

    try {
      await axios.post("http://localhost:5000/api/auth/login", { name, password }).then((res) => {
        console.log(res.data);
        this.setState({ error: "" });
        localStorage.setItem('token', res.data.token)
        window.location = '/'
      })
      .catch(err=>{console.log(err);})

      // Navigate to another page
    } catch (error) {
      this.setState({ error: "Invalid credentials" });
    }
  };

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      window.location = '/'
    }
  }

  render() {
    const { name, password, error } = this.state;

    return (
      <Box>
        <Typography variant="h4">Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" onClick={this.handleSubmit} variant="contained" color="primary">
            Login
          </Button>
        </Box>

      </Box>
    );
  }
}

export default Login;
