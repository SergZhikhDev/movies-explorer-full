import React, { useContext } from "react";

import "./MenuResponce.css";
import MenuNavBtnsList from "../MenuNavBtnsList/MenuNavBtnsList";
import MenuAuthBtnsList from "../MenuAuthBtnsList/MenuAuthBtnsList";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function MenuResponce() {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <div className=' res-menu '>
      <input id='res-menu__toggle' type='checkbox' />
      <label className='res-menu__btn' htmlFor='res-menu__toggle'>
        <span></span>
      </label>
      {isLoggedIn && <MenuNavBtnsList />}
      {!isLoggedIn && <MenuAuthBtnsList />}
    </div>
  );
}

export default MenuResponce;
