import React from 'react';
import Certification from './certification';
import { certifications } from '../../constants';
import Background from '../../assets/images/awards/bg.png';

const Certifications = () => (
  <section className="awards_area bg_color_two sec_pad" id={'certifications'}>
    <img className="shape one" src={Background} alt="" />
    <div className="container">
      <div className="dev_tittle mb_70">
        <h2>Certifications</h2>
        <p>Leading industry awards testifying my abilities</p>
      </div>
      <div className="row">
        {certifications.map((award) => (
          <Certification award={award} />
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
