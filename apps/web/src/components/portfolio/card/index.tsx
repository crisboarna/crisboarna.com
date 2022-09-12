import React, { VFC } from 'react';

export interface PortfolioCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly image: string;
  readonly tech: string[];
  readonly body: string;
}

const PortfolioCard: VFC<PortfolioCardProps> = ({
  subtitle,
  image,
  tech,
  body,
}) => (
  <div className={'container-fluid'}>
    <div className={'row'}>
      <div className={'col-sm-6'}>
        <img src={image} className={'portfolio-card-img'} />
      </div>
      <div className={'col-sm-6'}>
        <h3>{subtitle}</h3>
        <br />
        <p>{body}</p>
        <br />
        <br />
        <h6>Technologies</h6>
        {tech.map((entry) => (
          <div className="chip">
            <div className="chip-content">{entry}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PortfolioCard;
