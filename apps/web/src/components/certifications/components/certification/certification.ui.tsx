import React, { VFC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ICertification } from '../../index';

const Certification: VFC<
  ICertification & { onNavigate: (url: string) => void }
> = ({ title, description, image, imageAlt, url, urlText, onNavigate }) => (
  <div key={title} onClick={() => onNavigate(url)}>
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
