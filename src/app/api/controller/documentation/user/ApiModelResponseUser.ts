import { ApiResponse } from '@app/api/controller/documentation/common/ApiResponse';
import { ApiModelUser } from '@app/api/controller/documentation/user/ApiModelUser';
import { ApiProperty } from '@nestjs/swagger';

export class ApiModelResponseUser extends ApiResponse {
  @ApiProperty({ type: ApiModelUser })
  declare public data: ApiModelUser;
}
