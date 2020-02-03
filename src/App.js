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
import Calendar from "./Views/calendar";

import UserProvider from "./Providers/userProvider";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <div className="cac">
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact={true} path={"/login"}>
              <SignIn />
            </Route>
            <Route exact={true} path={"/"}>
              <>
                <Header />
                <Home />
                <Footer />
              </>
            </Route>
            <Route exact={true} path={"/home"}>
              <>
                <Header />
                <Home />
                <Footer />
              </>
            </Route>
            <Route exact={true} path={"/calendar"}>
              <>
                <Header />

                <Calendar />
                <Footer />
              </>
            </Route>

            <Route
              exact={true}
              path={"/profile"}
              render={({ match }) => (
                <>
                  <Header />
                  <Home match={match} />
                  <Footer />
                </>
              )}
            />
            <Route
              exact={true}
              path={"/profile/:uid"}
              render={({ match }) => (
                <>
                  <Header />
                  <Home match={match} />
                  <Footer />
                </>
              )}
            />
            <Route
              render={({ match }) => (
                <>
                  <Header />
                  {"404 page not found"}
                  <Footer />
                </>
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    </UserProvider>
  );
}

export default App;
