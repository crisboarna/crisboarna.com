import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils/animations';
import { socials } from '../../constants';

const Footer = () => (
  <section className={`footer-area-two`}>
    <div className="container">
      <div className="row footer-content">
        <div className="col-sm-4">
          <Reveal keyframes={fadeInUp} cascade={true}>
            <ul className="list_style">
              {socials.map((item) => {
                return (
                  <li key={item.name}>
                    <a href={item.url}>
                      <i className={item.className}></i>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
        <div className="col-sm-8 text-right">
          <p>© {new Date().getFullYear()} Cris Boarna - All Rights Reserved</p>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
