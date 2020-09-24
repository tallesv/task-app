import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard';
import SignUp from '../pages/signUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/signUp" component={SignUp} />
  </Switch>
);

export default Routes;
