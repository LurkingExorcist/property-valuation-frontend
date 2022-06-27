import { SelectInputProps } from '@mui/material/Select/SelectInput';
import * as _ from 'lodash';
import * as React from 'react';

export const useForm = <T extends Record<string, any>>(state: T) => {
  const [form, setForm] = React.useState(state);

  type PropPath1<K extends keyof T> = T[K];
  type PropPath2<
    K1 extends keyof T,
    K2 extends keyof PropPath1<K1>
  > = PropPath1<K1>[K2];

  const setProp =
    <
      K1 extends keyof T,
      K2 extends keyof PropPath1<K1> = never,
      K3 extends keyof PropPath2<K1, K2> = never
    >(
      path: K1 | [K1, K2] | [K1, K2, K3]
    ): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =>
    (event) => {
      setForm({ ..._.cloneDeep(_.set(form, path, event.target.value)) });
    };

  const selectProp =
    <
      K1 extends keyof T,
      K2 extends keyof PropPath1<K1> = never,
      K3 extends keyof PropPath2<K1, K2> = never
    >(
      path: K1 | [K1, K2] | [K1, K2, K3]
    ): SelectInputProps<string | undefined>['onChange'] =>
    (event) => {
      setForm({ ..._.cloneDeep(_.set(form, path, event.target.value)) });
    };

  return { form, setProp, selectProp };
};
