import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { UpdateRoleInfoPort } from '@infrastructure/port/role/UpdateRoleInfoPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class UpdateRoleInfoAdapter extends ValidatableAdapter implements UpdateRoleInfoPort {
  @Expose()
  @IsUUID()
  public roleId: string;

  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsOptional()
  @IsString()
  public description?: string;

  @Expose()
  @IsString()
  public status: ROLE_STATUS;

  public static async new(payload: UpdateRoleInfoPort): Promise<UpdateRoleInfoAdapter> {
    const adapter: UpdateRoleInfoAdapter = plainToClass(UpdateRoleInfoAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
