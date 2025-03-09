import { Global, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionHandler } from '@app/api/exception-handler/HttpExceptionHandler';
import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { TypeOrmDirectory } from '@infrastructure/persistence/TypeOrmDirectory';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionHandler,
  },
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: 'postgres',
        type: 'postgres',
        host: DatabaseConfig.DB_HOST,
        port: DatabaseConfig.DB_PORT,
        username: DatabaseConfig.DB_USERNAME,
        password: DatabaseConfig.DB_PASSWORD,
        database: DatabaseConfig.DB_NAME,
        logging: DatabaseConfig.DB_LOG_ENABLE ? 'all' : false,
        entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  providers: providers,
})
export class InfrastructureModule {}
