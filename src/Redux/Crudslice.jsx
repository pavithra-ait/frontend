import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const api = 'http://localhost:5000/api/product';


export const getitem = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${api}/find`);
    dispatch({ type: 'FETCH_PRODUCTS', payload: data });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const getitembyid = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${api}/find/${id}`);
    dispatch({ type: 'FETCH_PRODUCTS', payload: data });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const postitem = (productData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${api}/create`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: 'ADD_PRODUCT', payload: data });
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const putitem = ( productData) => async (dispatch) => {
  try {
    const response = await axios.put(`${api}/update/${productData.id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.data;
    dispatch({ type: 'UPDATE_PRODUCT', payload: data });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`${api}/remove/${id}`);
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

export const deleteitem = createAsyncThunk('product/removeitem', async (id) => {
  const response = await axios.delete(`${api}/remove/${id}`)
  return response.id;
})

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
