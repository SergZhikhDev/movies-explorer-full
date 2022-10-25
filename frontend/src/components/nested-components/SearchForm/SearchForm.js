import React, { useEffect, useState } from "react";

import "./SearchForm.css";

import { config } from "../../../utils/constants";
import { ErrorText } from "../ErrorText/ErrorText";
import { useInputt } from "../../../hooks/useInput";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";

export const SearchForm = ({
  searchFilms,
  searchQueryLocal,
  path,
  isLoading,
}) => {
  const film = useInputt(searchQueryLocal.load(), config.etc);

  const [disabledButton, setDisabledButton] = useState(true);
  useEffect(() => {
    film.inputValid ? setDisabledButton(false) : setDisabledButton(true);
  }, [film.inputValid, isLoading]);

  function handleSubmitForm(e) {
    e.preventDefault();

    if (path === "/movies") {
      searchQueryLocal.save(film.value);
    }

    searchFilms(film.value);
  }
  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmitForm} noValidate>
        <div className='search__search-movie-container'>
          <fieldset className='search__input-container search__input-container_film'>
            <input
              className='search__movie'
              name='field'
              type='text'
              autoComplete='off'
              placeholder='Фильм'
              onBlur={film.onBlur}
              disabled={isLoading}
              ref={film.callbackRef}
              value={film.value.field || ""}
              onChange={film.handleCheckBoxChange}
            />
          </fieldset>
          <fieldset className='search__input-container search__input-container_btn submit-button'>
            <button
              type='submit'
              className='search__button '
              disabled={disabledButton}
            ></button>
          </fieldset>
        </div>
        <hr className='search__line line line_search'></hr>
        <div className='search__error'>
          {film.isDirty && film.errorMessages && (
            <ErrorText type='search'>Нужно ввести ключевое слово</ErrorText>
          )}
        </div>

        <FilterCheckbox
          film={film}
          path={path}
          searchFilms={searchFilms}
          searchQueryLocal={searchQueryLocal}
        />
      </form>
    </section>
  );
};
