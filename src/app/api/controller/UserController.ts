import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Response } from '@nestjs/common';
import { UserDITokens } from '@core/di/UserDITokens';
import { GetUserAdapter } from '@infrastructure/adapter/user/GetUserAdapter';
import { UserService } from '@infrastructure/service/UserService';
import { UserDto } from '@infrastructure/dto/UserDto';
import { CoreApiResponse } from '@core/api/CoreApiResponse';
import { GetUserListAdapter } from '@infrastructure/adapter/user/GetUserListAdapter';
import { CreateUserAdapter } from '@infrastructure/adapter/user/CreateUserAdapter';
import { UpdateUserAdapter } from '@infrastructure/adapter/user/UpdateUserAdapter';
import { RemoveUserAdapter } from '@infrastructure/adapter/user/RemoveUserAdapter';

@Controller('users')
export class UserController {
  constructor(@Inject(UserDITokens.UserService) private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() data: any): Promise<CoreApiResponse<UserDto>> {
    const adapter = await CreateUserAdapter.new({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });

    const user: UserDto = await this.userService.createUser(adapter);

    return CoreApiResponse.success(user);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<CoreApiResponse<UserDto>> {
    const adapter = await GetUserAdapter.new({
      userId: userId,
    });

    const user: UserDto = await this.userService.getUser(adapter);

    return CoreApiResponse.success(user);
  }

  @Get('/')
  async getUserList(@Query() query: any): Promise<CoreApiResponse<{ totalCount: number; list: UserDto[] }>> {
    const adapter = await GetUserListAdapter.new({
      keyword: query.keyword,
      limit: query.limit,
      offset: query.offset,
    });

    const data: { totalCount: number; list: UserDto[] } = await this.userService.getUserList(adapter);

    return CoreApiResponse.success(data);
  }

  @Patch('/:userId')
  async updateUser(@Param('userId') userId: string, @Body() data: any): Promise<CoreApiResponse<UserDto>> {
    const adapter = await UpdateUserAdapter.new({
      userId: userId,
      name: data.name,
      phone: data.phone,
      address: data.address,
    });

    const user: UserDto = await this.userService.updateUser(adapter);

    return CoreApiResponse.success(user);
  }

  @Delete('/:userId')
  async removeUser(@Param('userId') userId: string): Promise<CoreApiResponse<UserDto>> {
    const adapter = await RemoveUserAdapter.new({
      userId: userId,
    });

    const user: UserDto = await this.userService.removeUser(adapter);

    return CoreApiResponse.success(user);
  }
}
