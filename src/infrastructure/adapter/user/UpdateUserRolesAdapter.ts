import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { UpdateUserRolesPort } from '@infrastructure/port/user/UpdateUserRolesPort';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsArray, IsUUID } from 'class-validator';

@Exclude()
export class UpdateUserRolesAdapter extends ValidatableAdapter implements UpdateUserRolesPort {
  @Expose()
  @IsUUID()
  public userId: string;

  @Expose()
  @IsArray()
  @IsUUID('4', { each: true })
  @Transform(({ value }) => Array.from(new Set(value)))
  public roleIds: string[];

  public static async new(payload: UpdateUserRolesPort): Promise<UpdateUserRolesAdapter> {
    const adapter: UpdateUserRolesAdapter = plainToClass(UpdateUserRolesAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
