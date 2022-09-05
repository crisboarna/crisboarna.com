import React from 'react';
import Header from '../../components/header';
import Banner from '../../components/banner';
import Services from '../../components/services';
import Footer from '../../components/footer';
import Certifications from '../../components/certifications';
import Blog from '../../components/blog';
import Contact from '../../components/contact';
import Counters from '../../components/counters';
import Tools from '../../components/tools';

const Home = () => {
  return (
    <div className={'body_wrapper'}>
      <Header />
      <Banner />
      <Services />
      <Tools />
      <div id={'portfolio'}>
        Portfolio
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Counters />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
