import { genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/code/Code';
import { User } from '@infrastructure/persistence/entity/User';
import { GetUserPort } from '@infrastructure/port/user/GetUserPort';
import { UserDto } from '@infrastructure/dto/UserDto';
import { GetUserListPort } from '@infrastructure/port/user/GetUserListPort';
import { CreateUserPort } from '@infrastructure/port/user/CreateUserPort';
import { UpdateUserPort } from '@infrastructure/port/user/UpdateUserPort';
import { CoreAssert } from '@core/util/assert/CoreAssert';
import { USER_TYPES } from '@core/constant/UserConstant';
import { ObjectTransformer } from '@core/util/object/ObjectTransformer';
import { RemoveUserPort } from '@infrastructure/port/user/RemoveUserPort';

@Injectable()
export class UserService {
  private readonly RANDOM_PASSWORD_LENGTH = 12;

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser(payload: CreateUserPort): Promise<UserDto> {
    const isExistEmail = !!(await this.userRepository.findOne({
      where: { email: payload.email },
      select: { id: true },
    }));
    CoreAssert.isFalse(
      isExistEmail,
      Exception.new({ code: Code.ENTITY_ALREADY_EXISTS_ERROR, overrideMessage: 'Email already exists' }),
    );

    const password = randomBytes(this.RANDOM_PASSWORD_LENGTH).toString('hex');
    const salt: string = await genSalt();
    const passwordHash = await hash(password, salt);
    const user = this.userRepository.create({
      ...payload,
      type: USER_TYPES.USER,
      password: passwordHash,
      isVerified: false,
    });

    await this.userRepository.save(user);

    // Send password to user's email

    return UserDto.newFromUser(user);
  }

  async getUser(payload: GetUserPort): Promise<UserDto> {
    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: payload.userId } }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'User not found' }),
    );

    return UserDto.newFromUser(user);
  }

  async getUserList(payload: GetUserListPort): Promise<{ totalCount: number; list: UserDto[] }> {
    const [users, totalCount]: [User[], number] = await this.userRepository.findAndCount({
      skip: payload.offset,
      take: payload.limit,
    });

    return { totalCount, list: UserDto.newListFromUsers(users) };
  }

  async updateUser(payload: UpdateUserPort): Promise<UserDto> {
    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: payload.userId } }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'User not found' }),
    );

    Object.assign(user, ObjectTransformer.removeUndefinedValues(payload));

    await this.userRepository.save(user);

    return UserDto.newFromUser(user);
  }

  async removeUser(payload: RemoveUserPort): Promise<UserDto> {
    const user: User = CoreAssert.notEmpty(
      await this.userRepository.findOne({ where: { id: payload.userId } }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'User not found' }),
    );

    await this.userRepository.softDelete(payload.userId);

    return UserDto.newFromUser(user);
  }
}
