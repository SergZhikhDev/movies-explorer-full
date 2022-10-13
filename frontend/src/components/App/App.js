import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import "./App.css";
import { Form } from "../pages-components/Form/Form";
import { Main } from "../pages-components/Main/Main";
import Login from "../pages-components/Login/Login";
import Movies from "../pages-components/Movies/Movies";
import NotFound from "../pages-components/NotFound/NotFound";
import { Profile } from "../pages-components/Profile/Profile";
import { Register } from "../pages-components/Register/Register";
import { SavedMovies } from "../pages-components/SavedMovies/SavedMovies";
import { Attention } from "../Attention/Attention";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { mainApi } from "../../utils/MainApi";
import { reports } from "../../utils/constants";
import { moviesApi } from "../../utils/MoviesApi";
import LocalStorage from "../../utils/LocalStorage";

export const App = () => {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [messageAttention, setMessageAttention] = useState(null);
  const [isActiveAttention, setIsActiveAttention] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const jwtLocal = new LocalStorage("jwt");
  const filmsLocal = new LocalStorage("allFilms");
  const filtredFilmsLocal = new LocalStorage("filtredFilms");
  const searchQuerySavedMoviesLocal = new LocalStorage(
    "searchQuerySavedMovies",
    { field: "", short: false }
  );
  const searchQueryMoviesLocal = new LocalStorage("searchQueryMovies", {
    field: "",
    short: false,
  });

  useEffect(() => {
    setIsFetchError(false);
  }, [location]);

  useEffect(() => {
    handleLoginToken();
    // eslint-disable-next-line
  }, []);

  const handleLoginToken = () => {
    const token = jwtLocal.load();
    if (token) {
      setToken(token);
      getUserInfo(token);
    } else {
      setIsPreloader(false);
    }
  };

  const handleRegister = (name, email, password) => {
    setIsFetchError(false);
    mainApi
      .signup({ name, email, password })
      .then(() => {
        handleLogin(email, password);
      })
      .catch(() => {
        setIsFetchError(true);
        showAttention(reports.apiMessages.error);
      })
      .finally(() => {});
  };

  const handleLogin = (email, password) => {
    setIsFetchError(false);

    mainApi
      .signin({ email, password })
      .then((res) => {
        const token = res.token;
        setToken(token);
        setIsLoggedIn(true);
        jwtLocal.save(token);
        getUserInfo(token);
        history.push("/movies");
      })
      .catch(() => {
        setIsFetchError(true);
      })
      .finally(() => {});
  };

  function requestAllFilms() {
    return moviesApi.getMovies();
  }

  function getUserInfo(token) {
    mainApi
      .getUserInfo(token)
      .then((user) => {
        if (!isLoggedIn) setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        // showAttention(reports.attentionMessages.error.get_user);
        // throw new Error();
        setIsPreloader(false);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleUpdateUser(name, email) {
    return mainApi
      .updateUserInfo({ name, email }, token)
      .then((res) => {
        setCurrentUser(res.data);
        showAttention(reports.attentionMessages.done.upd_profile);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(() => {
        showAttention(reports.attentionMessages.error.upd_profile);
        throw new Error();
      });
  }

  function clearLocal() {
    jwtLocal.delete();
    filmsLocal.delete();
    filtredFilmsLocal.delete();
    searchQueryMoviesLocal.delete();
    searchQuerySavedMoviesLocal.delete();
  }

  // Выйти из профиля
  function onSignOut() {
    setIsLoggedIn(false);
    setToken("");
    setCurrentUser({});
    clearLocal();
    history.push("/");
  }

  // Изменение флажка у фильма
  function handleClickLikeButton(filmId, film) {
   
    return filmId
      ? mainApi.deleteLikeFilm(filmId, token).catch(() => {
          showAttention(Attention - reports.error.delete_movie);
          throw new Error();
        })
      : mainApi.addLikeFilm(film, token).catch(() => {
          showAttention(reports.attentionMessages.error.add_movie);
          throw new Error();
        });
  }

  // Запросить отмеченные фильмы
  function requestLikeFilms() {
    return mainApi.fetchLikeFilms(token);
  }

  function showAttention(message) {
    setMessageAttention(message);
    setIsActiveAttention(true);
    setTimeout(() => {
      setIsActiveAttention(false);
    }, 2000);
  }
  return (
    <div className='App page'>
      <CurrentUserContext.Provider
        value={{ isLoggedIn, currentUser, isFetchError }}
      >
        <Switch>
          <Route exact path='/' component={Main} />

          <ProtectedRoute
            path='/movies'
            loggedIn={isLoggedIn}
            component={Movies}
            requestAllFilms={requestAllFilms}
            handleClickLikeButton={handleClickLikeButton}
            requestLikeFilms={requestLikeFilms}
            isPreloader={isPreloader}
            filmsLocal={filmsLocal}
            filtredFilmsLocal={filtredFilmsLocal}
            searchQueryMoviesLocal={searchQueryMoviesLocal}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            handleClickLikeButton={handleClickLikeButton}
            requestLikeFilms={requestLikeFilms}
            isPreloader={isPreloader}
            filmsLocal={filmsLocal}
            filtredFilmsLocal={filtredFilmsLocal}
            searchQuerySavedMoviesLocal={searchQuerySavedMoviesLocal}
          ></ProtectedRoute>

          <ProtectedRoute
            path='/profile'
            loggedIn={isLoggedIn}
            component={Profile}
            currentUser={currentUser}
            handleUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
            isPreloader={isPreloader}
          />

          <Route path='/signin'>
            {!isLoggedIn ? "" : <Redirect to='/' />}
            <Login handleLogin={handleLogin} isPreloader={isPreloader} />
          </Route>

          <Route path='/signup'>
            {!isLoggedIn ? "" : <Redirect to='/' />}
            <Register
              handleRegister={handleRegister}
              isPreloader={isPreloader}
            />
          </Route>

          <Route path='/form'>
            <Form 
                handleRegister={handleRegister}
                isPreloader={isPreloader}
            />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Attention
        messageAttention={messageAttention}
        isActiveAttention={isActiveAttention}
      />
    </div>
  );
};
