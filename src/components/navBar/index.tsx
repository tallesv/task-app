import React, { useCallback, useEffect, useState } from 'react';

import localStorage from 'redux-persist/lib/storage';
import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Content } from './style';
import { IUser } from '../../redux/modules/users/types';
import { useAuth } from '../../hooks/AuthContext';

const NavBar: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, userLogout } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  // const [user, setUser] = useState<IUser | null>();

  const handleLogout = useCallback(() => {
    userLogout();
    history.go(0);
  }, [history, userLogout]);

  useEffect(() => {
    setIsLogged(!!user.id);
  }, [isLogged, user]);

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
