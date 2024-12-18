
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

import { useDispatch } from "react-redux";
import { postitem } from "../Redux/Crudslice";

function Product() {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)

  async function handleSubmit() {

    const formData = { Name: name, Price: price, image }

    try {
      dispatch(postitem(formData))
        .unwrap()
        .then(() => {
          alert("success")
          window.location = "/list";

        })
        .catch(err => console.log(err))
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box sx={{ display: { sm: 'flex' }, height: '100%', justifyContent: 'center', alignItems: 'center' }}>

      <Box maxWidth="400px" mx="auto" sx={{ width: '400px', textAlign: 'center', bgcolor: '#1565c0', padding: 2, borderRadius: 5 }} boxShadow={5} mt={5}>
        <Typography variant="h4" color="error" mb={3}>
          Add Product
        </Typography>
        <Box sx={{ margin: 3 }} >
          <TextField
            fullWidth
            label="Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            color='error'
            focused
          />
          <TextField
            fullWidth
            label="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            color='error'
            focused
            required
          />
          <TextField fullWidth
            type="file"
            name="image"
            margin="normal"
            color='error'
            onChange={(e) => setImage(e.target.files[0])}
            focused
            required >
          </TextField>
          <Button type="submit" onClick={handleSubmit} variant="contained" fullWidth sx={{ mt: 4, bgcolor: '#ff1744' }}>
            Add Item
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


export default Product;