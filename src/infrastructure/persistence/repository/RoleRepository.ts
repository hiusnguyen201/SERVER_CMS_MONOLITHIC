import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Role } from '@infrastructure/persistence/entity/Role';
import { Injectable } from '@nestjs/common';
import { Code } from '@core/code/Code';
import { Exception } from '@core/exception/Exception';
import { CoreAssert } from '@core/util/assert/CoreAssert';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findOneOrThrow(options: FindOneOptions<Role>) {
    const role: Role = CoreAssert.notEmpty(
      await this.findOne(options),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Role not found' }),
    );

    return role;
  }
}
