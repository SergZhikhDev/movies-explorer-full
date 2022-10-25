import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  function goToBack() {
    history.goBack();
  }
  return (
    <div className='page-notfound'>
      <div className='page-notfound__text'>
        <p className='page-notfound__title'>404</p>
        <p className='page-notfound__subtitle'>Страница не найдена</p>
      </div>

      <button
        className='page-notfound__back-button'
        type='button'
        onClick={goToBack}
      >
        Назад
      </button>
    </div>
  );
}
export default NotFound;
