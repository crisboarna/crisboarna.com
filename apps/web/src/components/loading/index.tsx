import React, { VFC } from 'react';
// import Lottie from "lottie-react";
import Lottie from 'react-lottie-player'
import * as animationData from '../../assets/images/lottie/wave-motion.json';

export interface LoadingProps {
  readonly style?: any;
}

const Loading: VFC<LoadingProps> = ({ style }) => (
  <div className={'centered'} style={style}>
    <Lottie
        loop={true}
        play={true}
        animationData={animationData}
        style={{ width: 400, height: 400 }}
    />
  </div>
);

export default Loading;
