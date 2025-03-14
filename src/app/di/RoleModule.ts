import { Module, Provider } from '@nestjs/common';
import { RoleController } from '@app/api/controller/RoleController';
import { RoleDITokens } from '@core/di/role/RoleDITokens';
import { DataSource } from 'typeorm';
import { RoleService } from '@infrastructure/service/RoleService';
import { RoleRepository } from '@infrastructure/persistence/repository/RoleRepository';

const persistenceProviders: Provider[] = [
  {
    provide: RoleDITokens.RoleRepository,
    useFactory: (dataSource: DataSource) => new RoleRepository(dataSource),
    inject: [DataSource],
  },
];

const providers: Provider[] = [
  {
    provide: RoleDITokens.RoleService,
    useFactory: (roleRepository) => new RoleService(roleRepository),
    inject: [RoleDITokens.RoleRepository],
  },
];

@Module({
  controllers: [RoleController],
  providers: [...persistenceProviders, ...providers],
  exports: [RoleDITokens.RoleRepository],
})
export class RoleModule {}
