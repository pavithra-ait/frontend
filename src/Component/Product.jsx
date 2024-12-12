import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'

import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Product() {
    const [title, settitle] = useState('')
    const [price, setprice] = useState(0)
    const [file, setfile] = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rows, getrow] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/product/find`)
            .then(res => { return getrow(res.data) })
            .catch(err => {
                console.log(err)
            })
    })

    const formdata = new FormData()
    formdata.append('Product_Title', title)
    formdata.append('Product_Price', price)
    formdata.append('image', file)

    function Submit() {


        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post('http://localhost:5000/product/create', formdata, config)
            .then(() => {
                alert("data is sussfully addded")
                handleClose()
            })
            .catch(err => { console.log(err) })
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: 250

    };

    return (
        <div>
            <Button sx={{ margin: 2 }} onClick={handleOpen} color='secondary' variant='contained'>Add product</Button>
            <Modal
                sx={{ height: 500 }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box id="modal-modal-description" sx={{ margin: 4 }}>

                        <Grid container rowGap={2} columnGap={2}>
                            <Grid xs={5}>
                                <TextField type='text' color='secondary' onChange={(e) => { settitle(e.target.value) }} label="Product_name" variant="filled" />
                            </Grid>
                            <Grid xs={5}>
                                <TextField type='number' onChange={(e) => { setprice(e.target.value) }} color='secondary' label="Price" variant="filled" />
                            </Grid>
                            <Grid xs={11}>
                                <TextField type='file' color='secondary' onChange={(e) => { setfile(e.target.files[0]) }} variant="filled" />
                            </Grid>
                            <Grid xs={10} sx={{ textAlign: 'center', margin: 2 }}>

                                <Button color='secondary' variant='contained' onClick={Submit}>Send</Button>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Modal>
            <Container>


                <TableContainer component={Paper}>
                    {/* <table>
                        <thead>
                            <tr>
                                <th>Img</th>
                                <th>Name</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>
                                                <img src={`http://localhost:8000/product/view/${item.Product_File_Name}}`} alt="" />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table> */}
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Product Img</TableCell>
                                <TableCell align="right">Product Title</TableCell>
                                <TableCell align="right">Product Price</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">
                                            <img src={`http://localhost:5000/view/${row.Product_File_Name}`} alt="" height={100} width={100} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.Product_Title}
                                        </TableCell>
                                        <TableCell align="right">{row.Product_Price}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/edit/${row._id}`}>edit </Link>

                                            <Button sx={{ margin: 2 }} color='error' variant='contained' onClick={() => {
                                                axios.delete(`http://localhost:5000/product/remove/${row._id}`)
                                                    .then(() => {
                                                        alert("data is successfully deleted")
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            }}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </div>
    )
}
