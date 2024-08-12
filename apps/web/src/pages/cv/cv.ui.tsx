import React from 'react';
import Iframe from 'react-iframe';
import Header from '../../components/header';
import {CV_URL} from "../../constants";

export interface CVProps {
  readonly onDownload: () => void;
}

const CV = ({ onDownload }: CVProps) => (
  <div>
    <Header />
    <div className={'d-flex justify-content-end cv-spacing'}>
      <div className={'animated_theme_btn'} onClick={onDownload}>
        Download
      </div>
    </div>
    <Iframe
      url={`${CV_URL}/?buttons=false`}
      width={'100%'}
      frameBorder={0}
      className={'cv-container'}
    />
  </div>
);

export default CV;
