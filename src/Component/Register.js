import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

export default function Register() {
  const [name,setname] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')

  function send(){
    axios.post('http://localhost:5000/auth/register',{
      User_Name:name,
      User_Email:email,
      User_Password:password,
    })
    .then(()=>{
      alert('user Registered')
      window.location = '/login'
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div style={{height:'400px',width:'300px',margin:'100px auto auto auto', backgroundColor:'skyblue'}}>
      <Box sx={{backgroundColor:'transparent',margin:'0px 50px 0px 50px',padding:'30px 0px'}}>

        <TextField type='text' fullWidth  color='secondary' sx={{backgroundColor:'transparent',margin:'20px 0px'}} onChange={(e) => { setname(e.target.value) }} label="User_Name" variant="standard"/>
        <TextField type='text' fullWidth  color='secondary' sx={{backgroundColor:'transparent',margin:'20px 0px'}} onChange={(e) => { setemail(e.target.value) }} label="User_Email" variant="standard" />
        <TextField type='text'  fullWidth  color='secondary' sx={{backgroundColor:'transparent',margin:'20px 0px'}} onChange={(e) => { setpassword(e.target.value) }} label="User_Password"variant="standard" />
      </Box>
      <Button onClick={send} variant='contained' color='error'>Register</Button>

    </div>
  )
}
