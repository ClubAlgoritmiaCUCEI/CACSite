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
import LoadingPost from "./Components/loading-post";

import UserProvider, { AllUsersProvider } from "./Providers/userProvider";
import CalendarProvider from "./Providers/calendarProvider";
import AttendanceProvider from "./Providers/attendanceProvider";
import PostsProvider from "./Providers/postsProvider";
import ClassProvider from "./Providers/classProvider";

import "./App.css";
import DefaultView from "./Views/default-view";

const DefaultLoadingPosts = (showUser = true) => {
  return (
    <div>
      <LoadingPost type="medium" showUser={showUser} />
      <LoadingPost type="small" showUser={showUser} />
      <LoadingPost type="big" showUser={showUser} />
    </div>
  );
};

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
                          fallback={DefaultLoadingPosts}
                        />
                      </Route>
                      <Route exact={true} path={"/home"}>
                        <DefaultView
                          selection="home"
                          lazyImport={() => import("./Views/home")}
                          fallback={DefaultLoadingPosts}
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
                            fallback={() => <LoadingPost type="medium" />}
                            match={match}
                          />
                        )}
                      />
                      <Route exact={true} path={"/public"}>
                        <DefaultView
                          selection="public"
                          lazyImport={() => import("./Views/public")}
                          fallback={DefaultLoadingPosts}
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
                            fallback={() => <LoadingPost type="medium" />}
                            match={match}
                          />
                        )}
                      />

                      <Route exact={true} path={"/editorial"}>
                        <DefaultView
                          selection="editorial"
                          lazyImport={() => import("./Views/editorial")}
                          fallback={() => DefaultLoadingPosts(false)}
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
                            fallback={() => <LoadingPost type="medium" />}
                            match={match}
                          />
                        )}
                      />

                      <Route exact={true} path={"/weekly-problems"}>
                        <DefaultView
                          selection="weekly-problem"
                          lazyImport={() => import("./Views/weeklyProblems")}
                          fallback={() => DefaultLoadingPosts(false)}
                        />
                      </Route>
                      <Route
                        exact={true}
                        path={"/weekly-problems/:id"}
                        render={({ match }) => (
                          <DefaultView
                            selection="weekly-problem"
                            lazyImport={() =>
                              import("./Components/single-post/weekly-post")
                            }
                            fallback={() => <LoadingPost type="medium" />}
                            match={match}
                          />
                        )}
                      />
                      <Route exact={true} path={"/calendar"}>
                        <DefaultView
                          selection="calendar"
                          lazyImport={() => import("./Views/calendar")}
                          fallback={() => null}
                        />
                      </Route>
                      <Route exact={true} path={"/attendance"}>
                        <DefaultView
                          selection="attendance"
                          lazyImport={() => import("./Views/attendanceCode")}
                          fallback={() => null}
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
                            fallback={() => null}
                          />
                        )}
                      ></Route>
                      <Route exact={true} path={"/create"}>
                        <DefaultView
                          selection="create"
                          lazyImport={() => import("./Views/create")}
                          fallback={() => null}
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
                            fallback={() => null}
                          />
                        )}
                      ></Route>
                      <Route
                        render={({ match }) => (
                          <DefaultView
                            selection="a"
                            lazyImport={() => import("./Views/home")}
                            fallback={DefaultLoadingPosts}
                          />
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
