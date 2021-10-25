import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

import PrivateRoute from './PrivateRoute';

import Entrar from '../screens/Entrar';
import Home from '../screens/Home';
import Form from '../screens/Form';
import AdditionalData from '../screens/AdditionalData';
import RegisterUser from '../screens/RegisterUser';
import Logout from '../screens/Logout';
import RecoverPassword from '../screens/RecoverPassword';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/entrar" component={Entrar} />
        <Route path="/esqueci-minha-senha" component={RecoverPassword} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/form" component={Form} />
        <PrivateRoute path="/complemento-de-dados" component={AdditionalData} />
        <PrivateRoute path="/register" component={RegisterUser} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/:category" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
