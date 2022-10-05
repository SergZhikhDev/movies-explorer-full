import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import "./App.css";

import Main from "../pages-components/Main/Main";
import Movies from "../pages-components/Movies/Movies";
import SavedMovies from "../pages-components/SavedMovies/SavedMovies";
import Profile from "../pages-components/Profile/Profile";
import Login from "../pages-components/Login/Login";
import { Register } from "../pages-components/Register/Register";
import NotFound from "../pages-components/NotFound/NotFound";
import { Attention } from "../Attention/Attention";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { reports } from "../../utils/constants";

import LocalStorage from "../../utils/LocalStorage";

export const App = () => {
  // Данные текущего пользоволетя
  const [currentUser, setCurrentUser] = useState({});
  // Токен
  const [token, setToken] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Состояние ответа сервера
  const [isFetchError, setIsFetchError] = useState(false);

  const [isPreloader, setIsPreloader] = useState(true);

  const [messageAttention, setMessageAttention] = useState(null);
  const [isActiveAttention, setIsActiveAttention] = useState(false);

  const location = useLocation();

  const history = useHistory();
  const jwtLocal = new LocalStorage("jwt");
  const filmsLocal = new LocalStorage("films");
  const searchQueryMoviesLocal = new LocalStorage("search-query-movies", {
    film: "",
    short: false,
  });
  const searchQuerySavedMoviesLocal = new LocalStorage(
    "search-query-saved-movies",
    { film: "", short: false }
  );

  useEffect(() => {
    setIsFetchError(false);
  }, [location]);

  useEffect(() => {
    handleLoginToken();
    // eslint-disable-next-line
  }, []);
  // Вход по токену
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

  // Получить данные пользовотеля
  function getUserInfo(token) {
    mainApi
      .getUserInfo(token)
      .then((user) => {
        if (!isLoggedIn) setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        showAttention(reports.attentionMessages.error.get_user);
        throw new Error();
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  // Обновить данные пользовотеля
  function handleUpdateUser(name, email) {
    return mainApi
      .updateUserInfo({ name, email }, token)
      .then((res) => {
        setCurrentUser(res.data);
        history.push("/");
        showAttention(reports.attentionMessages.done.upd_profile);
      })
      .catch(() => {
        showAttention(reports.attentionMessages.error.upd_profile);
        throw new Error();
      });
  }

  function clearLocal() {
    jwtLocal.delete();
    filmsLocal.delete();
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
    }, 3000);
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
            searchQueryMoviesLocal={searchQueryMoviesLocal}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            handleClickLikeButton={handleClickLikeButton}
            requestLikeFilms={requestLikeFilms}
            isPreloader={isPreloader}
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
            <Login handleLogin={handleLogin} isPreloader={isPreloader} />
          </Route>

          <Route path='/signup'>
            <Register
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
