export { default } from './contact.container';

export interface IContact {
  readonly id: number;
  readonly text: string;
  readonly target: string;
  readonly icon: string;
}
