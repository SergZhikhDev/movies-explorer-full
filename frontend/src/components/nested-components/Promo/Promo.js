import React from "react";
import "./Promo.css";
import NavTab from "../MenuNavTab/MenuNavTab";

function Promo() {
  return (
    <section className='project-poster sp' id='poster'>
      <div className='project-poster__back-image'>
        <h1 className='project-poster__title'>
          Учебный&nbsp;проект студента факультета Веб-&nbsp;разработки.
        </h1>
      </div>

      <NavTab />
    </section>
  );
}

export default Promo;
