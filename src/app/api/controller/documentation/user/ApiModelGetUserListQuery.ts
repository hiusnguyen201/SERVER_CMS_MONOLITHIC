import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiModelGetEntityListQuery } from '@app/api/controller/documentation/common/ApiModelGetEntityListQuery';
import { USER_SORT_BY_VALUES } from '@core/constant/user/UserConstant';

export class ApiModelGetUserListQuery extends ApiModelGetEntityListQuery {
  @ApiPropertyOptional({ enum: USER_SORT_BY_VALUES })
  declare public sortBy: USER_SORT_BY_VALUES;
}
