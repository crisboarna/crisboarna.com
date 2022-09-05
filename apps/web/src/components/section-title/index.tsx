import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInUp } from '../../utils/animations';

export interface SectionTitleProps {
  readonly title: string;
  readonly description: string;
  readonly url?: string;
  readonly urlTitle?: string;
}

const SectionTitle: React.VFC<SectionTitleProps> = ({
  title,
  description,
  urlTitle,
  url,
}) => (
  <div className="section_title text-center mb_60">
    <Reveal keyframes={fadeInUp} triggerOnce={true}>
      <h2 className="mb_0 title_h2 t_color">{title}</h2>
    </Reveal>
    <Reveal keyframes={fadeInUp} duration={1500} triggerOnce={true}>
      <p className="title_p">{description}</p>
    </Reveal>
    <Reveal keyframes={fadeInUp} duration={1500} triggerOnce={true}>
      <a className="title_p_url read_btn" href={url}>
        {urlTitle}
      </a>
    </Reveal>
    <Reveal keyframes={fadeInLeft} duration={2000} triggerOnce={true}>
      <span className="bottom_line"></span>
    </Reveal>
  </div>
);

export default SectionTitle;
