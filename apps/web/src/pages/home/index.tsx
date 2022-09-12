import React, { useState } from 'react';
import Header from '../../components/header';
import Banner from '../../components/banner';
import Services from '../../components/services';
import Tools from '../../components/tools';
import Portfolio from '../../components/portfolio';
import Counters from '../../components/counters';
import Certifications from '../../components/certifications';
import Blog from '../../components/blog';
import Contact from '../../components/contact';
import Footer from '../../components/footer';

const Home = () => {
  const [onReady, setOnReady] = useState(false);

  return (
    <div className={'body_wrapper'}>
      <Header />
      <Banner onReady={() => setOnReady(true)} />
      {onReady && (
        <React.Fragment>
          <Services />
          <Tools />
          <Portfolio />
          <Counters />
          <Certifications />
          <Blog />
          <Contact />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
