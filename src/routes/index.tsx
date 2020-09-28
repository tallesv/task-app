import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/dashboard';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signUp" component={SignUp} />
    <Route path="/signIn" component={SignIn} />

    <Route path="/" component={Dashboard} exact isPrivate />
  </Switch>
);

export default Routes;
