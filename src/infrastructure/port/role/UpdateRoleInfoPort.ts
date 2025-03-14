import { ROLE_STATUS } from '@core/constant/role/RoleConstant';

export interface UpdateRoleInfoPort {
  roleId: string;
  name: string;
  description?: string;
  status: ROLE_STATUS;
}
