import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DatabaseModule } from '~database/database.module';

import { UserController } from '~modules/users/users.controller';
import { UsersModule } from '~modules/users/users.module';

import { AuthController } from '~modules/auth/auth.controller';
import { AuthModule } from '~modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController, UserController, AuthController],
  providers: [],
})
export class AppModule {}
