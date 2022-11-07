import { ICertification } from './index';
import Certifications from './certifications.ui';

interface CertificationsProps {
  readonly certifications: ICertification[];
}

const CertificationsContainer = ({ certifications }: CertificationsProps) => {
  const onNavigate = (url: string) => {
    window.location.href = url;
  };

  return (
    <Certifications certifications={certifications} onNavigate={onNavigate} />
  );
};

export default CertificationsContainer;
