import { Exclude, Expose } from 'class-transformer';
import { EntityListDto } from '@infrastructure/dto/common/EntityListDto';
import { UserDto } from '@infrastructure/dto/user/UserDto';

@Exclude()
export class UserListDto implements EntityListDto<UserDto> {
  @Expose()
  public totalCount: number;

  @Expose()
  public list: UserDto[];
}
