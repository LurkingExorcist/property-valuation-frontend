import { yupResolver } from '@hookform/resolvers/yup';
import {
  AnyObject,
  ObjectShape,
  OptionalObjectSchema,
  TypeOfShape,
} from 'yup/lib/object';

export class DataConverter {
  static schemeToFormProps<TShape extends ObjectShape>(
    scheme: OptionalObjectSchema<TShape, AnyObject, TypeOfShape<TShape>>,
    defaultValues?: TypeOfShape<TShape>
  ) {
    return {
      resolver: yupResolver(scheme),
      defaultValues: defaultValues || scheme.getDefault(),
    };
  }
}
