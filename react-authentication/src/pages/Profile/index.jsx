import { useContext, useEffect } from 'react';
import { UserContext } from '../../store';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const Profile = () => {
  const { user, logout, getProfile, loading } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    setTimeout(() => getProfile(token), 1500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loader type='MutatingDots' color='#00BFFF' height={100} width={100} timeout={3000} />
      ) : (
        <>
          {user ? (
            <>
              <h1>Bienvenid@ a mi App! {user.username}</h1>
              <button onClick={handleLogout}>Log out 🔑</button>
            </>
          ) : (
            <>
              <Redirect to='/' />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
