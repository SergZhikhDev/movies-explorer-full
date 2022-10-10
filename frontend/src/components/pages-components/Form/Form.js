// import { useState } from "react";
import "./Form.css";
import { useInputt } from "../../../hooks/useInput";
import { config } from "../../../utils/constants";
import { ErrorText } from "../../nested-components/ErrorText/ErrorText";
import { Link } from "react-router-dom";
import Logo from "../../nested-components/Logo/Logo";

export const Form = () => {
  console.log(777);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(999);
  };

  const field = useInputt({}, config.name);

  return (
    <main className='form register sfp_type_reg hp'>
    <div className='form__header form__header_type_auth'>
    <Logo />
  </div>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='field'
        className='fieldForm'
        placeholder='поле'
        value={field.value.field || ""}
        onChange={field.handleChange}
      />
      <button type='submit' className='buttonForm'></button>
      <hr className='form__line line line_form line_form_type_auth'></hr>
      <span className='form__error' id='error-userName'>
        {field.isDirty && (
          <ErrorText type='auth'>{field.errorMessages}</ErrorText>
        )}
      </span>
      <div className='form__footer form__footer_type_auth'>
        <p className='form__question'> Уже зарегистрированы? </p>
        <Link className='form__login-link' to='signin'>
          {" "}
          Войти{" "}
        </Link>
      </div>
    </form>
    </main>
  );
};
