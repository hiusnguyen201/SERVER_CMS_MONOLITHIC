import { Module, Provider } from '@nestjs/common';
import { UserController } from '@app/api/controller/UserController';
import { UserDITokens } from '@core/di/user/UserDITokens';
import { UserService } from '@infrastructure/service/UserService';
import { User } from '@infrastructure/persistence/entity/User';
import { DataSource } from 'typeorm';

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DataSource],
  },
];

const providers: Provider[] = [
  {
    provide: UserDITokens.UserService,
    useFactory: (userRepository) => new UserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

@Module({
  controllers: [UserController],
  providers: [...persistenceProviders, ...providers],
  exports: [UserDITokens.UserRepository],
})
export class UserModule {}
