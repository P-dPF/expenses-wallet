import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <>
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </>
  );
}

export default connect()(App);
