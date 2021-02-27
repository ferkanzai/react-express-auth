import { Switch, Route } from 'react-router-dom';

import { UserContext } from './store';
import useAuthentication from './hooks/useAuthentication';
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, login, signup, logout } = useAuthentication();

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      <div className='App'>
        <NavBar />
        <Switch>
          <Route path='/profile' exact>
            <Profile />
          </Route>

          <Route path='/login' exact>
            <Login />
          </Route>

          <Route path='/signup' exact>
            <SignUp />
          </Route>

          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
