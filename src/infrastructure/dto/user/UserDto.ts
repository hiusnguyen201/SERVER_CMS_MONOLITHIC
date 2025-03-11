import { User } from '@infrastructure/persistence/entity/User';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  public id: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public phone: string;

  @Expose()
  public address: string;

  @Expose()
  public isVerified: boolean;

  @Expose()
  public verifiedAt: Date;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  public static newFromUser(user: User): UserDto {
    return plainToClass(UserDto, user);
  }

  public static newListFromUsers(users: User[]): UserDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
