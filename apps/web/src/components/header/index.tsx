import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import { Link as NavLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '../../assets/images/logo60.png';
import Logo2 from '../../assets/images/logo260.png';

const Header = () => {
  const location = useLocation();
  const [isCV, setIsCV] = useState(false);
  let Link: typeof NavLink | typeof ScrollLink =
    location.pathname === '/cv' ? NavLink : ScrollLink;

  useEffect(() => {
    if (location.pathname === '/cv') {
      setIsCV(true);
      Link = NavLink;
    } else {
      Link = ScrollLink;
    }
  }, [location.pathname]);

  return (
    <Sticky
      top={0}
      innerZ={9999}
      activeClass="navbar_fixed"
      className={isCV ? 'navbar_fixed' : ''}
    >
      <nav className={`navbar navbar-expand-lg navbar-light`}>
        <div className={`container`}>
          <a className="navbar-brand logo_h" href="./">
            <img src={Logo} alt="" />
            <img src={Logo2} alt="" />
          </a>
          <a href="./" className="btn d-lg-none d-md-block header_theme_btn">
            CV
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div
            className="collapse navbar-collapse offset"
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav m-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to={isCV ? '/#banner' : 'banner'}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to={isCV ? '/#service' : 'service'}
                  spy={true}
                  smooth={true}
                  offset={-86}
                  duration={500}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to={isCV ? '/#portfolio' : 'portfolio'}
                  spy={true}
                  smooth={true}
                  offset={-86}
                  duration={500}
                >
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to={isCV ? '/#certifications' : 'certifications'}
                  spy={true}
                  smooth={true}
                  offset={-86}
                  duration={500}
                >
                  Certifications
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to={isCV ? '/#blog' : 'blog'}
                  spy={true}
                  smooth={true}
                  offset={-86}
                  duration={500}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClass="active"
                  to={isCV ? '/#contact' : 'contact'}
                  spy={true}
                  smooth={true}
                  offset={-86}
                  duration={500}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right d-lg-block">
              <li className="nav-item">
                <NavLink to={'/cv'} className={'header_theme_btn'}>
                  CV
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Sticky>
  );
};

export default Header;
