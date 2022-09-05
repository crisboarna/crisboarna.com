import React from 'react';
import SectionTitle from '../section-title';
import PortfolioItems from './items';

const Portfolio = () => (
  <section className={`portfolio_area`} id="portfolio">
    <div className="container">
      <SectionTitle
        title="My Portfolio"
        description="From my repertoire of past achievements."
      />
      <PortfolioItems />
    </div>
  </section>
);

export default Portfolio;
