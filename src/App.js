import React from "react";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

import SignIn from "./Views/signIn";
import SignUp from "./Views/signUp";

import UserProvider, { AllUsersProvider } from "./Providers/userProvider";
import CalendarProvider from "./Providers/calendarProvider";
import AttendanceProvider from "./Providers/attendanceProvider";
import PostsProvider from "./Providers/postsProvider";
import ClassProvider from "./Providers/classProvider";

import "./App.css";
import DefaultView from "./Views/default-view";

const App = () => {
  return (
    <UserProvider>
      <AllUsersProvider>
        <PostsProvider>
          <AttendanceProvider>
            <CalendarProvider>
              <ClassProvider>
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
                        <DefaultView
                          selection="home"
                          lazyImport={() => import("./Views/home")}
                        />
                      </Route>
                      <Route exact={true} path={"/home"}>
                        <DefaultView
                          selection="home"
                          lazyImport={() => import("./Views/home")}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/posts/:id"}
                        render={({ match }) => (
                          <DefaultView
                            selection="home"
                            lazyImport={() =>
                              import("./Components/single-post/home-post")
                            }
                            match={match}
                          />
                        )}
                      />
                      <Route exact={true} path={"/public"}>
                        <DefaultView
                          selection="public"
                          lazyImport={() => import("./Views/public")}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/public/:id"}
                        render={({ match }) => (
                          <DefaultView
                            selection="public"
                            lazyImport={() =>
                              import("./Components/single-post/public-post")
                            }
                            match={match}
                          />
                        )}
                      />

                      <Route exact={true} path={"/editorial"}>
                        <DefaultView
                          selection="editorial"
                          lazyImport={() => import("./Views/editorial")}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/editorial/:id"}
                        render={({ match }) => (
                          <DefaultView
                            selection="editorial"
                            lazyImport={() =>
                              import("./Components/single-post/editorial-post")
                            }
                            match={match}
                          />
                        )}
                      />

                      <Route exact={true} path={"/weekly-problem"}>
                        <DefaultView
                          selection="weekly-problem"
                          lazyImport={() => import("./Views/weeklyProblems")}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/weekly-problem/:id"}
                        render={({ match }) => (
                          <DefaultView
                            selection="weekly-problem"
                            lazyImport={() =>
                              import("./Components/single-post/weekly-post")
                            }
                            match={match}
                          />
                        )}
                      />
                      <Route exact={true} path={"/calendar"}>
                        <DefaultView
                          selection="calendar"
                          lazyImport={() => import("./Views/calendar")}
                        />
                      </Route>
                      <Route exact={true} path={"/attendance"}>
                        <DefaultView
                          selection="attendance"
                          lazyImport={() => import("./Views/attendanceCode")}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/attendance/:code"}
                        render={({ match }) => (
                          <DefaultView
                            selection="attendance"
                            lazyImport={() => import("./Views/attendance")}
                            match={match}
                          />
                        )}
                      ></Route>
                      <Route exact={true} path={"/create"}>
                        <DefaultView
                          selection="create"
                          lazyImport={() => import("./Views/create")}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/create/:cid"}
                        render={({ match }) => (
                          <DefaultView
                            selection="create"
                            lazyImport={() => import("./Views/create")}
                            match={match}
                          />
                        )}
                      ></Route>
                      <Route
                        render={({ match }) => (
                          <DefaultView>{"Error 404"}</DefaultView>
                        )}
                      />
                    </Switch>
                  </HashRouter>
                </div>
              </ClassProvider>
            </CalendarProvider>
          </AttendanceProvider>
        </PostsProvider>
      </AllUsersProvider>
    </UserProvider>
  );
};

export default App;
