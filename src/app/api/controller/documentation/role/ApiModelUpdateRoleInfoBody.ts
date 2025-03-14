import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiModelUpdateRoleInfoBody {
  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiPropertyOptional({ type: 'string' })
  public description?: string;

  @ApiProperty({ type: 'string', enum: ROLE_STATUS })
  public status: ROLE_STATUS;
}
