import React, { useEffect } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { deleteitem, getitem } from "../Redux/Crudslice";

function ItemTable() {

  const selector = useSelector(state => state.Product.value)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getitem())
  },[dispatch])


  function deleteItem(id) {
    dispatch(deleteitem(id))
    window.location.reload()
  };

  return (
    <Box sx={{ display: { sm: 'flex' }, flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
      <Box sx={{ display: { sm: 'flex' }, flexDirection: 'column', width: '700px', margin: 5 }} >
        <Box  >
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <TextField></TextField>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Filter"

            >
              <MenuItem value={'Name'}>Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Link to="/product">
            <Button variant="contained" sx={{ mb: 2 }}>
              Add New Item
            </Button>
          </Link>
          <TableContainer sx={{ width: '600px' }} component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: '#1565c0' }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                selector.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <img src={`http://localhost:5000/view/${item.File_name}`} alt={item.Name} width="100" />
                      </TableCell>
                      <TableCell>{item.Name}</TableCell>
                      <TableCell>{item.Price}</TableCell>
                      <TableCell>
                        <Link to={`/edit/${item._id}`}>
                          <Button variant="outlined" sx={{ mr: 1 }}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}


export default ItemTable;
