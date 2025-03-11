import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiModelUpdateUserBody {
  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiPropertyOptional({ type: 'string' })
  public phone?: string;

  @ApiPropertyOptional({ type: 'string' })
  public address?: string;
}
