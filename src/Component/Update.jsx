import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Update() {
    const [title, settitle] = useState('')
    const [price, setprice] = useState(0)
    const [file, setfile] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/product/find/`+id)
            .then(res => { 
                settitle(res.data.Product_Title)
                setprice(res.data.Product_Price)
                setfile(res.data.Product_File_Path)
             })
            .catch(err => {
                console.log(err)
            })
    },[id])

    const formdata = new FormData()
    formdata.append('Product_Title', title)
    formdata.append('Product_Price', price)
    formdata.append('image', file)

    function Submit() {

        const config = {
            headers: {
                'Ccontent-Type': 'multipart/form-data',
            },
        };

        axios.put(`http://localhost:5000/product/update/${id}`, formdata, config)
            .then(() => {
                alert("data is sussfully updated")
                window.location = '/product'
            })
            .catch(err => { console.log(err) })
    }

    return (
        <div style={{ height: '400px', width: '300px', margin: '100px auto auto auto', backgroundColor: 'skyblue' }}>
            <Box sx={{ backgroundColor: 'transparent', margin: '0px 50px 0px 50px', padding: '30px 0px' }}>

                <TextField type='text' color='secondary' value={title} onChange={(e) => { settitle(e.target.value) }} label="Product_name" variant="filled" />

                <TextField type='number' value={price} onChange={(e) => { setprice(e.target.value) }} color='secondary' label="Price" variant="filled" />

                <TextField type='file'  color='secondary' onChange={(e) => { setfile(e.target.files[0]) }} variant="filled" />

                <Button color='secondary' variant='contained' onClick={Submit}>Send</Button>
            </Box>
        </div>
    )
}
