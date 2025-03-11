import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { RemoveRolePort } from '@infrastructure/port/role/RemoveRolePort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class RemoveRoleAdapter extends ValidatableAdapter implements RemoveRolePort {
  @Expose()
  @IsUUID()
  public roleId: string;

  public static async new(payload: RemoveRolePort): Promise<RemoveRoleAdapter> {
    const adapter: RemoveRoleAdapter = plainToClass(RemoveRoleAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
