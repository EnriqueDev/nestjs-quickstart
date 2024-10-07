import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { JwtStrategy } from '~modules/passport/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [UsersService, JwtStrategy],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
