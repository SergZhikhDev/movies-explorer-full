function formatLikedFilms(films) {
  return films.map((film) => ({
    movieId: film.movieId,
    _id: film._id,
  }));
}

function setLike(films, likedFilms) {
  return films.map((film) => {
    let isLike = false;
    let _id = null;

    likedFilms.forEach((likedFilm) => {
      isLike = film.id === likedFilm.movieId;
      if (isLike) _id = likedFilm._id;
    });

    return { ...film, _id };
  });
}

export { formatLikedFilms, setLike };
