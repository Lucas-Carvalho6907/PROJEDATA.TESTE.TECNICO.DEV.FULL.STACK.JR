import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get(`${API_BASE}/products`);
  return response.data;
});

export const createProduct = createAsyncThunk('products/create', async (product) => {
  const response = await axios.post(`${API_BASE}/products`, product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, ...product }) => {
  const response = await axios.put(`${API_BASE}/products/${id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${API_BASE}/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;