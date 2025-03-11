import { ApiResponse } from '@app/api/controller/documentation/common/ApiResponse';
import { ApiModelRole } from '@app/api/controller/documentation/role/ApiModelRole';
import { ApiProperty } from '@nestjs/swagger';

export class ApiModelResponseRole extends ApiResponse {
  @ApiProperty({ type: ApiModelRole })
  declare public data: ApiModelRole;
}
