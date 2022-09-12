import React, { useCallback, useEffect, useState } from 'react';
import Isotope from 'isotope-layout';
import ImagesLoaded from 'imagesloaded';
import SectionTitle from '../section-title';
import PortfolioItem from './item';
import { portfolio } from '../../constants';

const Portfolio = () => {
  const [activeItem, setActiveItem] = useState('*');
  const [isotope, setIsotope] = useState<Isotope>();

  useEffect(() => {
    // @ts-ignore
    const imgLoad = new ImagesLoaded('.grid');

    imgLoad.on('progress', () =>
      setIsotope(
        new Isotope('.grid', {
          itemSelector: '.grid-item',
          layoutMode: 'masonry',
        })
      )
    );
  }, []);

  const onFilterChange = useCallback(
    (newFilter: string) => {
      setActiveItem(newFilter);
      if (isotope === undefined) {
        setIsotope(
          new Isotope('.grid', {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
          })
        );
      }

      if (newFilter === '*') {
        isotope?.arrange({ filter: `*` });
      } else {
        isotope?.arrange({ filter: `.${newFilter}` });
      }
    },
    [isotope, activeItem]
  );

  const onActive = useCallback(
    (item: string) => (item === activeItem ? 'active' : ''),
    [activeItem]
  );

  return (
    <section className={`portfolio_area`} id="portfolio">
      <div className="container">
        <SectionTitle
          title="My Portfolio"
          description="From my repertoire of completed projects."
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
              data-filter=".web"
              onClick={() => onFilterChange('web')}
            >
              Web
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
              data-filter=".mobile"
              onClick={() => onFilterChange('mobile')}
            >
              Mobile
            </li>
            <li
              className={onActive(`oss`)}
              data-wow-delay="0.8s"
              data-filter=".oss"
              onClick={() => onFilterChange('oss')}
            >
              Open Source
            </li>
          </ul>
          <div className={'grid row'}>
            {portfolio.map((item) => (
              <PortfolioItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
