import Services from './services.ui';
import { IService } from './index';

export interface ServiceContainerProps {
  readonly services: IService[];
}

const ServicesContainer = ({ services }: ServiceContainerProps) => (
  <Services services={services} />
);

export default ServicesContainer;
