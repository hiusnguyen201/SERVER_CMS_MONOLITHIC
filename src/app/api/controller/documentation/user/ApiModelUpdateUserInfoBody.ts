import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiModelUpdateUserInfoBody {
  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiPropertyOptional({ type: 'string' })
  public phone?: string;

  @ApiPropertyOptional({ type: 'string' })
  public address?: string;
}
