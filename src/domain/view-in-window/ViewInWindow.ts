import { Resource } from '@rest-hooks/rest';
import * as uuid from 'uuid';

export class ViewInWindow extends Resource {
  id: string = uuid.v4();
  name = '';
  description = '';

  pk() {
    return this.id;
  }
}
