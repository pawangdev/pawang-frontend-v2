import React, { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import OneSignal from "react-onesignal";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";
import runOneSignal from "./onesignal";

const Layout = lazy(() => import("./layouts/Layout"));
const Login = lazy(() => import("./pages/Authentication/Login/Login"));
const Register = lazy(() => import("./pages/Authentication/Register/Register"));
const ForgotPassword = lazy(() =>
  import("./pages/Authentication/ForgotPassword/ForgotPassword")
);

function App() {
  useEffect(() => {
    runOneSignal();
  }, []);

  return (
    <div className="antialiased">
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <Redirect exact from="/" to="/login" />

          <PrivateRoute>
            <Route path="/app" component={Layout} />
          </PrivateRoute>
        </Switch>
      </Router>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
