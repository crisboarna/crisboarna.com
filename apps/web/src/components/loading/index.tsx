import React, { VFC } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../assets/images/lottie/wave-motion.json';

export interface LoadingProps {
  readonly style?: any;
}

const Loading: VFC<LoadingProps> = ({ style }) => (
  <div className={'centered'} style={style}>
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={400}
      width={400}
    />
  </div>
);

export default Loading;
