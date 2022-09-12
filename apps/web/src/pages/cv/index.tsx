import React from 'react';
import Iframe from 'react-iframe';
import Header from '../../components/header';

const CV = () => (
  <div>
    <Header />
    <Iframe
      url={'https://cv.crisboarna.com/?buttons=false'}
      width={'100%'}
      frameBorder={0}
      className={'cv-spacing'}
    />
  </div>
);

export default CV;
