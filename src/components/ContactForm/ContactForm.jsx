import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from '../../store/contactsSlice';
import moduleCss from './contactForm.module.css';
import { getContacts } from 'store/selectors';

const ContactForm = () => {
  const initialContactData = { name: '', number: '' };
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const [contactData, setContactData] = useState(initialContactData);

  const handleInputChange = ({ target: { name, value } }) =>
    setContactData(prev => ({ ...prev, [name]: value.toLowerCase() }));

  const clearForm = () => {
    setContactData(initialContactData);
  };

  const isContactExist = () =>
    contacts.some(contact => contact.name === contactData.name.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    if (isContactExist()) {
      alert('Contact with this name already exists!');
      clearForm();
      return;
    }
    const contact = { id: nanoid(), ...contactData };
    dispatch(addContact(contact));
    clearForm();
  };

  return (
    <form className={moduleCss.contactForm} onSubmit={handleSubmit}>
      <label className={moduleCss.labelName}>
        Name:
        <input
          className={moduleCss.inputName}
          type="text"
          name="name"
          value={contactData.name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={moduleCss.labelName}>
        Number:
        <input
          className={moduleCss.inputName}
          type="tel"
          name="number"
          value={contactData.number}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={moduleCss.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
