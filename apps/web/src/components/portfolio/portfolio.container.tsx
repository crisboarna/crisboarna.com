import Portfolio from './portfolio.ui';
import React, { useCallback, useEffect, useState } from 'react';
import Isotope from 'isotope-layout';
import ImagesLoaded from 'imagesloaded';
import PortfolioCard from './card';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { IPortfolioEntry } from './index';

const SwalModal = withReactContent(Swal);

export interface PortfolioContainerProps {
  readonly portfolio: IPortfolioEntry[];
}

const PortfolioContainer = ({ portfolio }: PortfolioContainerProps) => {
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

  const showModal = useCallback((data: IPortfolioEntry) => {
    SwalModal.fire({
      title: <h1 className={'font-weight-bold'}>{data.title}</h1>,
      showConfirmButton: false,
      showCloseButton: true,
      width: '70%',
      html: <PortfolioCard key={data.title} {...data} />,
    });
  }, []);

  return (
    <Portfolio
      portfolio={portfolio}
      showModal={showModal}
      onActive={onActive}
      onFilterChange={onFilterChange}
    />
  );
};

export default PortfolioContainer;
