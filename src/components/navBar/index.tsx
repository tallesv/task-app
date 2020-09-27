import React, { useCallback, useEffect, useState } from 'react';

import localStorage from 'redux-persist/lib/storage';
import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Content } from './style';
import { IUser } from '../../redux/modules/users/types';
import { logout } from '../../redux/modules/authentication/actions';

const NavBar: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<IUser | null>();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setIsLogged(false);
    setUser(null);
    history.push('/signup');
    history.go(0);
  }, [dispatch, history]);

  useEffect(() => {
    async function loadUser() {
      const dataFromLocalStorage = await localStorage.getItem('persist:root');
      if (dataFromLocalStorage) {
        const isLoggedFromLocalStorage = JSON.parse(
          JSON.parse(dataFromLocalStorage).auth,
        ).isLogged as boolean;
        if (isLoggedFromLocalStorage) {
          setIsLogged(isLoggedFromLocalStorage);
          setUser(
            JSON.parse(JSON.parse(dataFromLocalStorage).auth).user as IUser,
          );
        }
      }
    }
    loadUser();
  }, [isLogged]);

  return (
    <>
      <Content>
        <h1>Task App</h1>

        {isLogged && user ? (
          <div className="user-info">
            <span>{user.name}</span>
            <Button variant="contained" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        ) : (
          <Button variant="contained" onClick={() => history.push('/signin')}>
            Entrar
          </Button>
        )}
      </Content>
    </>
  );
};

export default NavBar;
