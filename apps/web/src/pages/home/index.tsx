import React from 'react';
import Header from '../../components/header';
import Banner from '../../components/banner';
import Services from '../../components/services';
import Footer from '../../components/footer';

const Home = () => {
  return (
    <div className={'body_wrapper'}>
      <Header />
      <Banner />
      {/*<div id={'about'}>*/}
      {/*  About*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*  <br />*/}
      {/*</div>*/}
      <Services />
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
      <div id={'testimonial'}>
        Testimonial
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
      <div id={'blog'}>
        Blog
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
      <div id={'contact'}>
        Contact
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
      <Footer />
    </div>
  );
};

export default Home;
