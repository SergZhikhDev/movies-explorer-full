import React, { useState } from "react";

import "./FilterCheckbox.css";

export const FilterCheckbox = ({ onChangeCheckbox, inputValid,}) => {
  const [checked, setChecked] = useState(false);

  const handleChangeCheckbox = (e) => {
    !checked ? setChecked(true) : setChecked(false);
    onChangeCheckbox(e);
  };


 return (
    <div className='filter-checkbox'>
      <fieldset className='filter-checkbox__input-container filter-checkbox__input-container_checkbox'>
        <label
          className='filter-checkbox__label checkbox'
          disabled={!localStorage.films && !inputValid}
        >
          <input
            className='checkbox__invisible invisible'
            type='checkbox'
            name='short'
            checked={checked}
            onChange={handleChangeCheckbox}
            disabled={!localStorage.films && !inputValid}
          />
          <span className='checkbox-switch' ></span>
          <span className='checkbox__label-text'>Короткометражки</span>
        </label>
      </fieldset>
    </div>
  );
};















