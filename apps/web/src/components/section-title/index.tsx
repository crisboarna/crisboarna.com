import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInUp } from '../../utils/animations';

export interface SectionTitleProps {
  readonly title: string;
  readonly description: string;
}

const SectionTitle: React.VFC<SectionTitleProps> = ({ title, description }) => (
  <div className="section_title text-center mb_60">
    <Reveal keyframes={fadeInUp}>
      <h2 className="mb_0 title_h2 t_color">{title}</h2>
    </Reveal>
    <Reveal keyframes={fadeInUp} duration={1500}>
      <p className="mb_0 title_p">{description}</p>
    </Reveal>
    <Reveal keyframes={fadeInLeft} duration={2000}>
      <span className="bottom_line"></span>
    </Reveal>
  </div>
);

export default SectionTitle;
