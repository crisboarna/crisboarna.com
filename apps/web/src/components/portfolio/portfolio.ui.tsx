import React from 'react';
import SectionTitle from '../section-title';
import { IPortfolioEntry } from './index';

export interface PortfolioProps {
  readonly onActive: (item: string) => string;
  readonly onFilterChange: (newFilter: string) => void;
  readonly showModal: (data: IPortfolioEntry) => void;
  readonly portfolio: IPortfolioEntry[];
}

const Portfolio = ({
  portfolio,
  onActive,
  onFilterChange,
  showModal,
}: PortfolioProps) => (
  <section className={`portfolio_area`} id="portfolio">
    <div className="container">
      <SectionTitle
        title="My Portfolio"
        description="From my repertoire of projects."
      />
      <div>
        <ul className="list_style portfolio_menu text-center">
          <li
            className={onActive('*')}
            data-wow-delay="0.1s"
            data-filter="*"
            onClick={() => onFilterChange('*')}
          >
            All
          </li>
          <li
            className={onActive('web')}
            data-wow-delay="0.3s"
            data-filter="web"
            onClick={() => onFilterChange('web')}
          >
            Web
          </li>
          <li
            className={onActive(`typescript`)}
            data-wow-delay="0.6s"
            data-filter="typescript"
            onClick={() => onFilterChange('typescript')}
          >
            Typescript
          </li>
          <li
            className={onActive(`go`)}
            data-wow-delay="0.6s"
            data-filter=".go"
            onClick={() => onFilterChange('go')}
          >
            Go
          </li>
          <li
            className={onActive(`cpp`)}
            data-wow-delay="0.6s"
            data-filter=".cpp"
            onClick={() => onFilterChange('cpp')}
          >
            C++
          </li>
          <li
            className={onActive(`mobile`)}
            data-wow-delay="0.6s"
            data-filter="mobile"
            onClick={() => onFilterChange('mobile')}
          >
            Mobile
          </li>
          <li
            className={onActive(`oss`)}
            data-wow-delay="0.8s"
            data-filter="oss"
            onClick={() => onFilterChange('oss')}
          >
            Open Source
          </li>
        </ul>

        <div className="grid row">
          {portfolio.map((item) => (
            <div
              key={item.title}
              className={`col-md-3 col-sm-6 col-xs-12 grid-item ${item.categories.join(
                ' '
              )}`}
            >
              <div className="portfolio hover-style">
                <div className={'img-test'}>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className={'portfolio-card-root-img'}
                  />
                </div>
                <div
                  className="item-img-overlay"
                  onClick={() => showModal(item)}
                >
                  <div className="overlay-info text-center">
                    <h6 className="sm-titl">{item.title}</h6>
                    <div className="icons">
                      <a>
                        <i className="icon-magnifying-glass"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;
