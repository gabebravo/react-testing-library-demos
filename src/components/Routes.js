import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import FavoriteNumber from '../views/FavoriteNumber';
import AccessiblityForms from '../views/AccessiblityForms';
import GreetingLoader from '../views/GreetingLoader';
import HiddenMessage from '../views/HiddenMessage';
import PostEditor from '../views/PostEditor';
import ReduxCounter from '../views/ReduxCounter';
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
      <Route path="/greeting-loader">
        <GreetingLoader />
      </Route>
      <Route path="/hidden-message">
        <HiddenMessage />
      </Route>
      <Route path="/post-editor">
        <PostEditor />
      </Route>
      <Route path="/redux-counter">
        <ReduxCounter />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
