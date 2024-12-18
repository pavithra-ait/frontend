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
        .catch(err => { console.log(err); })

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
      <Box sx={{ display: { xs: 'flex' }, justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <Box sx={{ width: '400px', textAlign: 'center', bgcolor:'#1565c0', padding: 2, borderRadius: 5 }} boxShadow={5} >
          <Typography variant="h4" color='secondary'>Login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ margin: 3 }}>
            <TextField info
              label="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              color="secondary" focused
            />
            <TextField

              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              color="secondary"
              focused
            />
            <Button type="submit" onClick={this.handleSubmit} variant="contained" color="secondary">
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Login;
