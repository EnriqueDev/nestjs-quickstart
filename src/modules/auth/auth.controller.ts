import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../passport/local-auth.guard';
import { IAuthRequest } from '~modules/passport/AuthorizedRequest';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Req() req: IAuthRequest) {
    return this.authService.login(req.user.id);
  }
}
