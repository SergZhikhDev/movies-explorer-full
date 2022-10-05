import React from "react";
import { useEffect, useState } from "react";

import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import {ErrorText} from "../ErrorText/ErrorText";

import { useFormWithValidation } from "../../../hooks/useFormWithValidation";

function SearchForm({ searchFilms, searchQueryLocal }) {
  const startValue = { film: "", short: false };

  const { values, isValid, handleChange, setValues, setIsValid } =
    useFormWithValidation(startValue);
  // Состояние ошибки поиска
  const [isSearchError, setIsSearchError] = useState(false);

  useEffect(() => {
    const searchQuery = searchQueryLocal.load();

    setValues(searchQuery);
    if (searchQuery) setIsValid(true);
  }, [searchQueryLocal, setIsValid, setValues]);


  function onChangeCheckbox(evt) {
    const newValues = { ...values, short: evt.target.checked };

    handleChange(evt);
    searchFilms(newValues);
    searchQueryLocal.save(newValues);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    searchQueryLocal.save(values);

    if (!isValid) {
      setIsSearchError(true);
    } else {
      setIsSearchError(false);
      searchFilms(values);
    }
  }

  console.log(values.film)
  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmitForm} noValidate>
        <div className='search__search-movie-container'>
          <fieldset className='search__input-container search__input-container_film'>
            <input
              type='text'
              className='search__movie'
              name='film'
              placeholder='Фильм'
              required
              id='search-movie'
              value={values.film || ''}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className='search__input-container search__input-container_btn submit-button'>
            <button type='submit' className='search__label submit-button'>
              <div
                type='submit'
                className='submit-button__invisible invisible'
              />
              <div className='search__button ' />
            </button>
          </fieldset>

        </div>
        <hr className='search__line line line_search'></hr>
        <div className='search__error'>
          {" "}
          {isSearchError && (
            <ErrorText type='search'>Нужно ввести ключевое слово</ErrorText>
          )}
        </div>

        <FilterCheckbox
          onChangeCheckbox={onChangeCheckbox}
          searchFilms={searchFilms}
          searchQueryLocal={searchQueryLocal}
        />
      </form>
    </section>
  );
}

export default SearchForm;
