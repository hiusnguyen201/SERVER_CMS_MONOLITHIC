import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDITokens } from '@core/di/role/RoleDITokens';
import { RoleDto } from '@infrastructure/dto/role/RoleDto';
import { CoreApiResponse } from '@core/api/CoreApiResponse';
import { GetRoleAdapter } from '@infrastructure/adapter/role/GetRoleAdapter';
import { GetRoleListAdapter } from '@infrastructure/adapter/role/GetRoleListAdapter';
import { CreateRoleAdapter } from '@infrastructure/adapter/role/CreateRoleAdapter';
import { UpdateRoleInfoAdapter } from '@infrastructure/adapter/role/UpdateRoleInfoAdapter';
import { RemoveRoleAdapter } from '@infrastructure/adapter/role/RemoveRoleAdapter';
import { ApiModelCreateRoleBody } from '@app/api/controller/documentation/role/ApiModelCreateRoleBody';
import { ApiModelResponseRole } from '@app/api/controller/documentation/role/ApiModelResponseRole';
import { ApiModelResponseRoleList } from '@app/api/controller/documentation/role/ApiModelResponseRoleList';
import { ApiModelGetRoleListQuery } from '@app/api/controller/documentation/role/ApiModelGetRoleListQuery';
import { ApiModelUpdateRoleInfoBody } from '@app/api/controller/documentation/role/ApiModelUpdateRoleInfoBody';
import { RoleListDto } from '@infrastructure/dto/role/RoleListDto';
import { RoleService } from '@infrastructure/service/RoleService';

@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(
    @Inject(RoleDITokens.RoleService)
    private readonly roleService: RoleService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ApiModelCreateRoleBody })
  @ApiResponse({ status: HttpStatus.CREATED, type: ApiModelResponseRole })
  async createRole(@Body() body: ApiModelCreateRoleBody): Promise<CoreApiResponse<RoleDto>> {
    const adapter: CreateRoleAdapter = await CreateRoleAdapter.new({
      name: body.name,
      description: body?.description,
      status: body.status,
    });

    const role: RoleDto = await this.roleService.createRole(adapter);

    return CoreApiResponse.success(role);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseRoleList })
  async getRoleList(@Query() query: ApiModelGetRoleListQuery): Promise<CoreApiResponse<RoleListDto>> {
    const adapter: GetRoleListAdapter = await GetRoleListAdapter.new({
      limit: query.limit,
      page: query.page,
      keyword: query?.keyword,
      sortBy: query?.sortBy,
      sortOrder: query?.sortOrder,
    });

    const data: RoleListDto = await this.roleService.getRoleList(adapter);

    return CoreApiResponse.success(data);
  }

  @Get('/:roleId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseRole })
  async getRole(@Param('roleId') roleId: string): Promise<CoreApiResponse<RoleDto>> {
    const adapter: GetRoleAdapter = await GetRoleAdapter.new({
      roleId: roleId,
    });

    const role: RoleDto = await this.roleService.getRole(adapter);

    return CoreApiResponse.success(role);
  }

  @Put('/:roleId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseRole })
  async updateRoleInfo(
    @Param('roleId') roleId: string,
    @Body() body: ApiModelUpdateRoleInfoBody,
  ): Promise<CoreApiResponse<RoleDto>> {
    const adapter: UpdateRoleInfoAdapter = await UpdateRoleInfoAdapter.new({
      roleId: roleId,
      name: body.name,
      description: body?.description,
      status: body.status,
    });

    const updatedRole: RoleDto = await this.roleService.updateRoleInfo(adapter);

    return CoreApiResponse.success(updatedRole);
  }

  @Delete('/:roleId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseRole })
  async removeRole(@Param('roleId') roleId: string): Promise<CoreApiResponse<RoleDto>> {
    const adapter: RemoveRoleAdapter = await RemoveRoleAdapter.new({
      roleId: roleId,
    });

    const role: RoleDto = await this.roleService.removeRole(adapter);

    return CoreApiResponse.success(role);
  }
}
