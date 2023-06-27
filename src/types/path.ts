import { BrowserNativeObject, IsTuple, Primitive, TupleKeys } from './utility';

type PathImpl<K extends string | number, V> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`;

export type Path<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]>;
      }[TupleKeys<T>]
    : PathImpl<number, V>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K]>;
    }[keyof T];
