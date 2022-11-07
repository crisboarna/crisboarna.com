import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Background from '../../assets/images/awards/bg.png';
import { fadeInLeft } from '../../utils/animations';
import SectionTitle from '../section-title';
import { ICertification } from './index';
import Certification from './components/certification/certification.ui';

interface CertificationsUIProps {
  readonly certifications: ICertification[];
  readonly onNavigate: (url: string) => void;
}

const Certifications = ({
  certifications,
  onNavigate,
}: CertificationsUIProps) => (
  <section className="awards_area bg_color_two sec_pad" id={'certifications'}>
    <img src={Background} alt={'background'} className={'shape one'} />
    {/*<LazyLoadImage*/}
    {/*  className={'shape one'}*/}
    {/*  src={Background}*/}
    {/*  alt={'Background'}*/}
    {/*  effect={'blur'}*/}
    {/*/>*/}
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
          {certifications.map((certification) => (
            <Certification
              key={certification.title}
              onNavigate={onNavigate}
              {...certification}
            />
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default Certifications;
