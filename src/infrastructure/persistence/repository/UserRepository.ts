import { DataSource, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from '@infrastructure/persistence/entity/User';
import { Injectable } from '@nestjs/common';
import { CoreAssert } from '@core/util/assert/CoreAssert';
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/code/Code';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneOrThrow(options: FindOneOptions<User>) {
    const user: User = CoreAssert.notEmpty(
      await this.findOne(options),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'User not found' }),
    );

    return user;
  }
}
