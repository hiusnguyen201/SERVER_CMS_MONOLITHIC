import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from '@core/exception/Exception';
import { Code } from '@core/code/Code';
import { Role } from '@infrastructure/persistence/entity/Role';
import { RoleDto } from '@infrastructure/dto/role/RoleDto';
import { RoleListDto } from '@infrastructure/dto/role/RoleListDto';
import { GetRolePort } from '@infrastructure/port/role/GetRolePort';
import { GetRoleListPort } from '@infrastructure/port/role/GetRoleListPort';
import { CreateRolePort } from '@infrastructure/port/role/CreateRolePort';
import { UpdateRoleInfoPort } from '@infrastructure/port/role/UpdateRoleInfoPort';
import { RemoveRolePort } from '@infrastructure/port/role/RemoveRolePort';
import { CoreAssert } from '@core/util/assert/CoreAssert';
import { StringTransformer } from '@core/util/StringTransformer';
import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { RoleRepository } from '@infrastructure/persistence/repository/RoleRepository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

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
    const role: Role = await this.roleRepository.findOneOrThrow({ where: { id: payload.roleId } });
    return RoleDto.newFromRole(role);
  }

  async getRoleList(payload: GetRoleListPort): Promise<RoleListDto> {
    const filters: FindOptionsWhere<Role>[] = [
      { name: ILike(`%${payload.keyword}%`) },
      { description: ILike(`%${payload.keyword}%`) },
    ];

    const [roles, totalCount]: [Role[], number] = await this.roleRepository.findAndCount({
      where: filters,
      skip: (payload.page - 1) * payload.limit,
      take: payload.limit,
      order: { [payload.sortBy as string]: payload.sortOrder },
    });

    return { totalCount, list: RoleDto.newListFromRoles(roles) };
  }

  async updateRoleInfo(payload: UpdateRoleInfoPort): Promise<RoleDto> {
    const role: Role = await this.roleRepository.findOneOrThrow({ where: { id: payload.roleId } });

    const roleSlug = StringTransformer.makeSlug(payload.name);
    CoreAssert.isFalse(
      await this.roleRepository.existsBy([
        { name: payload.name, id: Not(role.id) },
        { slug: roleSlug, id: Not(role.id) },
      ]),
      Exception.new({ code: Code.ENTITY_ALREADY_EXISTS_ERROR, overrideMessage: 'Role name already exists' }),
    );

    Object.assign(role, { ...payload, slug: roleSlug } as Partial<Role>);

    await this.roleRepository.save(role);

    return RoleDto.newFromRole(role);
  }

  async removeRole(payload: RemoveRolePort): Promise<RoleDto> {
    console.log(payload);
    const role: Role = await this.roleRepository.findOneOrThrow({ where: { id: payload.roleId } });

    CoreAssert.isTrue(
      role.status === ROLE_STATUS.INACTIVE,
      Exception.new({ code: Code.BAD_REQUEST_ERROR, overrideMessage: 'Role must be inactive to be removed' }),
    );

    await this.roleRepository.softDelete(payload.roleId);

    return RoleDto.newFromRole(role);
  }
}
