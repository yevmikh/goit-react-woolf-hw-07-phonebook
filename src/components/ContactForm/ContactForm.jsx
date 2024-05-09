import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../api/api';
import moduleCss from './contactForm.module.css';
import { filteredContactsSelector } from '../../store/selectors';

const ContactForm = () => {
  const [contactData, setContactData] = useState({ name: '', phone: '' });
  const filteredContacts = useSelector(filteredContactsSelector);
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }) => {
    setContactData(prev => ({ ...prev, [name]: value }));
  };
  const clearForm = () => setContactData({ name: '', phone: '' });

  const isContactExist = () =>
    filteredContacts.some(
      contact =>
        contact.name.toLowerCase() === contactData.name.toLowerCase() ||
        contact.phone === contactData.phone
    );

  const handleSubmit = e => {
    e.preventDefault();
    if (isContactExist()) {
      clearForm();
      alert('Contact with this name or phone number already exists!');
      return;
    }
    dispatch(
      addContact({
        name: contactData.name.toLowerCase(),
        phone: contactData.phone,
      })
    );
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
          name="phone"
          value={contactData.phone}
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
