import React from "react";
import { useEffect, useState } from "react";

import "./Movies.css";
import { Header } from "../../nested-components/Header/Header";
import Footer from "../../nested-components/Footer/Footer";
import { SearchForm } from "../../nested-components/SearchForm/SearchForm";
import { MoviesCardList } from "../../nested-components/MoviesCardList/MoviesCardList";
import { filterFilms } from "../../../utils/filterFilms";
import {  setLike } from "../../../utils/likes";
import {
  count,
  reports,
  short_movie,
  breackpoint,
} from "../../../utils/constants";
import { useCardCount } from "../../../utils/useCardCount";

function Movies({
  path,
  isLoading,
  filmsLocal,
  likedFilms,
  requestAllFilms,
  requestLikeFilms,
  filtredFilmsLocal,
  handleClickLikeButton,
  searchQueryMoviesLocal,
}) {
  const [allFilms, setAllFilms] = useState(null);
  // const [likedFilms, setLikedFilms] = useState(null);
  const [queryValues, setQueryValues] = useState(null);
  const [filtredFilms, setFiltredFilms] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayedFilms, setDisplayedFilms] = useState(null);

  const { countAddFilms, startCountFilms, setParamsCountFilms } = useCardCount(
    count,
    breackpoint
  );

  useEffect(() => {
    getLikeFilms();
    setCountViewFilms();
    addResizeEvent();
    return () => removeResizeEvent();
    // eslint-disable-next-line
  }, []);

  // Загрузить фильмы с локального хранилища
  useEffect(() => {
    if (likedFilms && !isLoading) {
      loadFilmsLocal();
    }
    //eslint-disable-next-line
  }, [likedFilms, isLoading]);

  // Отфильтровать фильмы
  useEffect(() => {
    if (!queryValues) {
      setQueryValues(searchQueryMoviesLocal.load());
    }

    if (allFilms?.length && queryValues) {
      const films = filterFilms(allFilms, short_movie, queryValues);

      saveFiltredFilmsLocal(films);
      setFiltredFilms(films);

      films?.length
        ? hideErrorMessage()
        : showErrorMessage(reports.apiMessages.not_found);
    }
    // eslint-disable-next-line
  }, [allFilms]);

  // Отобразить фильм
  useEffect(() => {
    if (filtredFilms?.length) {
      const films = setLike(filtredFilms, likedFilms);
      setDisplayedFilms([...films.slice(0, startCountFilms)]);
    }
    // eslint-disable-next-line
  }, [filtredFilms, startCountFilms, allFilms]);

  function getLikeFilms() {
    requestLikeFilms();
  }

  function getAllFilms() {
    requestAllFilms()
      .then((allFilms) => {
        setAllFilms(allFilms);
        saveFilmsLocal(allFilms);
        hideErrorMessage();
      })
      .catch(() => {
        showErrorMessage(reports.apiMessages.error);
      })
      .finally(() => {});
  }

  function getAllLocalFilm() {
    setAllFilms(filmsLocal.load());
  }

  function searchFilms(values) {
    if (!!localStorage.allFilms) {
      getAllLocalFilm();
    } else {
      getAllFilms();
    }

    setQueryValues(values);
  }

  function showMoreFilms() {
    const startIndex = displayedFilms.length;
    const endIndex = startIndex + countAddFilms;

    setDisplayedFilms([
      ...displayedFilms,
      ...filtredFilms.slice(startIndex, endIndex),
    ]);
  }

  function saveFilmsLocal(films) {
    filmsLocal.save(films);
  }
  function saveFiltredFilmsLocal(films) {
    filtredFilmsLocal.save(films);
  }

  function loadFilmsLocal() {
    setAllFilms(filmsLocal.load());
  }

  function addResizeEvent() {
    window.addEventListener("resize", setParamsCountFilms);
  }

  function removeResizeEvent() {
    window.removeEventListener("resize", setParamsCountFilms);
  }

  function setCountViewFilms() {
    setParamsCountFilms("all");
  }

  function showErrorMessage(message) {
    setErrorMessage(message);
  }

  function hideErrorMessage() {
    setErrorMessage(null);
  }

  return (
    <>
      <Header />
      <main className='movies sp hp'>
        <SearchForm
          path={path}
          isLoading={isLoading}
          searchFilms={searchFilms}
          searchQueryLocal={searchQueryMoviesLocal}
        />
        <MoviesCardList
          films={displayedFilms}
          isLoading={isLoading}
          message={errorMessage}
          handleClickLikeButton={handleClickLikeButton}
        />
        {filtredFilms &&
          filtredFilms?.length > 3 &&
          filtredFilms?.length !== displayedFilms?.length && (
            <button
              type='button'
              className='more'
              onClick={() => showMoreFilms()}
            >
              <input id='more__toggle' type='checkbox' />
              <span></span>
              Ещё
            </button>
          )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
