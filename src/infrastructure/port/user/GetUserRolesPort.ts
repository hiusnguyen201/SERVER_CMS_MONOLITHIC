import { GetEntityListPort } from '@infrastructure/port/common/GetEntityListPort';

export interface GetUserRolesPort extends GetEntityListPort {
  userId: string;
}
