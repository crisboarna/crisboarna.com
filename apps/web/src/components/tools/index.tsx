export { default } from './tools.container';

export interface ITool {
  readonly name: string;
  readonly image: string;
  readonly url: string;
}
