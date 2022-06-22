import { AccessRight } from '../access-right';

export type User = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  accessRights: AccessRight[];
};
