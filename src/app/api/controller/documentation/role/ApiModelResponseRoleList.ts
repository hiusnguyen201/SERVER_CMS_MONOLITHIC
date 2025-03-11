import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseEntityList } from '@app/api/controller/documentation/common/ApiResponseEntityList';
import { ApiModelRole } from '@app/api/controller/documentation/role/ApiModelRole';
import { ApiResponse } from '@app/api/controller/documentation/common/ApiResponse';

export class ApiModelResponseData extends ApiResponseEntityList<ApiModelRole> {
  @ApiProperty({ type: ApiModelRole, isArray: true })
  declare public list: ApiModelRole[];
}

export class ApiModelResponseRoleList extends ApiResponse {
  @ApiProperty({ type: ApiModelResponseData })
  declare public data: ApiModelResponseData;
}
