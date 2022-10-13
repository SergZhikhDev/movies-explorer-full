import React from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";

import {MoviesCard} from "../MoviesCard/MoviesCard";

export const MoviesCardList=(props)=> {
  return (
    <>
      {props.message ? (
        <p className='movies__attention '>{props.message}</p>
      ) : (
        <ul className='movies-list'>
          {props.isLoading ? (
            <Preloader />
          ) : (
            props.films?.map((film) => {
              return (
                <MoviesCard
                  film={film}
                  key={film.id || film.movieId}
                  handleClickLikeButton={props.handleClickLikeButton}
                />
              );
            })
          )}
        </ul>
      )}
    </>
  );
}

