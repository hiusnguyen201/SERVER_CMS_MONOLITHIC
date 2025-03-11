import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/code/Code';
import { Role } from '@infrastructure/persistence/entity/Role';
import { RoleDto } from '@infrastructure/dto/role/RoleDto';
import { RoleListDto } from '@infrastructure/dto/role/RoleListDto';
import { GetRolePort } from '@infrastructure/port/role/GetRolePort';
import { GetRoleListPort } from '@infrastructure/port/role/GetRoleListPort';
import { CreateRolePort } from '@infrastructure/port/role/CreateRolePort';
import { UpdateRolePort } from '@infrastructure/port/role/UpdateRolePort';
import { RemoveRolePort } from '@infrastructure/port/role/RemoveRolePort';
import { CoreAssert } from '@core/util/assert/CoreAssert';
import { StringTransformer } from '@core/util/StringTransformer';
import { ROLE_STATUS } from '@core/constant/role/RoleConstant';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async createRole(payload: CreateRolePort): Promise<RoleDto> {
    const roleSlug = StringTransformer.makeSlug(payload.name);
    CoreAssert.isFalse(
      await this.roleRepository.exists({
        where: [{ name: payload.name }, { slug: roleSlug }],
      }),
      Exception.new({ code: Code.ENTITY_ALREADY_EXISTS_ERROR, overrideMessage: 'Role name already exists' }),
    );

    const role = this.roleRepository.create({
      ...payload,
      slug: roleSlug,
    });

    await this.roleRepository.save(role);

    return RoleDto.newFromRole(role);
  }

  async getRole(payload: GetRolePort): Promise<RoleDto> {
    const role: Role = CoreAssert.notEmpty(
      await this.roleRepository.findOne({ where: { id: payload.roleId } }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Role not found' }),
    );

    return RoleDto.newFromRole(role);
  }

  async getRoleList(payload: GetRoleListPort): Promise<RoleListDto> {
    const [roles, totalCount]: [Role[], number] = await this.roleRepository.findAndCount({
      skip: (payload.page - 1) * payload.limit,
      take: payload.limit,
      order: {
        ...(payload.sortBy && payload.sortOrder ? { [payload.sortBy]: payload.sortOrder } : {}),
      },
    });

    return { totalCount, list: RoleDto.newListFromRoles(roles) };
  }

  async updateRole(payload: UpdateRolePort): Promise<RoleDto> {
    const roleSlug = StringTransformer.makeSlug(payload.name);
    let role: Role = CoreAssert.notEmpty(
      await this.roleRepository.findOne({ where: { id: payload.roleId } }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Role not found' }),
    );

    const changes: Partial<Role> = {
      ...payload,
      slug: roleSlug,
    };

    Object.assign(role, changes);

    await this.roleRepository.save(role);

    return RoleDto.newFromRole(role);
  }

  async removeRole(payload: RemoveRolePort): Promise<RoleDto> {
    const role: Role = CoreAssert.notEmpty(
      await this.roleRepository.findOne({ where: { id: payload.roleId } }),
      Exception.new({ code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Role not found' }),
    );

    CoreAssert.isTrue(
      role.status === ROLE_STATUS.INACTIVE,
      Exception.new({ code: Code.BAD_REQUEST_ERROR, overrideMessage: 'Role must be inactive to be removed' }),
    );

    await this.roleRepository.softDelete(payload.roleId);

    return RoleDto.newFromRole(role);
  }
}
