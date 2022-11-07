import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils/animations';
import Counter from './components/counter/counter.ui';
import { CountersContainerProps } from './counters.container';

const Counters = ({ counters }: CountersContainerProps) => (
  <section className={`project_count_area`}>
    <div className="container">
      <Reveal keyframes={fadeInUp} triggerOnce={true}>
        <div className="row">
          {counters.map((counter) => (
            <Counter key={counter.description} {...counter} />
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Counters;
