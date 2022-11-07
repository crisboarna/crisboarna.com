import Contact from './contact.ui';
import { IContact } from './index';

export interface ContactContainerProps {
  readonly contacts: IContact[];
}

const ContactContainer = ({ contacts }: ContactContainerProps) => {
  return <Contact contacts={contacts} />;
};

export default ContactContainer;
