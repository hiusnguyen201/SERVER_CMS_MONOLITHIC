import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApiModelUpdateUserBody {
  @ApiPropertyOptional({ type: 'string' })
  public name?: string;

  @ApiPropertyOptional({ type: 'string' })
  public phone?: string;

  @ApiPropertyOptional({ type: 'string' })
  public address?: string;
}
