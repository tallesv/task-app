import React from 'react';

import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { Content } from './style';

const NavBar: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Content>
        <h1>Task App</h1>

        <Button variant="contained" onClick={() => history.push('/signin')}>
          Entrar
        </Button>
      </Content>
    </>
  );
};

export default NavBar;
