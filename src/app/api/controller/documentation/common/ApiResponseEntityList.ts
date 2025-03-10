import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseEntityList<TData> {
  @ApiProperty({ type: 'number' })
  public totalCount: number;

  @ApiProperty({ type: 'array' })
  public list: TData[];
}
