import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../store/contactsSlice';
import moduleCss from './contactList.module.css';
import { getContacts, getFilter } from '../../store/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter).toLowerCase();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <ul className={moduleCss.contactList}>
      {visibleContacts.map(contact => (
        <li className={moduleCss.ContactListItem} key={contact.id}>
          {contact.name}: {contact.number}
          <button
            className={moduleCss.contactListButton}
            onClick={() => dispatch(deleteContact(contact.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
