import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuNavBtnsList.css";

function MenuNavBtnsList() {
  return (
    <nav
      className='
      btns-block__list_res-menu
      btns-block__list
      btns-block__list_type_navigation
      
        '
    >
      <NavLink
        to='/'
        exact
        activeClassName='btns-block__link_active'
        className=' btns-block__link '
      >
        Главная
      </NavLink>
      <NavLink
        to='movies'
        exact
        activeClassName='btns-block__link_active'
        className=' btns-block__link '
      >
        Фильмы
      </NavLink>
      <NavLink
        to='saved-movies'
        exact
        activeClassName='btns-block__link_active'
        className=' btns-block__link '
      >
        Соохранённые фильмы
      </NavLink>
      <NavLink
        to='profile'
        exact
        activeClassName='btns-block__link_active'
        className=' btns-block__link accaunt-btn '
      ></NavLink>
    </nav>
  );
}

export default MenuNavBtnsList;
