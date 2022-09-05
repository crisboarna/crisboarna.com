import React from 'react';
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
          <img src={GolangLogo} alt="Golang Logo" />
        </a>
        <a href=".#" className="c_items">
          <img src={ReactLogo} alt="React Logo" />
        </a>
        <a href=".#" className="c_items">
          <img src={DartLogo} alt="Dart Logo" />
        </a>
        <a href=".#" className="c_items middle">
          <img src={FlutterLogo} alt="Flutter Logo" />
        </a>
        <a href=".#" className="c_items">
          <img src={PythonLogo} alt="Python Logo" />
        </a>
        <a href=".#" className="c_items">
          <img src={KafkaLogo} alt="Kafka Logo" />
        </a>
        <a href=".#" className="c_items">
          <img src={KotlinLogo} alt="Kotlin Logo" />
        </a>
      </div>
    </div>
  </div>
);

export default Tools;
