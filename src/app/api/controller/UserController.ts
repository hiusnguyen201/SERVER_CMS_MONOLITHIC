import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { UserDITokens } from '@core/di/user/UserDITokens';
import { GetUserAdapter } from '@infrastructure/adapter/user/GetUserAdapter';
import { UserService } from '@infrastructure/service/UserService';
import { UserDto } from '@infrastructure/dto/user/UserDto';
import { CoreApiResponse } from '@core/api/CoreApiResponse';
import { GetUserListAdapter } from '@infrastructure/adapter/user/GetUserListAdapter';
import { CreateUserAdapter } from '@infrastructure/adapter/user/CreateUserAdapter';
import { UpdateUserInfoAdapter } from '@infrastructure/adapter/user/UpdateUserInfoAdapter';
import { RemoveUserAdapter } from '@infrastructure/adapter/user/RemoveUserAdapter';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiModelCreateUserBody } from '@app/api/controller/documentation/user/ApiModelCreateUserBody';
import { ApiModelResponseUser } from '@app/api/controller/documentation/user/ApiModelResponseUser';
import { ApiModelResponseUserList } from '@app/api/controller/documentation/user/ApiModelResponseUserList';
import { ApiModelGetUserListQuery } from '@app/api/controller/documentation/user/ApiModelGetUserListQuery';
import { ApiModelUpdateUserInfoBody } from '@app/api/controller/documentation/user/ApiModelUpdateUserInfoBody';
import { ApiModelUpdateUserRolesBody } from '@app/api/controller/documentation/user/ApiModelUpdateUserRolesBody';
import { UserListDto } from '@infrastructure/dto/user/UserListDto';
import { UpdateUserRolesAdapter } from '@infrastructure/adapter/user/UpdateUserRolesAdapter';
import { GetUserRolesAdapter } from '@infrastructure/adapter/user/GetUserRolesAdapter';
import { RoleDto } from '@infrastructure/dto/role/RoleDto';
import { ApiModelGetRoleListQuery } from './documentation/role/ApiModelGetRoleListQuery';
import { RoleListDto } from '@infrastructure/dto/role/RoleListDto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(UserDITokens.UserService)
    private readonly userService: UserService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ApiModelCreateUserBody })
  @ApiResponse({ status: HttpStatus.CREATED, type: ApiModelResponseUser })
  async createUser(@Body() body: ApiModelCreateUserBody): Promise<CoreApiResponse<UserDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      name: body.name,
      email: body.email,
      phone: body?.phone,
      address: body?.address,
    });

    const user: UserDto = await this.userService.createUser(adapter);

    return CoreApiResponse.success(user);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseUserList })
  async getUserList(@Query() query: ApiModelGetUserListQuery): Promise<CoreApiResponse<UserListDto>> {
    const adapter: GetUserListAdapter = await GetUserListAdapter.new({
      limit: query.limit,
      page: query.page,
      keyword: query?.keyword,
      sortBy: query?.sortBy,
      sortOrder: query?.sortOrder,
    });

    const data: UserListDto = await this.userService.getUserList(adapter);

    return CoreApiResponse.success(data);
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseUser })
  async getUser(@Param('userId') userId: string): Promise<CoreApiResponse<UserDto>> {
    const adapter: GetUserAdapter = await GetUserAdapter.new({
      userId: userId,
    });

    const user: UserDto = await this.userService.getUser(adapter);

    return CoreApiResponse.success(user);
  }

  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseUser })
  async updateUserInfo(
    @Param('userId') userId: string,
    @Body() body: ApiModelUpdateUserInfoBody,
  ): Promise<CoreApiResponse<UserDto>> {
    const adapter: UpdateUserInfoAdapter = await UpdateUserInfoAdapter.new({
      userId: userId,
      name: body.name,
      phone: body?.phone,
      address: body?.address,
    });

    const updatedUser: UserDto = await this.userService.updateUserInfo(adapter);

    return CoreApiResponse.success(updatedUser);
  }

  @Put('/:userId/roles')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseUser })
  async updateUserRoles(
    @Param('userId') userId: string,
    @Body() body: ApiModelUpdateUserRolesBody,
  ): Promise<CoreApiResponse<UserDto>> {
    const adapter: UpdateUserRolesAdapter = await UpdateUserRolesAdapter.new({
      userId: userId,
      roleIds: body.roleIds,
    });

    const updatedUser: UserDto = await this.userService.updateUserRoles(adapter);

    return CoreApiResponse.success(updatedUser);
  }

  @Get('/:userId/roles')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseUser })
  async getUserRoles(
    @Param('userId') userId: string,
    @Query() query: ApiModelGetRoleListQuery,
  ): Promise<CoreApiResponse<RoleListDto>> {
    const adapter: GetUserRolesAdapter = await GetUserRolesAdapter.new({
      userId: userId,
      limit: query.limit,
      page: query.page,
      keyword: query?.keyword,
      sortBy: query?.sortBy,
      sortOrder: query?.sortOrder,
    });

    const data: RoleListDto = await this.userService.getUserRoles(adapter);

    return CoreApiResponse.success(data);
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelResponseUser })
  async removeUser(@Param('userId') userId: string): Promise<CoreApiResponse<UserDto>> {
    const adapter: RemoveUserAdapter = await RemoveUserAdapter.new({
      userId: userId,
    });

    const user: UserDto = await this.userService.removeUser(adapter);

    return CoreApiResponse.success(user);
  }
}
