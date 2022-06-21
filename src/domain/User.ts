import { Resource, schema } from '@rest-hooks/rest';
import * as uuid from 'uuid';

import { AccessRight } from './AccessRight';

export class User extends Resource {
  id: string = uuid.v4();
  username = '';
  email = '';
  phoneNumber = '';
  accessRights: AccessRight[] = [];

  static schema = new schema.Object({
    accessRights: new schema.Array(AccessRight),
  });

  pk() {
    return this.id;
  }
}
