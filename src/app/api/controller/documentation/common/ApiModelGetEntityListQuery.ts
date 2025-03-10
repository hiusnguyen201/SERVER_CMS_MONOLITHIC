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

  @ApiPropertyOptional({ enum: ['asc', 'ASC', 'desc', 'DESC'] })
  public sortOrder: 'asc' | 'ASC' | 'desc' | 'DESC';
}
