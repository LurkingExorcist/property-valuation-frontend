import { AccessType, AppSection } from './types';

export type AccessRight = {
  id: string;
  appSection: AppSection;
  accessType: AccessType;
};
