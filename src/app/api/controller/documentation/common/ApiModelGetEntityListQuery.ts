import { SORT_ORDER_VALUES } from '@core/constant/common/CommonConstant';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApiModelGetEntityListQuery {
  @ApiPropertyOptional({ type: 'number' })
  public page: number;

  @ApiPropertyOptional({ type: 'number' })
  public limit: number;

  @ApiPropertyOptional({ type: 'string' })
  public keyword: string;

  @ApiPropertyOptional({ type: 'string' })
  public sortBy: string;

  @ApiPropertyOptional({ enum: SORT_ORDER_VALUES })
  public sortOrder: SORT_ORDER_VALUES;
}
