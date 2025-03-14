import { genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ILike, In } from 'typeorm';
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/code/Code';
import { User } from '@infrastructure/persistence/entity/User';
import { GetUserPort } from '@infrastructure/port/user/GetUserPort';
import { UserDto } from '@infrastructure/dto/user/UserDto';
import { GetUserListPort } from '@infrastructure/port/user/GetUserListPort';
import { CreateUserPort } from '@infrastructure/port/user/CreateUserPort';
import { UpdateUserInfoPort } from '@infrastructure/port/user/UpdateUserInfoPort';
import { CoreAssert } from '@core/util/assert/CoreAssert';
import { USER_TYPE } from '@core/constant/user/UserConstant';
import { RemoveUserPort } from '@infrastructure/port/user/RemoveUserPort';
import { UserListDto } from '@infrastructure/dto/user/UserListDto';
import { UpdateUserRolesPort } from '@infrastructure/port/user/UpdateUserRolesPort';
import { RoleRepository } from '@infrastructure/persistence/repository/RoleRepository';
import { UserRepository } from '@infrastructure/persistence/repository/UserRepository';
import { GetUserRolesPort } from '@infrastructure/port/user/GetUserRolesPort';
import { RoleDto } from '@infrastructure/dto/role/RoleDto';
import { RoleListDto } from '@infrastructure/dto/role/RoleListDto';
import { Role } from '@infrastructure/persistence/entity/Role';
import { ROLE_STATUS } from '@core/constant/role/RoleConstant';

@Injectable()
export class UserService {
  private readonly RANDOM_PASSWORD_LENGTH = 12;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async createUser(payload: CreateUserPort): Promise<UserDto> {
    CoreAssert.isFalse(
      await this.userRepository.exists({ where: { email: payload.email } }),
      Exception.new({ code: Code.ENTITY_ALREADY_EXISTS_ERROR, overrideMessage: 'Email already exists' }),
    );

    const password = randomBytes(this.RANDOM_PASSWORD_LENGTH).toString('hex');
    const salt: string = await genSalt();
    const passwordHash = await hash(password, salt);
    const user = this.userRepository.create({
      ...payload,
      type: USER_TYPE.USER,
      password: passwordHash,
    });

    await this.userRepository.save(user);

    // Send password to user's email

    return UserDto.newFromUser(user);
  }

  async getUser(payload: GetUserPort): Promise<UserDto> {
    const user: User = await this.userRepository.findOneOrThrow({ where: { id: payload.userId } });
    return UserDto.newFromUser(user);
  }

  async getUserList(payload: GetUserListPort): Promise<UserListDto> {
    const filters: FindOptionsWhere<User>[] = [
      { name: ILike(`%${payload.keyword}%`) },
      { email: ILike(`%${payload.keyword}%`) },
      { phone: ILike(`%${payload.keyword}%`) },
    ];

    const [users, totalCount]: [User[], number] = await this.userRepository.findAndCount({
      where: filters,
      skip: (payload.page - 1) * payload.limit,
      take: payload.limit,
      order: { [payload.sortBy as string]: payload.sortOrder },
    });

    return { totalCount, list: UserDto.newListFromUsers(users) };
  }

  async updateUserInfo(payload: UpdateUserInfoPort): Promise<UserDto> {
    const user: User = await this.userRepository.findOneOrThrow({ where: { id: payload.userId } });

    Object.assign(user, payload);

    await this.userRepository.save(user);

    return UserDto.newFromUser(user);
  }

  async updateUserRoles(payload: UpdateUserRolesPort): Promise<UserDto> {
    const user: User = await this.userRepository.findOneOrThrow({ where: { id: payload.userId } });

    const roles = await this.roleRepository.find({
      where: { id: In(payload.roleIds), status: ROLE_STATUS.ACTIVE },
    });

    user.roles = roles;
    await this.userRepository.save(user);

    return UserDto.newFromUser(user);
  }

  async getUserRoles(payload: GetUserRolesPort): Promise<RoleListDto> {
    await this.userRepository.findOneOrThrow({ where: { id: payload.userId } });

    const filters: FindOptionsWhere<Role>[] = [
      { name: ILike(`%${payload.keyword}%`), users: { id: payload.userId } },
      { description: ILike(`%${payload.keyword}%`), users: { id: payload.userId } },
    ];

    const [roles, totalCount]: [Role[], number] = await this.roleRepository.findAndCount({
      where: filters,
      skip: (payload.page - 1) * payload.limit,
      take: payload.limit,
      order: { [payload.sortBy as string]: payload.sortOrder },
      relations: { users: true },
      join: {
        alias: 'role',
        innerJoin: {
          users: 'role.users',
        },
      },
    });

    return { totalCount, list: RoleDto.newListFromRoles(roles) };
  }

  async removeUser(payload: RemoveUserPort): Promise<UserDto> {
    console.log(payload);
    const user: User = await this.userRepository.findOneOrThrow({ where: { id: payload.userId } });

    await this.userRepository.softDelete(payload.userId);

    return UserDto.newFromUser(user);
  }
}
