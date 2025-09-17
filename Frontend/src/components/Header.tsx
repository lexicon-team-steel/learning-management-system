import { ReactElement } from 'react';
import { useAuthContext } from '../features/auth/hooks';
import { useNavigate } from 'react-router';

const Header = (): ReactElement => {
  const { isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleOnLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="g-container" id="header">
      <h1>Companies API</h1>
      {isLoggedIn && <button onClick={handleOnLogout}>Logout</button>}
    </header>
  );
};

export default Header;
