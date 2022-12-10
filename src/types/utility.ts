export type ObjectValueOf<T extends Record<string, unknown>> = T extends Record<
  string,
  infer V
>
  ? V
  : never;

export type Falsy = 0 | false | null | undefined;

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length']
  ? false
  : true;

export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<
  keyof T,
  keyof any[]
>;

export type BrowserNativeObject = Date | FileList | File;

export type AnyObject = Record<string, unknown>;
