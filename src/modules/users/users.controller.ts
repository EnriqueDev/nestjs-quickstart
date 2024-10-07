import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '~modules/passport/JwtAuth';
import { IAuthRequest } from '~modules/passport/AuthorizedRequest';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateUserDTO) {
    await this.usersService.add(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  public async delete(@Req() req: IAuthRequest) {
    await this.usersService.remove(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public async me(@Req() req: IAuthRequest) {
    return req.user;
  }
}
