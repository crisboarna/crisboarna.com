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
      <div className={'col-sm-6 pt-3 pb-3'}>
        <img src={image} className={'portfolio_card_img'} />
      </div>
      <div className={'col-sm-6'}>
        <h3 className={'pb-3 pt-1 font-weight-bold'}>{subtitle}</h3>
        <p className={'pb-4 font-weight-normal'}>{body}</p>
        <h6 className={'font-weight-bold'}>Technologies</h6>
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
