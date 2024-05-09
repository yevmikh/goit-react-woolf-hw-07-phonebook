import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://66396cb81ae792804bebb08e.mockapi.io/contacts';
const axiosInstance = axios.create({ baseURL });

export const axiosRequest = async (config, { rejectWithValue }) => {
  try {
    const response = await axiosInstance(config);
    return config.method === 'DELETE' && response.status === 200
      ? response.data.id
      : response.data;
  } catch (e) {
    const errorResponse = e.response
      ? `${e.message}: ${JSON.stringify(e.response.data)}`
      : e.message;
    return rejectWithValue(errorResponse);
  }
};
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  (_, thunkAPI) => axiosRequest({ method: 'GET', url: '/contacts' }, thunkAPI)
);
export const addContact = createAsyncThunk(
  'contacts/add',
  (contact, thunkAPI) =>
    axiosRequest({ method: 'POST', url: '/contacts', data: contact }, thunkAPI)
);
export const deleteContact = createAsyncThunk(
  'contacts/delete',
  ({ id }, thunkAPI) =>
    axiosRequest({ method: 'DELETE', url: `/contacts/${id}` }, thunkAPI)
);
export default axiosInstance;
