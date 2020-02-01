import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

import Header from "./Components/header";
import Footer from "./Components/footer";

import Home from "./Views/home";
import Profile from "./Views/profile";
import SignIn from "./Views/signIn";


import UserProvider from "./Providers/userProvider";

import "./App.css";
function App() {
  return (
    <UserProvider>
      <div className="cac">
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              exact={true}
              path={"/"}
              render={({ match }) => <><Header /> <Home match={match} /><Footer /></>}
            />
            <Route
              exact={true}
              path={"/home"}
              render={({ match }) => <><Header /> <Home match={match} /><Footer /></>}
            />
            <Route
              exact={true}
              path={"/login"}
              render={({ match }) => <SignIn match={match} />}
            />
            <Route
              exact={true}
              path={"/profile"}
              render={({ match }) => <><Header /> <Home match={match} /><Footer /></>}
            />
            <Route
              exact={true}
              path={"/profile/:uid"}
              render={({ match }) => <><Header /> <Home match={match} /><Footer /></>}
            />
            <Route render={({ match }) => <> <Header /> <Home match={match} /> <Footer /></>} />
            <Home />
          </Switch>
        </HashRouter>
      </div>

    </UserProvider>
  );
}

export default App;
