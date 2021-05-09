import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Form from '../screens/Form';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/form" component={Form} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
