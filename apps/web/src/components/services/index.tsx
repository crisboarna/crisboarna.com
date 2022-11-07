export { default } from './services.container';

export interface IService {
  readonly id: number;
  readonly iconName: string;
  readonly serviceTitle: string;
  readonly sDetails: string;
}
