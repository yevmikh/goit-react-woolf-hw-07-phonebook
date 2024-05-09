import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../api/api';
import moduleCss from './contactList.module.css';
import { filteredContactsSelector } from '../../store/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(filteredContactsSelector);

  return (
    <ul className={moduleCss.contactList}>
      {filteredContacts.map(contact => (
        <li className={moduleCss.ContactListItem} key={contact.id}>
          {contact.name}: {contact.phone}
          <button
            className={moduleCss.contactListButton}
            onClick={() => dispatch(deleteContact({ id: contact.id }))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
