import React, { useEffect, useState, VFC } from 'react';
import { Reveal } from 'react-awesome-reveal';
import ImagesLoaded from 'imagesloaded';
import BannerSvg from '../../assets/images/svg/banner.svg';
import Arrow from '../../assets/images/banner/arrow.png';
import Brackets from '../../assets/images/banner/brakets.png';
import Cpp from '../../assets/images/banner/c++.png';
import Cup from '../../assets/images/banner/cup.png';
import Man from '../../assets/images/banner/man.png';
import Ts from '../../assets/images/banner/ts.png';
import Search from '../../assets/images/banner/search.png';
import Shadow from '../../assets/images/banner/shadow.png';
import Table from '../../assets/images/banner/table.png';
import {
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
} from '../../utils/animations';
import { ICONS, socials } from '../../constants';
import Loading from '../loading';

export interface BannerProps {
  onReady: () => void;
}

const Banner: VFC<BannerProps> = ({ onReady }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const imgLoad = new ImagesLoaded('.frelencer_banner_area');
    imgLoad.on('always', () => {
      setLoaded(true);
      onReady();
    });
  }, []);

  return (
    <React.Fragment>
      {!loaded && <Loading />}
      <section
        className="frelencer_banner_area"
        id="home"
        style={{ display: loaded ? 'flex' : 'none' }}
      >
        <div className="home_bubble">
          <div className="bubble b_one"></div>
          <div className="bubble b_two"></div>
          <div className="bubble b_three"></div>
          <div className="bubble b_four"></div>
          <div className="bubble b_five"></div>
          <div className="bubble b_six"></div>
        </div>
        <Reveal
          keyframes={fadeInRight}
          triggerOnce={true}
          duration={500}
          delay={0}
          fraction={0}
          className={'s_shap'}
        >
          <img className="s_shap" src={BannerSvg} alt="" />
        </Reveal>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="frelencer_content flex">
                <Reveal keyframes={fadeInUp} triggerOnce={true} duration={500}>
                  <h2 className="t_color">
                    Hey there!
                    <br /> I'm Cristian Boarna Fullstack <span>Developer</span>
                  </h2>
                </Reveal>
                <Reveal keyframes={fadeInUp} triggerOnce={true} duration={700}>
                  <h4>
                    <span>Web, Mobile, Native & Cloud Services</span>
                  </h4>
                </Reveal>
                <Reveal
                  keyframes={fadeInUp}
                  triggerOnce={true}
                  duration={1000}
                  delay={300}
                  cascade={true}
                >
                  <ul className="list_style social_icon">
                    {socials.map((item) => (
                      <li key={item.name}>
                        <a href={item.url}>{ICONS[item.icon]}</a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                {/*<Reveal keyframes={fadeInUp} triggerOnce={true} duration={900}>*/}
                {/*  <a href="./" className="theme_btn active">*/}
                {/*    Hire me*/}
                {/*  </a>*/}
                {/*</Reveal>*/}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="frelencer_img">
                <Reveal
                  keyframes={fadeInRight}
                  triggerOnce={true}
                  duration={1200}
                >
                  <img src={Table} className={'f_img_two'} alt={'Table'} />
                </Reveal>
                <Reveal
                  keyframes={fadeInLeft}
                  triggerOnce={true}
                  duration={1400}
                >
                  <img src={Man} className={'f_img_one'} alt={'Man'} />
                </Reveal>
                <Reveal
                  keyframes={fadeInDown}
                  triggerOnce={true}
                  duration={1600}
                >
                  <img src={Cup} className={'f_img_three'} alt={'Cup'} />
                </Reveal>
                <Reveal
                  keyframes={fadeInDown}
                  triggerOnce={true}
                  duration={1600}
                >
                  <img src={Shadow} className={'f_img_four'} alt={'Shadow'} />
                </Reveal>
                <Reveal
                  keyframes={fadeInDown}
                  triggerOnce={true}
                  duration={2000}
                >
                  <div className="f_img_five">
                    <img src={Ts} alt={'Typescript'} />
                  </div>
                </Reveal>
                <div className="f_img_six">
                  <img src={Cpp} alt={'Cpp'} />
                </div>
                <div className="f_img_seven">
                  <img src={Search} alt={'Search'} />
                </div>
                <div className="f_img_eight">
                  <img src={Arrow} alt={'Arrow'} />
                </div>
                <div className="f_img_nine">
                  <img src={Brackets} alt={'Brackets'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Banner;
