import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { UpdateUserPort } from '@infrastructure/port/user/UpdateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

@Exclude()
export class UpdateUserAdapter extends ValidatableAdapter implements UpdateUserPort {
  @Expose()
  @IsUUID()
  public userId: string;

  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsPhoneNumber('VN')
  public phone?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public address?: string;

  public static async new(payload: UpdateUserPort): Promise<UpdateUserAdapter> {
    const adapter: UpdateUserAdapter = plainToClass(UpdateUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
