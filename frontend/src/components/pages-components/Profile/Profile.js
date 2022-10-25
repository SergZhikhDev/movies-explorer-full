import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./Profile.css";

import { Header } from "../../nested-components/Header/Header";
import { ErrorText } from "../../nested-components/ErrorText/ErrorText";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useInputt } from "../../../hooks/useInput";
import { config } from "../../../utils/constants";

export const Profile = ({
  handleUpdateUser,
  onSignOut,
  isLoading,
  ctrlToken,
}) => {
  const { isFetchError } = useContext(CurrentUserContext);
  const [disableInput, setDisableInput] = useState(true);
  const [message, setMessage] = useState(
    " Данные не изменились, измените хотя бы одно поле."
  );
  const name = useInputt("", config.name);
  const email = useInputt("", config.email);
  const readyNmError =
    name.nameReadyForUpdate &&
    name.inputValid &&
    name.errorMessages !== "Поле name должно быть заполнено!";
  const readyEmError =
    email.emailReadyForUpdate &&
    email.inputValid &&
    email.errorMessages !== "Поле email должно быть заполнено!";

  const readyForUpdate = readyNmError || readyEmError;

  const handleUpdUser = (e) => {
    e.preventDefault();
    setDisableInput(false);
    ctrlToken();
  };

  function signOut() {
    onSignOut();
  }

  function onSubmit(e) {
    e.preventDefault();
    setMessage(null);

    handleUpdateUser(name.userName, email.userEmail);
  }

  return (
    <main
      className=' form form_type_profile sfp'
      noValidate
      onSubmit={onSubmit}
    >
      <form className='form__admin form__admin_type_profile '>
        <Header />
        <div className='form__main form__main_type_profile '>
          <div className='form__main-container'>
            <h3 className=' form__title'>{`Привет, ${name.userName}!`}</h3>
            <fieldset className=' form__input-container form__input-container_ctrl_texts'>
              <label
                className='
                form__label'
              >
                <span className='form__text'>Имя</span>
                {disableInput ? (
                  <input
                    className='form__item form__item_el_name'
                    placeholder={name.userName}
                    disabled={disableInput}
                    value=''
                    onChange={name.handleProfileChange}
                  />
                ) : (
                  <input
                    className='form__item form__item_el_name'
                    value={name.userName || ""}
                    onChange={name.handleProfileChange}
                    name='name'
                    type='text'
                    autoComplete='off'
                    placeholder={name.userName}
                    ref={name.callbackRef}
                  />
                )}
              </label>
              <hr className='form__line line line_form'></hr>

              <label className='form__label'>
                <span className='form__text'>Email</span>
                {disableInput ? (
                  <input
                    className='form__item form__item_el_email'
                    placeholder={email.userEmail}
                    disabled={disableInput}
                    value=''
                    onChange={email.handleProfileChange}
                  />
                ) : (
                  <input
                    className='form__item form__item_el_email'
                    value={email.userEmail || ""}
                    onChange={email.handleProfileChange}
                    name='email'
                    type='email'
                    autoComplete='off'
                    placeholder={email.userEmail}
                  />
                )}
              </label>
            </fieldset>
          </div>

          <fieldset className='form__handlers '>
            <span className='form__errors'>
              {!readyForUpdate &&
                (name.isDirty || email.isDirty) &&
                (name.inputValid || email.inputValid) && (
                  <ErrorText type='auth-button'>{message}</ErrorText>
                )}
              {name.errorMessages !== "Поле  должно быть заполнено!" && (
                <ErrorText type='auth-button'>{name.errorMessages}</ErrorText>
              )}
              {email.isDirty &&
                email.errorMessages !== "Поле  должно быть заполнено!" && (
                  <ErrorText type='auth-button'>
                    {email.errorMessages}
                  </ErrorText>
                )}
            </span>
            <label className='form__label form__label_el_handlers'>
              <input type='submit' className='form__item invisible' />

              {disableInput ? (
                <button
                  type='button'
                  className='form__button  form__button_el_button form__button_type_edit form__text'
                  onClick={handleUpdUser}
                >
                  Редактировать
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={!readyForUpdate || isLoading}
                  className='form__button form__button_el_button form__button_type_edit form__text'
                >
                  Сохранить
                </button>
              )}
            </label>

            {isFetchError && (
              <ErrorText type='auth-button'>Что-то пошло не так...</ErrorText>
            )}
          </fieldset>
        </div>

        <div className='form__footer form__footer_type_profile '>
          <Link
            to='/'
            className='form__button form__button_out '
            onClick={signOut}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </main>
  );
};
