import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '~modules/users/user.entity';

/**
 * Setup default connection in the application
 * @param config {ConfigService}
 */
const defaultConnection = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database:
    process.env.NODE_ENV === 'test'
      ? configService.get<'string'>('TEST_DB')
      : configService.get<'string'>('DB_DB'),
  entities: [User],
});

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: defaultConnection,
  }),
];
