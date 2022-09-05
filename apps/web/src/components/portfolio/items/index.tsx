import React, { useCallback, useEffect, useState } from 'react';
import Isotope from 'isotope-layout';
import ImagesLoaded from 'imagesloaded';
import Img1 from '../../../assets/images/portofolio/1.jpg';
import Img2 from '../../../assets/images/portofolio/2.jpg';
import Img3 from '../../../assets/images/portofolio/3.jpg';
import Img4 from '../../../assets/images/portofolio/4.jpg';
import Img9 from '../../../assets/images/portofolio/9.jpg';
import Img10 from '../../../assets/images/portofolio/10.jpg';

const PortfolioItems = () => {
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
    <div>
      <ul className="list_style portfolio_menu text-center">
        <li
          className={onActive('*')}
          data-wow-delay="0.1s"
          data-filter="*"
          onClick={() => onFilterChange('*')}
        >
          ALL
        </li>
        <li
          className={onActive('web')}
          data-wow-delay="0.3s"
          data-filter="web"
          onClick={() => onFilterChange('web')}
        >
          Web Design
        </li>
        <li
          className={onActive(`develop`)}
          data-wow-delay="0.6s"
          data-filter="develop"
          onClick={() => onFilterChange('develop')}
        >
          Development
        </li>
        <li
          className={onActive(`market`)}
          data-wow-delay="0.8s"
          data-filter="market"
          onClick={() => onFilterChange('market')}
        >
          Marketing
        </li>
      </ul>

      <div className="grid row">
        <div className="col-md-3 col-sm-6 col-xs-12 grid-item tech develop">
          <div className="portfolio hover-style">
            <img src={Img1} alt="" />
            <div className="item-img-overlay">
              <div className="overlay-info text-center">
                <h6 className="sm-titl">WEB DESIGN</h6>
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
        <div className="col-md-3 col-sm-6 col-xs-12 grid-item market web develop">
          <div className="portfolio hover-style">
            <img src={Img2} alt="" />
            <div className="item-img-overlay">
              <div className="overlay-info text-center">
                <h6 className="sm-titl">WEB DESIGN</h6>
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
        <div className="col-md-6 col-sm-6 col-xs-12 grid-item market develop">
          <div className="portfolio hover-style">
            <img src={Img9} alt="" />
            <div className="item-img-overlay">
              <div className="overlay-info text-center">
                <h6 className="sm-titl">WEB DESIGN</h6>
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
        <div className="col-md-6 col-sm-6 col-xs-12 grid-item web">
          <div className="portfolio hover-style">
            <img src={Img10} alt="" />
            <div className="item-img-overlay">
              <div className="overlay-info text-center">
                <h6 className="sm-titl">WEB DESIGN</h6>
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
        <div className="col-md-3 col-sm-6 col-xs-12 grid-item market web">
          <div className="portfolio hover-style">
            <img src={Img3} alt="" />
            <div className="item-img-overlay">
              <div className="overlay-info text-center">
                <h6 className="sm-titl">WEB DESIGN</h6>
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
        <div className="col-md-3 col-sm-6 col-xs-12 grid-item develop">
          <div className="portfolio hover-style">
            <img src={Img4} alt="" />
            <div className="item-img-overlay">
              <div className="overlay-info text-center">
                <h6 className="sm-titl">WEB DESIGN</h6>
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
      </div>
    </div>
  );
};

export default PortfolioItems;
