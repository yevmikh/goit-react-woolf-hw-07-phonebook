import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import Section from './Section/Section';

export const App = () => {
  return (
    <div
      style={{
        textTransform: 'uppercase',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid gray',
        borderRadius: '10px',
        margin: '0 auto',
        color: '#010101',
        gap: '10px',
      }}
    >
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
