import Footer from './footer.ui';
import { ISocial } from './index';

export interface FooterContainerProps {
  readonly socials: ISocial[];
}

const FooterContainer = ({ socials }: FooterContainerProps) => (
  <Footer socials={socials} />
);

export default FooterContainer;
