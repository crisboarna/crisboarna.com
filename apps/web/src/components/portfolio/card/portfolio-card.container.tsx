import PortfolioCard from './portfolio-card.ui';

export interface PortfolioCardContainerProps {
  readonly subtitle: string;
  readonly image: string;
  readonly tech: string[];
  readonly body: string;
}

const PortfolioCardContainer = ({
  subtitle,
  image,
  tech,
  body,
}: PortfolioCardContainerProps) => (
  <PortfolioCard subtitle={subtitle} image={image} tech={tech} body={body} />
);

export default PortfolioCardContainer;
