import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./MoviesCard.css";

import { base_url } from "../../../utils/constants";
import { formatDuration } from "../../../utils/formatDuration";

export const MoviesCard = ({ film, handleClickLikeButton }) => {
  const [filmId, setFilmId] = useState("");

  const isSavedMovies = useHistory().location.pathname === "/saved-movies";

  let imageUrl;
  let trailerLink;
  const regexLink =
    /^http(s|)(:|)\/\/(www.|)((\w+|\d+)(-|\.))+[a-z]{2,3}(\S+|)(#| +|)$/i;

  if (!regexLink.test(String(film.trailerLink).toLowerCase())) {
    trailerLink = "https://www.youtube.com/watch?v=5oX5R_IFvTs&t=9s";
  } else {
    trailerLink = film.trailerLink;
  }

  if (!film.image.url) {
    imageUrl = `${film.image}`;
  } else {
    imageUrl = `${base_url}/${film.image.url}`;
  }

  useEffect(() => {
    const filmId = film._id;
    if (filmId) setFilmId(filmId);
  }, [film._id]);

  function clickLikeButton() {
    if (isSavedMovies) {
      handleClickLikeButton(filmId);
    } else {
      const filmData = {
        country: film.country || "-",
        director: film.director || "-",
        duration: film.duration,
        year: film.year || "-",
        description: film.description || "-",
        image: base_url + film.image.url,
        trailerLink: trailerLink,
        nameRU: film.nameRU || "-",
        nameEN: film.nameEN || "-",
        thumbnail: base_url + film.image.formats.thumbnail.url,
        movieId: film.id,
      };

      handleClickLikeButton(filmId, filmData).then((film) => {
        setFilmId(filmId ? "" : film._id);
      });
    }
  }

  useEffect(() => {}, []);

  return (
    <li className='card-movie'>
      <div className='card-movie__description'>
        <p className='card-movie__title'>{film.nameRU}</p>
        <p className='card-movie__duration'>{formatDuration(film.duration)}</p>
        <button
          type='button'
          className={
            filmId
              ? "card-movie__flag card-movie__flag_active  card-movie__close-cross"
              : "card-movie__flag"
          }
          onClick={clickLikeButton}
        ></button>
      </div>
      <a
        href={trailerLink}
        target='_blank'
        rel='noreferrer'
        className='card-movie__link'
      >
        <span
          title={`Название: ${film.nameRU}. \n\nОписание: ${film.description} \n\nСнято: ${film.country} ${film.year}г.`}
          className='card-movie__overlay'
        ></span>

        <img className='card-movie__image' src={imageUrl} alt={film.nameRU} />
      </a>
    </li>
  );
};
