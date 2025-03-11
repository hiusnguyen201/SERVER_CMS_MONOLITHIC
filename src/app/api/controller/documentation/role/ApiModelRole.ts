import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { ApiProperty } from '@nestjs/swagger';

export class ApiModelRole {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public slug: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'string', enum: ROLE_STATUS })
  public status: ROLE_STATUS;

  @ApiProperty({ type: 'string' })
  public createdAt: Date;

  @ApiProperty({ type: 'string' })
  public updatedAt: Date;
}
