import React from 'react';

import { Button } from '@material-ui/core';

import { Content } from './style';

const NavBar: React.FC = () => {
  return (
    <>
      <Content>
        <h1>Task App</h1>

        <Button variant="contained">Entrar</Button>
      </Content>
    </>
  );
};

export default NavBar;
