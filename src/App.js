import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PrivateRoute from './routes/PrivateRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Parties from './components/parties/Parties';
import Party from './components/parties/Party';
import NewParty from './components/parties/NewParty';
import withContext from './components/withContext';

import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin/>
        </Route>
        <PrivateRoute path="/xx">
          <Parties/>
        </PrivateRoute>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/parties/new">
          <NewParty/>
        </Route>
        <Route path="/parties/:id">
          <Party/>
        </Route>
        <Route path="/parties">
          <Parties/>
        </Route>
        <Route path="/">
          <Parties/>
        </Route>
      </Switch>
    </Router>
  );
}

export default withContext(App);
