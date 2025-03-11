import { ROLE_STATUS } from '@core/constant/role/RoleConstant';

export interface CreateRolePort {
  name: string;
  description?: string;
  status: ROLE_STATUS;
}
