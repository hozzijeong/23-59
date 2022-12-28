import { useCalendarSum } from 'hooks/useCalendarSum';
import { useNavigate } from 'react-router-dom';

function UserAttribute() {
  const getToken = localStorage.getItem('token') ? true : null;
  const { mutate } = useCalendarSum();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (getToken === null) {
      navigate('/');
    } else {
      localStorage.clear();
      mutate(undefined, false);
      navigate('/login');
    }
  };

  const logoClickHandler = () => {
    navigate('/user/main');
  };
  return { handleLoginClick, logoClickHandler };
}

export default UserAttribute;
