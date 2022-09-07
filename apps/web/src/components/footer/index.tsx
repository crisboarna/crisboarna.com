import React, { ReactElement } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils/animations';
import { ICONS, socials } from '../../constants';

const Footer = () => (
  <section className={`footer-area-two`}>
    <div className="container">
      <div className="row footer-content">
        <div className="col-sm-4">
          <Reveal keyframes={fadeInUp} cascade={true} triggerOnce={true}>
            <ul className="list_style">
              {socials.map((item) => (
                <li key={item.name}>
                  <a href={item.url}>{ICONS[item.icon]}</a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="col-sm-8 text-right">
          <p>© {new Date().getFullYear()} crisboarna - All Rights Reserved</p>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
