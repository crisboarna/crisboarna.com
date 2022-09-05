import React, { useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import anime from 'animejs/lib/anime.es.js';
import { fadeInUp } from '../../utils/animations';
import Counter from './counter';

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            <Counter text="200" description="Total Projects" icon="briefcase" />
            <Counter text="120" description="Happy Clients" icon="happy" />
            <Counter
              text="10"
              description="Years of Experience"
              icon="calendar"
            />
            <Counter text="5" description="Certifications" icon="trophy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Counters;
