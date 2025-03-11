import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { Role } from '@infrastructure/persistence/entity/Role';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class RoleDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public slug: string;

  @Expose()
  public description: string;

  @Expose()
  public status: ROLE_STATUS;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  public static newFromRole(role: Role): RoleDto {
    return plainToClass(RoleDto, role);
  }

  public static newListFromRoles(roles: Role[]): RoleDto[] {
    return roles.map((role) => this.newFromRole(role));
  }
}
