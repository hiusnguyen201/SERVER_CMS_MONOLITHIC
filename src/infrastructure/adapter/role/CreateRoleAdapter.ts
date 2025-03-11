import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { ROLE_STATUS } from '@core/constant/role/RoleConstant';
import { CreateRolePort } from '@infrastructure/port/role/CreateRolePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateRoleAdapter extends ValidatableAdapter implements CreateRolePort {
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

  public static async new(payload: CreateRolePort): Promise<CreateRoleAdapter> {
    const adapter: CreateRoleAdapter = plainToClass(CreateRoleAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
