import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@app/di/InfrastructureModule';
import { UserModule } from '@app/di/UserModule';
import { RoleModule } from '@app/di/RoleModule';

@Module({
  imports: [InfrastructureModule, UserModule, RoleModule],
})
export class RootModule {}
