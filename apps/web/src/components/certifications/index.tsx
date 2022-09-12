import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Certification from './certification';
import { certifications } from '../../constants';
import Background from '../../assets/images/awards/bg.png';
import { fadeInLeft } from '../../utils/animations';
import SectionTitle from '../section-title';

const Certifications = () => (
  <section className="awards_area bg_color_two sec_pad" id={'certifications'}>
    <LazyLoadImage
      className={'shape one'}
      src={Background}
      alt={'Background'}
      effect={'blur'}
    />
    <div className="container">
      <SectionTitle
        title={'Certifications'}
        description={'Leading industry awards testifying my abilities'}
      />
      <div className="row">
        <Reveal
          keyframes={fadeInLeft}
          cascade={true}
          className={'col-lg-4 col-sm-6 pb-5'}
          duration={500}
          triggerOnce={true}
        >
          {certifications.map((award) => (
            <Certification key={award.title} {...award} />
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default Certifications;
