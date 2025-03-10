import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiModelGetEntityListQuery } from '@app/api/controller/documentation/common/ApiModelGetEntityListQuery';

export class ApiModelGetUserListQuery extends ApiModelGetEntityListQuery {
  @ApiPropertyOptional({ enum: ['name', 'email', 'createdAt'] })
  declare public sortBy: 'name' | 'email' | 'createdAt';
}
