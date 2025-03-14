import { ValidatableAdapter } from '@core/adapter/ValidatableAdapter';
import { SORT_ORDER_VALUES } from '@core/constant/common/CommonConstant';
import { ROLE_SORT_BY_VALUES } from '@core/constant/role/RoleConstant';
import { GetRoleListPort } from '@infrastructure/port/role/GetRoleListPort';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

@Exclude()
export class GetRoleListAdapter extends ValidatableAdapter implements GetRoleListPort {
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
  @Transform(({ value }) => value ?? ROLE_SORT_BY_VALUES.CREATED_AT)
  public sortBy?: ROLE_SORT_BY_VALUES;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? SORT_ORDER_VALUES.DESC)
  public sortOrder?: SORT_ORDER_VALUES;

  public static async new(payload: GetRoleListPort): Promise<GetRoleListAdapter> {
    const adapter: GetRoleListAdapter = plainToClass(GetRoleListAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
