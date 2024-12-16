import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

class ItemTable extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/find"); // Replace with your API endpoint
      this.setState({ items: response.data });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/remove/${id}`); // Replace with your API endpoint
      this.fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  render() {
    const { items } = this.state;

    return (
      <Box>
        <Typography variant="h4" mb={3}>
          Items List
        </Typography>
        <Link to="/product">
          <Button variant="contained" sx={{ mb: 2 }}>
            Add New Item
          </Button>
        </Link>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.imageUrl} alt={item.Name} width="100" />
                  </TableCell>
                  <TableCell>{item.Name}</TableCell>
                  <TableCell>{item.Price}</TableCell>
                  <TableCell>
                    <Link to={`/edit/${item.id}`}>
                      <Button variant="outlined" sx={{ mr: 1 }}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => this.deleteItem(item.id)}
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
    );
  }
}

export default ItemTable;
