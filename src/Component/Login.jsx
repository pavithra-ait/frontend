import { Box, Button, TextField } from '@mui/material'
import axios from 'axios';
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      User_Email: '',
      User_Password: ''
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handlesend() {
    axios.post('http://localhost:5000/auth/login', this.state)
      .then((res) => {
        alert("data is successfully added")
        localStorage.setItem('token', res.data.token)
        window.location = '/product'
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    return (
      <div style={{ height: '400px', width: '300px', margin: '100px auto auto auto', backgroundColor: 'skyblue' }}>
        <Box sx={{ backgroundColor: 'transparent', margin: '0px 50px 0px 50px', padding: '30px 0px' }}>
          <TextField type='text' fullWidth color='secondary' name={this.state.User_Email} sx={{ backgroundColor: 'transparent', margin: '20px 0px' }} onChange={this.onChange} label="User_Email" variant="standard" />
          <TextField type='text' fullWidth color='secondary' name={this.state.User_Password} sx={{ backgroundColor: 'transparent', margin: '20px 0px' }} onChange={this.onChange} label="User_Password" variant="standard" />
        </Box>
        <Button onClick={this.handlesend} variant='contained' color='error'>Login</Button>
        <br />
        <br />
        <Link to='/register' >create a account</Link>
      </div>
    )
  }
}
