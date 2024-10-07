import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '~modules/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from '~modules/passport/local-auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, PassportModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
