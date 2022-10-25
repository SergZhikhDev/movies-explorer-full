import React, { useEffect, useState } from "react";

import "./SavedMovies.css";
import { Header } from "../../nested-components/Header/Header";
import Footer from "../../nested-components/Footer/Footer";
import { SearchForm } from "../../nested-components/SearchForm/SearchForm";
import { MoviesCardList } from "../../nested-components/MoviesCardList/MoviesCardList";

import { filterFilms } from "../../../utils/filterFilms";
import { reports, short_movie } from "../../../utils/constants";

export const SavedMovies = ({
  requestLikeSavedFilms,
  handleClickLikeButton,
  isLoading,
  searchQuerySavedMoviesLocal,
  path,
  token,
}) => {
  const [likedFilms, setLikedFilms] = useState(null);
  const [displayedFilms, setDisplayedFilms] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    getLikeSavedFilms();

    // eslint-disable-next-line
  }, []);

  function getLikeSavedFilms() {
    requestLikeSavedFilms()
      .then((films) => {
        setAllFilms(films);
        hideErrorMessage();
      })
      .catch(() => {
        showErrorMessage(reports.apiMessages.error);
      })
      .finally(() => {});
  }

  function searchFilms(values) {
    const films = filterFilms(likedFilms, short_movie, values);
    setDisplayedFilms(films);

    films?.length
      ? hideErrorMessage()
      : showErrorMessage(reports.apiMessages.not_found);
  }

  function handleDeleteFilm(filmId) {
    handleClickLikeButton(filmId).then(() =>
      setAllFilms(likedFilms.filter((film) => film._id !== filmId))
    );
  }

  function setAllFilms(films) {
    setLikedFilms(films);
    setDisplayedFilms(films);
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
      <main className='saved-movies sp'>
        <SearchForm
          path={path}
          isLoading={isLoading}
          searchFilms={searchFilms}
          searchQueryLocal={searchQuerySavedMoviesLocal}
        />
        <MoviesCardList
          films={displayedFilms}
          isLoading={isLoading}
          message={errorMessage}
          handleClickLikeButton={handleDeleteFilm}
        />
      </main>
      <Footer />
    </>
  );
};
