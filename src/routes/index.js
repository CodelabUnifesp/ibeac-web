import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Default from '../layouts/default';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Form from '../screens/Form';
import AdditionalData from '../screens/AdditionalData';
import RegisterUser from '../screens/RegisterUser';

function Routes() {
  return (
    <BrowserRouter>
      <Default>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/form" component={Form} />
          <Route path="/complemento-de-dados" component={AdditionalData} />
          <Route path="/register" component={RegisterUser} />
        </Switch>
      </Default>
    </BrowserRouter>
  );
}

export default Routes;
