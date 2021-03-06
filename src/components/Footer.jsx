import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <section
    className="footer-content"
    style={ { textAlign: 'center', marginBottom: 10 } }
  >
    Made with ❤️
    {'  '}
    <a
      className="link-github-content"
      href="https://github.com/abnerferreiradesousa"
      style={ { cursor: 'pointer' } }
    >
      Abner Sousa
    </a>
  </section>
);

export default Footer;
