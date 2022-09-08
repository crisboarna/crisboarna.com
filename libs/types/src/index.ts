import * as ApiTypes from './lib/api';

export { ApiTypes };

export declare type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};
