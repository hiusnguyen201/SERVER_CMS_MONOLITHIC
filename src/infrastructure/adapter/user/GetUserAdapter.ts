import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { GetUserPort } from '@infrastructure/port/user/GetUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class GetUserAdapter extends ValidatableAdapter implements GetUserPort {
  @Expose()
  @IsUUID()
  public userId: string;

  public static async new(payload: GetUserPort): Promise<GetUserAdapter> {
    const adapter: GetUserAdapter = plainToClass(GetUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
