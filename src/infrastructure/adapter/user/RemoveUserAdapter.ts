import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { RemoveUserPort } from '@infrastructure/port/user/RemoveUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class RemoveUserAdapter extends ValidatableAdapter implements RemoveUserPort {
  @Expose()
  @IsUUID()
  public userId: string;

  public static async new(payload: RemoveUserPort): Promise<RemoveUserAdapter> {
    const adapter: RemoveUserAdapter = plainToClass(RemoveUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
