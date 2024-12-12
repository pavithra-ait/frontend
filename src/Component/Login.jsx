import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  function send() {
    axios.post('http://localhost:5000/auth/login', {
      User_Email: email,
      User_Password: password,
    })
      .then((res) => {
        if(res.status===200){
          localStorage.setItem("token",res.data.token)
        }
        window.location = '/product'
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (

    <div style={{ height: '400px', width: '300px', margin: '100px auto auto auto', backgroundColor: 'skyblue' }}>
      <Box sx={{ backgroundColor: 'transparent', margin: '0px 50px 0px 50px', padding: '30px 0px' }}>
        <TextField type='text' fullWidth color='secondary' sx={{ backgroundColor: 'transparent', margin: '20px 0px' }} onChange={(e) => { setemail(e.target.value) }} label="User_Email" variant="standard" />
        <TextField type='text' fullWidth color='secondary' sx={{ backgroundColor: 'transparent', margin: '20px 0px' }} onChange={(e) => { setpassword(e.target.value) }} label="User_Password" variant="standard" />
      </Box>
      <Button onClick={send} variant='contained' color='error'>Login</Button>
      <br />
      <br />
      <Link to='/register' >create a account</Link>
    </div>
  )
}
