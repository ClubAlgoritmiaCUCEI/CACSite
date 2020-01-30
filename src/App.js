import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './Components/header'
import Footer from './Components/footer'

import Home from './Views/home'
import Profile from './Views/profile'

import UserProvider from './Providers/userProvider';

import './App.css';
function App() {
  return (
    <UserProvider>
      <Header />
      <div className="cac">
        <Router>
          <Switch>
            <Route exact={true} path={'/'} render={({ match }) => <Home match={match} />} />
            <Route exact={true} path={'/home'} render={({ match }) => <Home match={match} />} />
            <Route exact={true} path={'/profile'} render={({ match }) => <Profile match={match} />} />
            <Route exact={true} path={'/profile/:uid'} render={({ match }) => <Profile match={match} />} />
            <Route render={({ match }) => (<div>Pagina no encontrada :$</div>)} />
            <Home />
          </Switch>
        </Router>
      </div>

      <Footer />
    </UserProvider>
  )
}

export default App;
