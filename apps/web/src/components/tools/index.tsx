import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GolangLogo from '../../assets/images/tools/golang.png';
import ReactLogo from '../../assets/images/tools/react.png';
import DartLogo from '../../assets/images/tools/dart.png';
import FlutterLogo from '../../assets/images/tools/flutter.png';
import PythonLogo from '../../assets/images/tools/python.png';
import KafkaLogo from '../../assets/images/tools/kafka.png';
import KotlinLogo from '../../assets/images/tools/kotlin.png';

const Tools = () => (
  <div className="work_area dev_clients_logo_area">
    <div className="container">
      <div className="clients_intrigration">
        <a href=".#" className="c_items">
          <LazyLoadImage src={GolangLogo} alt={'Golang Logo'} effect={'blur'} />
        </a>
        <a href=".#" className="c_items">
          <LazyLoadImage src={ReactLogo} alt={'React Logo'} effect={'blur'} />
        </a>
        <a href=".#" className="c_items">
          <LazyLoadImage src={DartLogo} alt={'Dart Logo'} effect={'blur'} />
        </a>
        <a href=".#" className="c_items middle">
          <LazyLoadImage
            src={FlutterLogo}
            alt={'Flutter Logo'}
            effect={'blur'}
          />
        </a>
        <a href=".#" className="c_items">
          <LazyLoadImage src={PythonLogo} alt={'Python Logo'} effect={'blur'} />
        </a>
        <a href=".#" className="c_items">
          <LazyLoadImage src={KafkaLogo} alt={'Kafka Logo'} effect={'blur'} />
        </a>
        <a href=".#" className="c_items">
          <LazyLoadImage src={KotlinLogo} alt={'Kotlin Logo'} effect={'blur'} />
        </a>
      </div>
    </div>
  </div>
);

export default Tools;
