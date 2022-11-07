import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
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
import {
  certifications,
  contacts,
  counters,
  portfolio,
  services,
  socials,
  tools,
} from '../../constants';

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
      <ErrorBoundary fallbackRender={() => <Header />}>
        <Header />
        <Banner onReady={() => setOnReady(true)} />
        {onReady && (
          <React.Fragment>
            <Services services={services} />
            <Tools tools={tools} />
            <Certifications certifications={certifications} />
            <Counters counters={counters} />
            <Portfolio portfolio={portfolio} />
            {/*<Blog />*/}
            <Contact contacts={contacts} />
            <Footer socials={socials} />
          </React.Fragment>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Home;
