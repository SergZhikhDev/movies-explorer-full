import React from "react";
import { Link } from "react-router-dom";
import "./MenuAuthBtnsList.css";

function MenuAuthBtnsList() {
  return (
    <nav
      className='
        btns-block__list_res-menu
        btns-block__list_res-menu_type_auth
      btns-block__list
      btns-block__list_type_auth
       '
    >
      <Link
        className='btns-block__link_signup-btn
            btns-block__link
             '
        to='/'
      ></Link>
      <Link
        className='btns-block__link_signup-btn
            btns-block__link
             '
        to='signup'
      >
        Регистрация
      </Link>

      <Link
        className='btns-block__link_login-btn
            btns-block__link
             btns-block 
             '
        to='signin'
      >
        Войти
      </Link>
    </nav>
  );
}

export default MenuAuthBtnsList;
