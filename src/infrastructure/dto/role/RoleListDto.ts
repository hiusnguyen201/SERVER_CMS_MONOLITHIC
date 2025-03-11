import { Exclude, Expose } from 'class-transformer';
import { EntityListDto } from '@infrastructure/dto/common/EntityListDto';
import { RoleDto } from '@infrastructure/dto/role/RoleDto';

@Exclude()
export class RoleListDto implements EntityListDto<RoleDto> {
  @Expose()
  public totalCount: number;

  @Expose()
  public list: RoleDto[];
}
