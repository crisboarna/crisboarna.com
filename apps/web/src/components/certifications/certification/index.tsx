import React, { VFC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface CertificationProps {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly url: string;
  readonly urlText: string;
}

const Certification: VFC<CertificationProps> = ({
  title,
  description,
  image,
  imageAlt,
  url,
  urlText,
}) => (
  <div className={''} key={title}>
    <div className="awards_item wow fadeInUp">
      <div className="icon">
        <LazyLoadImage src={image} alt={imageAlt} effect={'blur'} />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      <a href={url} className="dev_btn">
        {urlText}
      </a>
    </div>
  </div>
);

export default Certification;
