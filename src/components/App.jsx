import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import { fetchContacts } from '../api/api';
import Section from './Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader/Loader';
import { selectIsLoading } from '../store/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        textTransform: 'uppercase',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '10px',
        margin: '0 auto',
        color: '#010101',
        gap: '10px',
      }}
    >
      {isLoading && <Loader />}
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <ContactFilter />
        <ContactList />
      </Section>
    </div>
  );
};
