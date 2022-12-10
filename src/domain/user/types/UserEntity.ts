import { AccessRight } from '@/domain/access-right';

export type UserEntity = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  accessRights: AccessRight[];
};
