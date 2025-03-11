import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { UpdateRolePort } from '@infrastructure/port/role/UpdateRolePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class UpdateRoleAdapter extends ValidatableAdapter implements UpdateRolePort {
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

  public static async new(payload: UpdateRolePort): Promise<UpdateRoleAdapter> {
    const adapter: UpdateRoleAdapter = plainToClass(UpdateRoleAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
