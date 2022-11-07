import Header from './header.ui';
import { Link as NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll/modules';

const HeaderContainer = () => {
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

  return <Header isCV={isCV} Link={Link} />;
};

export default HeaderContainer;
