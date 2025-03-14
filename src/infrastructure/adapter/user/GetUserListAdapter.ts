import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { SORT_ORDER_VALUES } from '@core/constant/common/CommonConstant';
import { USER_SORT_BY_VALUES } from '@core/constant/user/UserConstant';
import { GetUserListPort } from '@infrastructure/port/user/GetUserListPort';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

@Exclude()
export class GetUserListAdapter extends ValidatableAdapter implements GetUserListPort {
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? '')
  public keyword: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => value ?? 1)
  public page: number = 1;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(100)
  @Transform(({ value }) => value ?? 10)
  public limit: number = 10;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? USER_SORT_BY_VALUES.CREATED_AT)
  public sortBy?: USER_SORT_BY_VALUES;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? SORT_ORDER_VALUES.DESC)
  public sortOrder?: SORT_ORDER_VALUES;

  public static async new(payload: GetUserListPort): Promise<GetUserListAdapter> {
    const adapter: GetUserListAdapter = plainToClass(GetUserListAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
