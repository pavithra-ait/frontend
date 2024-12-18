import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'http://localhost:5000/api/product';

export const getitem = createAsyncThunk('product/fetchitem', async () => {
  const response = await axios.get(`${api}/find`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  return response.data
})

export const postitem = createAsyncThunk('product/createitem', async (productData) => {
  const formData = new FormData();
  formData.append('image', productData.image);
  formData.append('Name', productData.Name);
  formData.append('Price', productData.Price);

  const response = await axios.post(`${api}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
})

export const getitembyid = createAsyncThunk('product/fetchitembyid', async (id) => {
  const response = await axios.get(`${api}/find/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  return response.data
})

export const putitem = createAsyncThunk('product/updateitem', async (product,thunkAPI) => {
  try {
    const response = await fetch(`/api/product/update/${product._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product), // Send the whole product object
    });

    if (!response.ok) {
        throw new Error('Failed to update product');
    }

    return await response.json(); // Return the updated product data
} catch (error) {
    return thunkAPI.rejectWithValue(error.message);
}
})

export const deleteitem = createAsyncThunk('product/removeitem', async (id) => {
  const response = await axios.delete(`${api}/remove/${id}`)
  return response.id;
})

const ProductSlice = createSlice({
  name: 'Product',
  initialState: {
    value: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getitem.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getitem.rejected, (state, action) => {
        state.status = 'failed'
        state.value = action.error.message
      })
      .addCase(getitem.fulfilled, (state, action) => {
        state.status = 'success'
        state.value = action.payload
      })
      .addCase(postitem.fulfilled, (state, action) => {
        state.status = 'success'
        state.value.push(action.payload);
      })
      .addCase(putitem.fulfilled, (state, action) => {
        state.value = state.value.map(product => {
            if (product && product.id === action.payload._id) {
              
                return { ...product, ...action.payload };
            }
            return product;  
        });
    })
      .addCase(deleteitem.fulfilled, (state, action) => {

        state.value = state.value.filter((item) => item._id !== action.payload)
      })
  }
})


export default ProductSlice.reducer

