
import { Box, Button, Container, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios';
import { Link } from 'react-router-dom';

import React, { Component } from 'react'

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

export default class Product extends Component {


    constructor() {
        super()
        this.state = {
            Product_Title: '',
            Product_Price: 0,
            image: '',
            view: [],
            open: false
        }
    }

    handleOpen = () => this.setState(true);
    handleClose = () => this.setState(false);

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChanges(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    // componentDidUpdate(){
    //     axios.get('http://localhost:5000/product/find')
    //         .then(res => { return this.setState(res.data) })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // };

    render() {
        const formdata = new FormData()
        formdata.append('Product_Title', this.state.Product_Title)
        formdata.append('Product_Price', this.state.Product_Price)
        formdata.append('image', this.state.image)

        function Submit() {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            axios.post('http://localhost:5000/product/create', formdata, config)
                .then(() => {
                    alert("data is sussfully addded")
                    this.handleClose()
                })
                .catch(err => { console.log(err) })
        }
        return (
            <div>
                <Button sx={{ margin: 2 }} onClick={this.handleOpen} color='secondary' variant='contained'>Add product</Button>
                <Modal
                    sx={{ height: 500 }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box id="modal-modal-description" sx={{ margin: 4 }}>

                            <Grid container rowGap={2} columnGap={2}>
                                <Grid xs={5}>
                                    <TextField type='text' color='secondary' name={this.state.Product_Title} onChange={this.onChange} label="Product_name" variant="filled" />
                                </Grid>
                                <Grid xs={5}>
                                    <TextField type='number' name={this.state.Product_Price} onChange={this.onChange} color='secondary' label="Price" variant="filled" />
                                </Grid>
                                <Grid xs={11}>
                                    <TextField type='file' color='secondary' name={this.state.image} onChange={this.onChanges} variant="filled" />
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
                                {
                                    this.state.view.map((item, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="right">
                                                    <img src={`http://localhost:5000/product/view/${item.Product_File_Name}`} alt="" height={100} width={100} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {item.Product_Title}
                                                </TableCell>
                                                <TableCell align="right">{item.Product_Price}</TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/edit/${item._id}`}>edit </Link>

                                                    <Button sx={{ margin: 2 }} color='error' variant='contained' onClick={() => {
                                                        axios.delete(`http://localhost:5000/product/remove/${item._id}`)
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
}
