import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { closeSidebar } from "../features/sidebarSlice";
import routes from "../routes";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ThemedSuspense from "../components/ThemedSuspense";
import Main from "./Main";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.value);
  let location = useLocation();

  useEffect(() => {
    dispatch(closeSidebar());
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
