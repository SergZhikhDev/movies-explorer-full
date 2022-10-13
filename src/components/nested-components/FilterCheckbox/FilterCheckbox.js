import React from "react";

import "./FilterCheckbox.css";

export const FilterCheckbox = ({ film, path,searchFilms, searchQueryLocal }) => {
  function onChangeCheckbox(e) {
    const newValues = { ...film.value, short: e.target.checked };
    film.handleCheckBoxChange(e);
    searchFilms(newValues);
    if(  path === "/movies"){searchQueryLocal.save(newValues)}
  }


  return (
    <div className='filter-checkbox'>
      <fieldset className='filter-checkbox__input-container filter-checkbox__input-container_checkbox'>
        <label
          className='filter-checkbox__label checkbox'
          disabled={!localStorage.allFilms}
        >
          <input
            className='checkbox__invisible invisible'
            type='checkbox'
            name='short'
            checked={film.value.short}
            onChange={onChangeCheckbox}
            disabled={!localStorage.allFilms }
          />
          <span className='checkbox-switch'></span>
          <span className='checkbox__label-text'>Короткометражки</span>
        </label>
      </fieldset>
    </div>
  );
};
