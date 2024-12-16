
import React, { Component } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

class AddEditItem extends Component {
  state = {
    id: null,
    Name: "",
    Price: 0,
    image: null,
    isEditMode: false,
  };

  componentDidMount() {
    const { pathname } = window.location;
    const isEditMode = pathname.includes("edit");
    if (isEditMode) {
      const id = pathname.split("/").pop();
      this.setState({ isEditMode, id }, this.fetchItem);
    }
  }

  fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/find/${this.state.id}`); // Replace with your API endpoint
      const { Name, Price,imageUrl } = response.data;
      this.setState({ Name, Price, image: imageUrl });
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      this.setState({ image: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, Name, Price, image, isEditMode } = this.state;

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Price", Price);
    formData.append("image", image);

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/product/update/${id}`, formData); // Replace with your API endpoint
      } else {
        await axios.post("http://localhost:5000/api/product/create", formData); // Replace with your API endpoint
      }
      window.location.href = "/list";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  render() {
    const { Name,Price,isEditMode } = this.state;

    return (
      <Box maxWidth="400px" mx="auto" mt={5}>
        <Typography variant="h4" mb={3}>
          {isEditMode ? "Edit Item" : "Add Item"}
        </Typography>
        <Box >
          <TextField
            fullWidth
            label="Name"
            name="Name"
            value={Name}
            onChange={this.handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="price"
            name="Price"
            value={Price}
            onChange={this.handleChange}
            margin="normal"
            required
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image
            <input type="file" name="image"  onChange={this.handleChange} />
          </Button>
          <Button type="submit" onClick={this.handleSubmit} variant="contained" fullWidth sx={{ mt: 3 }}>
            {isEditMode ? "Update Item" : "Add Item"}
          </Button>
        </Box>
      </Box>
    );
  }
}

export default AddEditItem;