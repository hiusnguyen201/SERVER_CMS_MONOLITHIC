import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiModelCreateUserBody {
  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiPropertyOptional({ type: 'string' })
  public phone?: string;

  @ApiPropertyOptional({ type: 'string' })
  public address?: string;
}
