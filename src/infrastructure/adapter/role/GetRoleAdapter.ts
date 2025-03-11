import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { GetRolePort } from '@infrastructure/port/role/GetRolePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class GetRoleAdapter extends ValidatableAdapter implements GetRolePort {
  @Expose()
  @IsUUID()
  public roleId: string;

  public static async new(payload: GetRolePort): Promise<GetRoleAdapter> {
    const adapter: GetRoleAdapter = plainToClass(GetRoleAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
