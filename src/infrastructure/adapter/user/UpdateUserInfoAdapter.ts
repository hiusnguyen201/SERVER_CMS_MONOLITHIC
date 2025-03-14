import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { UpdateUserInfoPort } from '@infrastructure/port/user/UpdateUserInfoPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

@Exclude()
export class UpdateUserInfoAdapter extends ValidatableAdapter implements UpdateUserInfoPort {
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

  public static async new(payload: UpdateUserInfoPort): Promise<UpdateUserInfoAdapter> {
    const adapter: UpdateUserInfoAdapter = plainToClass(UpdateUserInfoAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
