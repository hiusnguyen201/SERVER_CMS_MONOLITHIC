import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse {
  @ApiProperty({ type: 'number' })
  public statusCode: number;

  @ApiProperty({ type: 'string' })
  public message: string;

  @ApiProperty({ type: 'number' })
  public timestamp: number;

  @ApiProperty()
  public data: unknown;
}
