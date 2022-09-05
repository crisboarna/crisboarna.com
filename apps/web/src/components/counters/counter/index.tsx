import React, { VFC } from 'react';

export interface CounterProps {
  readonly text: string;
  readonly description: string;
  readonly icon: string;
}

const Counter: VFC<CounterProps> = ({ text, description, icon }) => (
  <div className={`col-md-3 col-sm-6`}>
    <div
      className="counter_item text-center wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <i className={`icon-${icon}`}></i>
      <h3 className="t_color" data-countup>
        {text}
      </h3>
      <p>{description}</p>
    </div>
  </div>
);

export default Counter;
