import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInDown } from '../../utils/animations';
import SectionTitle from '../section-title';
import { services } from '../../constants';

const Services = () => (
  <section className={`work_area`} id="service">
    <div className="container">
      <SectionTitle
        title={'About Me'}
        description={
          'I love and am passionate of my craft. I take great pride in what I do.'
        }
      />
      <Reveal
        keyframes={fadeInDown}
        cascade={true}
        duration={1000}
        triggerOnce={true}
      >
        <div className="row">
          {services.map((item) => {
            return (
              <div className="col-lg-4 col-sm-6" key={item.id}>
                <div className="work_item wow fadeInUp" data-wow-delay="0.1s">
                  <i className={item.iconName}></i>
                  <a href=".#">
                    <h2 className="t_color">{item.serviceTitle}</h2>
                  </a>
                  <p>{item.sDetails}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Services;
