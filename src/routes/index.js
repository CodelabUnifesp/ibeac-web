import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Default from '../layouts/default';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Form from '../screens/Form';

function Routes() {
  return (
    <BrowserRouter>
      <Default>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/form" component={Form} />
        </Switch>
      </Default>
    </BrowserRouter>
  );
}

export default Routes;
