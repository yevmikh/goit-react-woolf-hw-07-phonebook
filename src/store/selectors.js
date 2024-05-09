import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter.filter;
export const selectIsLoading = state => state.contacts.isLoading;
const filterList = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};
export const filteredContactsSelector = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return filterList(contacts, filter);
  }
);
