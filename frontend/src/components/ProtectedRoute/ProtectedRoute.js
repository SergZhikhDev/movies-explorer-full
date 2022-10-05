import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Preloader from "../nested-components/Preloader/Preloader";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ isPreloader, component: Component, ...props }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <Route>
      {isPreloader ? (
        <Preloader />
      ) : isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )}
    </Route>
  );
}

export default ProtectedRoute;
