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
  Modal,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteitem, getitem, putitem } from "../Redux/Crudslice";

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
};

function ItemTable() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selector = useSelector(state => state.Product.products)
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getitem())
  }, [dispatch])

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.Name)
    setPrice(item.Price)
    setDate(item.Date)
    setStock(item.Stock)
    setImage(item.File_name)
    handleOpen()
  };

  function deleteItem(id) {
    dispatch(deleteitem(id))
    window.location.reload()
  };

  async function Submit() {
    try {
      const data = { id: editId, Name: name, Price: price, image: image, Dates: date, Stock: stock };
      await dispatch(putitem(data))
        // .unwrap()
        .then(() => {
          setEditId(null)
          handleClose()
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
    catch (err) {
      console.log(err);

    }
  }
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
        <Box>
          <Box>

            <Link to="/product">
              <Button variant="contained" sx={{ mb: 2 }}>
                Add New Item
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="contained" sx={{ mb: 2 }}>
                Search
              </Button>
            </Link>
          </Box>

          <TableContainer sx={{ width: '700px' }} component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: '#1565c0' }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Stock</TableCell>
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
                      <TableCell>{
                        getDate(item.Date)
                      }</TableCell>
                      <TableCell>{item.Stock}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(item)} variant="outlined" sx={{ mr: 1 }}>
                          Edit
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <TextField type='text' color='secondary' value={name} onChange={(e) => { setName(e.target.value) }} label="Product_name" variant="filled" />

                            <TextField type='text' value={price} onChange={(e) => { setPrice(e.target.value) }} color='secondary' label="Price" variant="filled" />

                            <TextField type='file' color='secondary' onChange={(e) => { setImage(e.target.files[0]) }} variant="filled" />
                            <TextField
                              fullWidth
                              label="Date"
                              name="Date"
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              margin="normal"
                              color='error'
                              focused
                              required
                            />
                            <TextField
                              fullWidth
                              label="Stock"
                              name="Stock"
                              type="text"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                              margin="normal"
                              color='error'
                              focused
                              required
                            />
                            <Button color='secondary' variant='contained' onClick={Submit}>Send</Button>
                          </Box>
                        </Modal>
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
