import "./Footer.css";

function Footer() {
  return (
    <footer className='footer sp '>
      <h5 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h5>
      <hr className='line line_footer'></hr>

      <div className='footer__container'>
        <p className='footer__copyright'>©2022</p>

        <ul className='social-nets social-nets_footer'>
          <li className='social-nets__item social-nets__item_footer'>
            <a
              href='https://github.com/SergZhikhDev'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='social-nets__item social-nets__item_footer'>
            <a
              href='https://github.com/SergZhikhDev'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
          <li className='social-nets__item social-nets__item_footer'>
            <a
              href='https://github.com/SergZhikhDev'
              target='_blank'
              rel='noreferrer'
            >
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
