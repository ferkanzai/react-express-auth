import { useContext } from 'react';
import { UserContext } from '../../store';
import { Redirect } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(UserContext)

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {user ? (
        <>
          <h1>Bienvenid@ a mi App! {user.username}</h1>
          <button onClick={handleLogout}>Log out 🔑</button>
        </>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default Profile;
