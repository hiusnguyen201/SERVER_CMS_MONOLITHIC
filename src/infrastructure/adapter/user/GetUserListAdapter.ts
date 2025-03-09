import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { GetUserListPort } from '@infrastructure/port/user/GetUserListPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GetUserListAdapter extends ValidatableAdapter implements GetUserListPort {
  @Expose()
  @IsOptional()
  @IsString()
  public keyword: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  public offset: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public limit: number;

  public static async new(payload: GetUserListPort): Promise<GetUserListAdapter> {
    const adapter: GetUserListAdapter = plainToClass(GetUserListAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
