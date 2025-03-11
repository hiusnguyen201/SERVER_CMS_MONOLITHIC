import { ROLE_STATUS } from '@core/constant/role/RoleConstant';

export interface UpdateRolePort {
  roleId: string;
  name: string;
  description?: string;
  status: ROLE_STATUS;
}
