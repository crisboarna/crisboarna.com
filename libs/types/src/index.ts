import * as ApiTypes from './lib';

export { ApiTypes };

export declare type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};
