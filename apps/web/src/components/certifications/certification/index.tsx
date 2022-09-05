import React, { VFC } from 'react';

export interface Certification {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly url: string;
  readonly urlText: string;
}

export interface CertificationProps {
  readonly award: Certification;
}

const Certification: VFC<CertificationProps> = ({ award }) => (
  <div className={''} key={award.title}>
    <div className="awards_item wow fadeInUp">
      <div className="icon">
        <img src={award.image} alt="AWS Logo" />
      </div>
      <h4>{award.title}</h4>
      <p>{award.description}</p>
      <a href={award.url} className="dev_btn">
        {award.urlText}
      </a>
    </div>
  </div>
);

export default Certification;
