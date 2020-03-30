import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import FavoriteNumber from '../views/FavoriteNumber';
import AccessiblityForms from '../views/AccessiblityForms';
const NoMatch = () => 'There is nothing to see here';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/favorite-number">
        <FavoriteNumber />
      </Route>
      <Route path="/accessibility-forms">
        <AccessiblityForms />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
