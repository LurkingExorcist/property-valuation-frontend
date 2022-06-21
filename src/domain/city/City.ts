import { Resource } from '@rest-hooks/rest';
import * as uuid from 'uuid';

export class City extends Resource {
  id: string = uuid.v4();
  name = '';
  region = '';

  pk() {
    return this.id;
  }
}
