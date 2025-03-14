import { Module, Provider } from '@nestjs/common';
import { UserController } from '@app/api/controller/UserController';
import { UserDITokens } from '@core/di/user/UserDITokens';
import { UserService } from '@infrastructure/service/UserService';
import { DataSource } from 'typeorm';
import { RoleDITokens } from '@core/di/role/RoleDITokens';
import { RoleRepository } from '@infrastructure/persistence/repository/RoleRepository';
import { UserRepository } from '@infrastructure/persistence/repository/UserRepository';

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
    inject: [DataSource],
  },
  {
    provide: RoleDITokens.RoleRepository,
    useFactory: (dataSource: DataSource) => new RoleRepository(dataSource),
    inject: [DataSource],
  },
];

const providers: Provider[] = [
  {
    provide: UserDITokens.UserService,
    useFactory: (userRepository, roleRepository) => new UserService(userRepository, roleRepository),
    inject: [UserDITokens.UserRepository, RoleDITokens.RoleRepository],
  },
];

@Module({
  controllers: [UserController],
  providers: [...persistenceProviders, ...providers],
  exports: [UserDITokens.UserRepository],
})
export class UserModule {}
