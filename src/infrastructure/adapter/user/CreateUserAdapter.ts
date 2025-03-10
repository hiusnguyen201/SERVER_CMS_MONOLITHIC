import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { CreateUserPort } from '@infrastructure/port/user/CreateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateUserAdapter extends ValidatableAdapter implements CreateUserPort {
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  public email: string;

  @Expose()
  @IsOptional()
  @IsString()
  public phone?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public address?: string;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
