import { AccessLevel } from './AccessLevel';
import { DomainEntityType } from './DomainEntityType';

export type AccessRight = {
  id: string;
  domainEntity: DomainEntityType;
  accessLevel: AccessLevel;
};
