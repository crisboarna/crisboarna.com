import React, { VFC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface PortfolioItemProps {
  readonly title: string;
  readonly categories: string[];
  readonly image: string;
  readonly imageAlt: string;
}

const PortfolioItem: VFC<PortfolioItemProps> = ({
  title,
  categories,
  image,
  imageAlt,
}) => {
  return (
    <div
      className={`col-md-3 col-sm-6 col-xs-12 grid-item ${categories.join(
        ' '
      )}`}
    >
      <div className="portfolio hover-style">
        <LazyLoadImage src={image} alt={imageAlt} effect={'blur'} />
        <div className="item-img-overlay">
          <div className="overlay-info text-center">
            <h6 className="sm-titl">{title}</h6>
            <div className="icons">
              <a href=".#">
                <i className="icon-magnifying-glass"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
