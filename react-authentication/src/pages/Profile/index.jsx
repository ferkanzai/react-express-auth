import { useContext, useEffect } from 'react';
import { UserContext } from '../../store';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const { user, logout, getProfile, loading } = useContext(UserContext);

  const notify = (msg) =>
    toast(msg || 'Unable to log in with those credentials', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleLogout = () => {
    logout();
  };

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    setTimeout(() => getProfile(token, notify), 1500);
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
              <ToastContainer />
              <Redirect to='/' />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
