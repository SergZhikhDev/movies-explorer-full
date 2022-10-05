import React from "react";

import "./FilterCheckbox.css";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";

function FilterCheckbox(props) {
  const startValue = { film: "", short: false };

  const { values, handleChange } = useFormWithValidation(startValue);

  const handleChangeCheckbox = (evt) => {
    evt.preventDefault();
    handleChange(evt);
    props.onChangeCheckbox(evt);
  };

  return (
    <div className='filter-checkbox'>
      <fieldset className='filter-checkbox__input-container filter-checkbox__input-container_checkbox'>
        <label className='filter-checkbox__label checkbox'>
          <input
            className='checkbox__invisible invisible'
            type='checkbox'
            name='short'
            checked={values.short}
            onChange={handleChangeCheckbox}
          />
          <span className='checkbox-switch'> </span>
          <span className='checkbox__label-text'>Короткометражки</span>
        </label>
      </fieldset>
    </div>
  );
}

export default FilterCheckbox;
