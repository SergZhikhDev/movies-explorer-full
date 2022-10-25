import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../../nested-components/Logo/Logo";
import { ErrorText } from "../../nested-components/ErrorText/ErrorText";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { config } from "../../../utils/constants";

import { useInputt } from "../../../hooks/useInput";

function Login(props) {
  const { isFetchError } = useContext(CurrentUserContext);
  const email = useInputt("", config.email);
  const password = useInputt("", config.password);

  const onSubmit = (e) => {
    e.preventDefault(e);
    props.handleLogin(email.value.field, password.value.field);
  };

  return (
    <main className='form login sfp_type_reg'>
      <div className='form__header form__header_type_auth '>
        <Logo />
      </div>

      <div className='form__container form__container_type_auth'>
        <form
          className='form__admin form__admin_type_auth '
          onSubmit={onSubmit}
        >
          <h3 className='form__heading form__heading_type_auth'>
            Рады видеть!
          </h3>
          <fieldset className='form__input-container form__input-container_type_auth_type_login '>
            <label className='form__label  form__label_type_auth'>
              <span className='form__text form__text_type_auth'>Email</span>
              <input
                className='form__item form__item_type_auth form__item_el_email form__item_el_email_type_auth'
                name='email'
                type='email'
                placeholder='Email'
                autoComplete='off'
                onBlur={email.onBlur}
                disabled={props.isLoading}
                onChange={email.handleChange}
                value={email.value.field || ""}
              />
              <hr className='form__line line line_form line_form_type_auth'></hr>
              <span className='form__error' id='error-userEmail'>
                {email.isDirty && (
                  <ErrorText type='auth'> {email.errorMessages}</ErrorText>
                )}
              </span>
            </label>
            <label className='form__label  form__label_type_auth'>
              <span className='form__text form__text_type_auth'></span>
              <input
                className='form__item form__item_type_auth form__item_el_name form__item_el_name_type_auth'
                name='password'
                type='password'
                autoComplete='off'
                placeholder='Password'
                onBlur={password.onBlur}
                disabled={props.isLoading}
                onChange={password.handleChange}
                value={password.value.field || ""}
              />
              <hr className='form__line  line  line_form  line_form_type_auth'></hr>
              <span className='form__error ' id='error-userPassword'>
                {" "}
                {password.isDirty && (
                  <ErrorText type='auth'> {password.errorMessages}</ErrorText>
                )}{" "}
              </span>
            </label>
          </fieldset>
          <fieldset className='form__handlers form__handlers_type_auth'>
            <label className='form__label form__label_el_button'>
              <input type='submit' className='form__item invisible' />
              <button
                type='submit'
                className='form__button form__button_el_button form__text'
                disabled={!email.inputValid || !password.inputValid}
              >
                Войти
              </button>
            </label>
            {isFetchError && (
              <ErrorText type='form__error '>Что-то пошло не так...</ErrorText>
            )}
          </fieldset>
        </form>
      </div>
      <div className='form__footer form__footer_type_auth'>
        <p className='form__question'>Ещё не зарегистрированы?</p>
        <Link className='form__login-link ' to='signup'>
          Регистрация
        </Link>
      </div>
    </main>
  );
}

export default Login;
