import { Resource } from '@rest-hooks/rest';
import * as uuid from 'uuid';

import AccessType from './types/AccessType';
import AppSection from './types/AppSection';

export class AccessRight extends Resource {
  id: string = uuid.v4();
  appSection: AppSection = AppSection.APARTMENTS;
  accessType: AccessType = AccessType.READ;

  pk() {
    return this.id;
  }
}
