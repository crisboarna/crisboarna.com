import React, { useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
// @ts-ignore
import anime from 'animejs/lib/anime.es.js';
import { fadeInUp } from '../../utils/animations';
import Counter from './counter';
import { counters } from '../../constants';

const Counters = () => {
  const countUp = (el: Element, target: number) => {
    const data = { count: 0 };
    anime({
      targets: data,
      count: [0, target],
      duration: 2000,
      round: 1,
      delay: 200,
      easing: 'easeOutCubic',
      update() {
        // @ts-ignore
        el.innerText = data.count.toLocaleString();
      },
    });
  };

  const setupCounter = (el: Element) => {
    const text = el.textContent;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const target = parseInt(text!, 10);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          countUp(el, target);
          io.unobserve(entry.target);
        }
      });
    });
    io.observe(el);
  };

  useEffect(() => {
    const els = document.querySelectorAll('[data-countup]');
    els.forEach(setupCounter);
  }, []);

  return (
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
};

export default Counters;
