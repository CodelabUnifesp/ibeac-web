import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Login from '../screens/Login'
import Home from '../screens/Home'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;