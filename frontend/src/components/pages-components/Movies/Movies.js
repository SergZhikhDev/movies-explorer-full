import React from "react";
import { useEffect, useState } from "react";

import "./Movies.css";
import Header from "../../nested-components/Header/Header";
import Footer from "../../nested-components/Footer/Footer";
import SearchForm from "../../nested-components/SearchForm/SearchForm";
import {MoviesCardList} from "../../nested-components/MoviesCardList/MoviesCardList";
import { filterFilms } from "../../../utils/filterFilms";
import { formatLikedFilms, setLike } from "../../../utils/likes";
import {
  reports,
  count,
  breackpoint,
  short_movie,
} from "../../../utils/constants";
import { useCardCount } from "../../../utils//useCardCount";

function Movies({
  requestAllFilms,
  requestLikeFilms,
  handleClickLikeButton,
  filmsLocal,
  searchQueryMoviesLocal,
}) {
  // Фильмы
  const [allFilms, setAllFilms] = useState(null);
  const [likedFilms, setLikedFilms] = useState(null);
  const [filtredFilms, setFiltredFilms] = useState(null);
  const [displayedFilms, setDisplayedFilms] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryValues, setQueryValues] = useState(null);
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
    if (allFilms?.length && queryValues) {
      const films = filterFilms(allFilms, short_movie, queryValues);
      saveFilmsLocal(films);
      setFiltredFilms(films);

      films?.length ? hideErrorMessage() : showErrorMessage(reports.apiMessages.not_found);
    }
    // eslint-disable-next-line
  }, [allFilms, queryValues]);

  // Отобразить фильмы
  useEffect(() => {
    if (filtredFilms?.length) {
      const films = setLike(filtredFilms, likedFilms);
      setDisplayedFilms([...films.slice(0, startCountFilms)]);
    }
    // eslint-disable-next-line
  }, [filtredFilms, startCountFilms]);

  function getLikeFilms() {
    startLoader();
    requestLikeFilms()
      .then((films) => {
        setLikedFilms(formatLikedFilms(films));
        hideErrorMessage();
      })
      .catch(() => {
        showErrorMessage(reports.apiMessages.error);
      })
      .finally(() => {
        stopLoader();
      });
  }

  function getAllFilms() {
    startLoader();
    requestAllFilms()
      .then((films) => {
        setAllFilms(films);
        hideErrorMessage();
      })
      .catch(() => {
        showErrorMessage(reports.apiMessages.error);
      })
      .finally(() => {
        stopLoader();
      });
  }

  function searchFilms(values) {
    if (!allFilms?.length) getAllFilms();
    setQueryValues(values);
  }

  function startLoader() {
    setIsLoading(true);
  }

  function stopLoader() {
    setIsLoading(false);
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

  function loadFilmsLocal() {
    const localFilms = filmsLocal.load();
    setFiltredFilms(localFilms);
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
