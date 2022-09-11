import React, { VFC } from 'react';

export interface PortfolioItemProps {
  readonly title: string;
  readonly categories: string[];
  readonly image: string;
}

const PortfolioItem: VFC<PortfolioItemProps> = ({
  title,
  categories,
  image,
}) => {
  return (
    <div
      className={`col-md-3 col-sm-6 col-xs-12 grid-item ${categories.join(
        ' '
      )}`}
    >
      <div className="portfolio hover-style">
        <img src={image} alt="" />
        <div className="item-img-overlay">
          <div className="overlay-info text-center">
            <h6 className="sm-titl">{title}</h6>
            <div className="icons">
              <a href=".#">
                <i className="icon_heart_alt"></i>
              </a>
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
