import { ApiProperty } from '@nestjs/swagger';

export class ApiModelUpdateUserRolesBody {
  @ApiProperty({ type: 'string', isArray: true })
  public roleIds: string[];
}
