import React from "react";

import "./SearchForm.css";

import { ErrorText } from "../ErrorText/ErrorText";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import { useInputt } from "../../../hooks/useInput";
import { config } from "../../../utils/constants";

export const SearchForm = ({ searchFilms, searchQueryLocal }) => {
  const film = useInputt({ field: "", short: false }, config.etc);

  function onChangeCheckbox(e) {
    const newValues = { ...film.value, short: e.target.checked };
    searchFilms(newValues);
    searchQueryLocal.save(newValues);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    const newValues = { ...film.value, short: evt.target.checked };
    searchQueryLocal.save(newValues);

    searchFilms(newValues);
  }

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmitForm} noValidate>
        <div className='search__search-movie-container'>
          <fieldset className='search__input-container search__input-container_film'>
            <input
              type='text'
              className='search__movie'
              autoComplete='off'
              name='film'
              placeholder='Фильм'
              required
              id='search-movie'
              value={film.value.field || ""}
              onChange={film.handleChange}
              onBlur={film.onBlur}
              ref={film.callbackRef}
            />
          </fieldset>
          <fieldset className='search__input-container search__input-container_btn submit-button'>
            <button
              type='submit'
              className='search__button '
              disabled={!localStorage.films && !film.inputValid}
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
          onChangeCheckbox={onChangeCheckbox}
          inputValid={film.inputValid}
        />
      </form>
    </section>
  );
};
