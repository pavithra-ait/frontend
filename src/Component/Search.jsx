import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    TextField,
    Typography
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

function Search() {
    const [data, setData] = useState([])
    const [filters, setFilter] = useState({
        Name: '',
        Stock: '',
        Dates: ''
    })




    const fetchStocks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/product/search', {
                params: filters, 
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    useEffect(() => {
        fetchStocks()
    })

    function getDate(dates) {
        const today = new Date(dates);
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }
    return (
        <Box sx={{ display: { sm: 'flex' }, flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ display: { sm: 'flex' }, flexDirection: 'column', width: '700px', margin: 5 }} >
                <Box  >
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <TextField type="text" label='Name' value={filters.Name} onChange={(e) => { setFilter({ Name: e.target.value }) }}></TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <TextField type="date"  value={filters.Dates} onChange={(e) => { setFilter({ Dates: e.target.value }) }}></TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={(e) => { setFilter({ Stock: e.target.option }) }}
                            label='Filter'
                        >
                            <MenuItem selected>Filter</MenuItem>
                            <MenuItem value={'Stock'}>Stock</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" sx={{ height: '50px', margin: 1 }} onClick={fetchStocks}>Filter</Button>
                    </FormControl>
                </Box>
                <Box>
                    <TableContainer sx={{ width: '700px' }} component={Paper}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#1565c0' }}>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Create Date</TableCell>
                                    <TableCell>Stock</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.length > 0 ? (data.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>
                                                <img src={`http://localhost:5000/view/${item.File_name}`} alt={item.Name} width="100" />
                                            </TableCell>
                                            <TableCell>{item.Name}</TableCell>
                                            <TableCell>{item.Price}</TableCell>
                                            <TableCell>{
                                                getDate(item.Dates)
                                            }</TableCell>
                                            <TableCell>{item.Stock}</TableCell>
                                        </TableRow>
                                    ))
                                    ) : (
                                        <Typography variant="h3">No Stock found</Typography>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}


export default Search;
