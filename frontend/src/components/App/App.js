import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import "./App.css";
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPreloader, setIsPreloader] = useState(true);
  const [likedFilms, setLikedFilms] = useState(null);

  const [isFetchError, setIsFetchError] = useState(false);
  const [controlToken, setControlToken] = useState(false);
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
  const controlReady = !!token && !!jwtLocal;
  useEffect(() => {
    setIsFetchError(false);
    if (controlReady) {
      ctrlToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    handleLoginToken();
    // eslint-disable-next-line
  }, []);

  const handleLoginToken = () => {
    const jwt = jwtLocal.load();
    if (jwt) {
      setToken(jwt);
      getUserInfo(jwt);
    } else {
      setIsPreloader(false);
    }
  };

  const handleRegister = (name, email, password) => {
    setIsFetchError(false);
    setIsLoading(true);
    mainApi
      .signup({ name, email, password })
      .then(() => {
        handleLogin(email, password);
      })
      .catch(() => {
        setIsFetchError(true);
        showAttention(reports.apiMessages.error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsPreloader(false);
      });
  };

  const handleLogin = (email, password) => {
    setIsFetchError(false);
    setIsLoading(true);

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
      .finally(() => {
        setIsLoading(false);
        setIsPreloader(false);
      });
  };

  function requestAllFilms() {
    setIsLoading(true);
    return moviesApi.getMovies().finally(() => {
      setIsLoading(false);
      setIsPreloader(false);
    });
  }

  function getUserInfo(token) {
    setIsLoading(true);
    mainApi
      .getUserInfo(token)

      .then((user) => {
        if (!isLoggedIn) setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        setIsPreloader(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsPreloader(false);
      });
  }

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    return mainApi
      .updateUserInfo({ name, email }, token)
      .then((res) => {
        setCurrentUser(res.data);
        showAttention(reports.attentionMessages.done.upd_profile);
      })
      .catch(() => {
        showAttention(reports.attentionMessages.error.upd_profile);
        throw new Error();
      })
      .finally(() => {
        setIsLoading(false);
        setIsPreloader(false);
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
    setIsLoading(true);
    return mainApi
      .fetchLikeFilms(token)
      .then((films) => {
        setLikedFilms(formatLikedFilms(films));
      })
      .catch(() => {
        showAttention(reports.apiMessages.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function requestLikeSavedFilms() {
    return mainApi.fetchLikeFilms(token);
  }

  function ctrlToken() {
    if (token === jwtLocal.load()) {
      setControlToken(true);
    } else {
      onSignOut();
      showAttention(reports.attentionMessages.error.autorization);
      setControlToken(false);
    }
  }

  function showAttention(message) {
    setMessageAttention(message);
    setIsActiveAttention(true);
    setTimeout(() => {
      setIsActiveAttention(false);
    }, 2000);
  }

  function formatLikedFilms(films) {
    return films.map((film) => ({
      movieId: film.movieId,
      _id: film._id,
    }));
  }

  return (
    <div className='App page'>
      <CurrentUserContext.Provider
        value={{ isLoggedIn, currentUser, isFetchError }}
      >
        <Switch>
          <Route exact path='/' component={Main} />

          <Route path='/signup'>
            {!isLoggedIn ? "" : <Redirect to='/' />}

            <Register
              handleRegister={handleRegister}
              isPreloader={isPreloader}
              isLoading={isLoading}
            />
          </Route>

          <Route path='/signin'>
            {!isLoggedIn ? "" : <Redirect to='/' />}
            <Login
              isLoading={isLoading}
              isPreloader={isPreloader}
              handleLogin={handleLogin}
            />
          </Route>

          <ProtectedRoute
            path='/profile'
            component={Profile}
            isLoading={isLoading}
            loggedIn={isLoggedIn}
            onSignOut={onSignOut}
            controlToken={controlToken}
            ctrlToken={ctrlToken}
            isPreloader={isPreloader}
            currentUser={currentUser}
            handleUpdateUser={handleUpdateUser}
          />

          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={isLoggedIn}
            isLoading={isLoading}
            filmsLocal={filmsLocal}
            likedFilms={likedFilms}
            isPreloader={isPreloader}
            requestAllFilms={requestAllFilms}
            requestLikeFilms={requestLikeFilms}
            filtredFilmsLocal={filtredFilmsLocal}
            handleClickLikeButton={handleClickLikeButton}
            searchQueryMoviesLocal={searchQueryMoviesLocal}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            token={token}
            isLoading={isLoading}
            filmsLocal={filmsLocal}
            likedFilms={likedFilms}
            isLoggedIn={isLoggedIn}
            controlToken={controlToken}
            isPreloader={isPreloader}
            requestLikeSavedFilms={requestLikeSavedFilms}
            filtredFilmsLocal={filtredFilmsLocal}
            handleClickLikeButton={handleClickLikeButton}
            searchQuerySavedMoviesLocal={searchQuerySavedMoviesLocal}
          ></ProtectedRoute>

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
