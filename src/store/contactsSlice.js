import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from '../api/api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};
const resetLoadAndError = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(
        isPending(fetchContacts, addContact, deleteContact),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(isFulfilled(fetchContacts), (state, action) => {
        state.items = action.payload;
        resetLoadAndError(state);
      })
      .addMatcher(isFulfilled(addContact), (state, action) => {
        state.items.push(action.payload);
        resetLoadAndError(state);
      })
      .addMatcher(isFulfilled(deleteContact), (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        resetLoadAndError(state);
      })
      .addMatcher(
        isRejected(fetchContacts, addContact, deleteContact),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
