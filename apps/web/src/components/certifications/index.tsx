export { default } from './certfication.container';

export interface ICertification {
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly urlText: string;
  readonly image: string;
  readonly imageAlt: string;
}
