import React, { useContext } from "react";

import "./Register.css";

import Logo from "../../nested-components/Logo/Logo";
import { Link } from "react-router-dom";
import {ErrorText} from "../../nested-components/ErrorText/ErrorText";
import { config } from "../../../utils/constants";

import { useInputt } from "../../../hooks/useInput";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export const Register = (props) => {
  const { isFetchError } = useContext(CurrentUserContext);

  const name = useInputt("", config.name);
  const email = useInputt("", config.email);
  const password = useInputt("", config.password);


  const onSubmit = (e) => {
    e.preventDefault(e);
    props.handleRegister(name.value, email.value, password.value);
  };
  return (
    <>
    <div className='form__header form__header_type_auth'>
          <Logo />
        </div>
      <form className='form register sfp_type_reg hp' onSubmit={onSubmit}>
        

        <div className='form__container form__container_type_auth'>
          <main className='form__admin form__admin_type_auth'>
            <h3 className='form__heading form__heading_type_auth'>
              Добро пожаловать!
            </h3>
            {/* <fieldset className='form__input-container form__input-container_type_auth'> */}
              <label className='form__label form__label_type_auth'>Имя
                {/* <span className='form__text form__text_type_auth'>  </span> */}
                <input
                  className='form__item form__item_type_auth form__item_el_name form__item_el_name_type_auth'
                  onChange={name.handleChange}
                  value={name.value}
                  onClick={name.onClick}
                  onBlur={name.onBlur}
                  name='name'
                  type='text'
                  autoComplete='off'
                  placeholder='Имя'
                  required
                />
                <hr className='form__line line line_form line_form_type_auth'></hr>
                <span className='form__error' id='error-userName'>
                  {name.isDirty && (
                    <ErrorText type='auth'>{name.errorMessages}</ErrorText>
                  )}
                </span>
              </label>
              <label className='form__label form__label_type_auth'> Email
                {/* <span className='form__text form__text_type_auth'> </span> */}
                <input
                  className='form__item form__item_type_auth form__item_el_email form__item_el_email_type_auth'
                  onChange={email.handleChange}
                  value={email.value}
                  onClick={email.onClick}
                  onBlur={email.onBlur}
                  name='email'
                  type='email'
                  autoComplete='off'
                  placeholder='Email'
                  required
                />
                <hr className='form__line line line_form line_form_type_auth'></hr>
                <span className='form__error' id='error-userEmail'>
                  {email.isDirty && (
                    <ErrorText type='auth'> {email.errorMessages}</ErrorText>
                  )}
                </span>
              </label>
              <label className='form__label form__label_type_auth'>Пароль
                {/* <span className='form__text form__text_type_auth'></span> */}
                <input
                  className='form__item form__item_type_auth form__item_type_auth_error form__item_el_name form__item_el_name_type_auth'
                  onChange={password.handleChange}
                  value={password.value}
                  onClick={password.onClick}
                  onBlur={password.onBlur}
                  name='password'
                  type='password'
                  autoComplete='off'
                  placeholder='Password'
                  required
                />
                <hr className='form__line line line_form line_form_type_auth'></hr>
                <span className='form__error' id='error-userPassword'>
                  {password.isDirty && (
                    <ErrorText type='auth'> {password.errorMessages}</ErrorText>
                  )}
                </span>
              </label>
            {/* </fieldset> */}
            {/* <fieldset className='form__handlers form__handlers_type_auth'> */}
              <label className='form__label form__label_el_button'>
                <input type='submit' className='form__item invisible' />
                <button
                  type='submit'
                  className='form__button form__button_el_button form__text'
                  disabled={
                    !name.inputValid ||
                    !email.inputValid ||
                    !password.inputValid
                  }
                >
                  {" "}
                  Зарегистрироваться{" "}
                </button>
              </label>
              {isFetchError && (
                <ErrorText type='auth-button'>Что-то пошло не так...</ErrorText>
              )}
            {/* </fieldset> */}
          </main>
        </div>
        <div className='form__footer form__footer_type_auth'>
          <p className='form__question'> Уже зарегистрированы? </p>
          <Link className='form__login-link' to='signin'>
            {" "}
            Войти{" "}
          </Link>
        </div>
      </form>
    </>
  );
};
