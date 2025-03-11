import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiModelGetEntityListQuery } from '@app/api/controller/documentation/common/ApiModelGetEntityListQuery';
import { ROLE_SORT_BY_VALUES } from '@core/constant/role/RoleConstant';

export class ApiModelGetRoleListQuery extends ApiModelGetEntityListQuery {
  @ApiPropertyOptional({ enum: ROLE_SORT_BY_VALUES })
  declare public sortBy: ROLE_SORT_BY_VALUES;
}
