export { default } from './portfolio.container';

export interface IPortfolioEntry {
  readonly title: string;
  readonly subtitle: string;
  readonly image: string;
  readonly tech: string[];
  readonly body: string;
  readonly imageAlt: string;
  readonly categories: string[];
}
