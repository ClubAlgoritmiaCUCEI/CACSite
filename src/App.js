import React from "react";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";



import Home from "./Views/home";
import SignIn from "./Views/signIn";
import SignUp from "./Views/signUp";
import Calendar from "./Views/calendar";
import Attendance from "./Views/attendance";

import UserProvider, { AllUsersProvider } from "./Providers/userProvider";

import CalendarProvider from "./Providers/calendarProvider";

import "./App.css";
import DefaultView from "./Views/default-view";

const App = () => {
  return (
    <CalendarProvider>
      <UserProvider>
        <AllUsersProvider>
          <div className="cac">
            <HashRouter basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route exact={true} path={"/login"}>
                  <SignIn />
                </Route>
                <Route exact={true} path={"/signup"}>
                  <SignUp />
                </Route>
                <Route exact={true} path={"/"}>
                  <DefaultView selection="home">
                    <Home />
                  </DefaultView>
                </Route>
                <Route exact={true} path={"/home"}>
                  <DefaultView selection="home">
                    <Home />
                  </DefaultView>
                </Route>
                <Route exact={true} path={"/calendar"}>
                  <DefaultView selection="calendar">
                    <Calendar />
                  </DefaultView>
                </Route>
                <Route exact={true} path={"/attendance"}>
                  <DefaultView selection="attendance">
                    <Attendance />
                  </DefaultView>
                </Route>

                <Route
                  exact={true}
                  path={"/profile"}
                  render={({ match }) => (
                    <DefaultView selection="home">
                      <Home />
                    </DefaultView>
                  )}
                />
                <Route
                  exact={true}
                  path={"/profile/:uid"}
                  render={({ match }) => (
                    <DefaultView selection="home">
                      <Home />
                    </DefaultView>
                  )}
                />
                <Route
                  render={({ match }) => (
                    <DefaultView>{"Error 404"}</DefaultView>
                  )}
                />
              </Switch>
            </HashRouter>
          </div>
        </AllUsersProvider>
      </UserProvider>
    </CalendarProvider>
  );
};

export default App;
