import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/filterSlice';
import moduleCss from './contactFilter.module.css';
import { selectFilter } from '../../store/selectors';

const ContactFilter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div>
      <input
        type="text"
        className={moduleCss.contactFilterInput}
        placeholder="Search..."
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};
export default ContactFilter;
