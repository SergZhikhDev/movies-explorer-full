import React from "react";
import "./AboutProject.css";

export const AboutProject = () => {
  return (
    <section className='project-description sp' id='about-project'>
      <h2 className='project-description__title section-title section-title_about-project'>
        О проекте
      </h2>
      <hr className='line'></hr>
      <article className='table'>
        <div className='table__column table__column-stages'>
          <p className='table__subtitle'>Дипломный проект включал 5 этапов</p>
          <p className='table__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='table__column table__column_time'>
          <p className='table__subtitle'>На выполнение диплома ушло 5 недель</p>
          <p className='table__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </article>

      <article className='graph'>
        <div className='graph__column graph__column_back-end'>
          <p className='graph__time graph__time_back'>1 неделя</p>
          <p className='graph__description'>Back-end</p>
        </div>
        <div className='graph__column graph__column_front-end'>
          <p className='graph__time graph__time_front'>4 недели</p>
          <p className='graph__description'>Front-end</p>
        </div>
      </article>
    </section>
  );
};
