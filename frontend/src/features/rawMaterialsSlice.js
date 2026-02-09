import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const fetchRawMaterials = createAsyncThunk('rawMaterials/fetch', async () => {
  const response = await axios.get(`${API_BASE}/raw-materials`);
  return response.data;
});

export const createRawMaterial = createAsyncThunk('rawMaterials/create', async (rawMaterial) => {
  const response = await axios.post(`${API_BASE}/raw-materials`, rawMaterial);
  return response.data;
});

export const updateRawMaterial = createAsyncThunk('rawMaterials/update', async ({ id, ...rawMaterial }) => {
  const response = await axios.put(`${API_BASE}/raw-materials/${id}`, rawMaterial);
  return response.data;
});

export const deleteRawMaterial = createAsyncThunk('rawMaterials/delete', async (id) => {
  await axios.delete(`${API_BASE}/raw-materials/${id}`);
  return id;
});

const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        const index = state.list.findIndex(rm => rm.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.list = state.list.filter(rm => rm.id !== action.payload);
      });
  },
});

export default rawMaterialsSlice.reducer;