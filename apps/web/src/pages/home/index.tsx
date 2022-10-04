import React, { useEffect, useState } from 'react';
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
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const [onReady, setOnReady] = useState(false);

  useEffect(() => {
    if (location.hash && onReady) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location.hash, onReady]);

  return (
    <div>
      <Header />
      <Banner onReady={() => setOnReady(true)} />
      {onReady && (
        <React.Fragment>
          <Services />
          <Tools />
          <Certifications />
          <Counters />
          <Portfolio />
          {/*<Blog />*/}
          <Contact />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
