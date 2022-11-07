export { default } from './counters.container';

export interface ICounter {
  readonly id: number;
  readonly value: number;
  readonly description: string;
  readonly icon: string;
}
