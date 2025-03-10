import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseEntityList } from '@app/api/controller/documentation/common/ApiResponseEntityList';
import { ApiModelUser } from '@app/api/controller/documentation/user/ApiModelUser';
import { ApiResponse } from '@app/api/controller/documentation/common/ApiResponse';

export class ApiModelResponseData extends ApiResponseEntityList<ApiModelUser> {
  @ApiProperty({ type: ApiModelUser, isArray: true })
  declare public list: ApiModelUser[];
}

export class ApiModelResponseUserList extends ApiResponse {
  @ApiProperty({ type: ApiModelResponseData })
  declare public data: ApiModelResponseData;
}
