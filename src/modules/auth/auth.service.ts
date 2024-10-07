import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '~helpers/password';
import { UserDTO } from '~modules/users/user.dto';
import { UsersService } from '~modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (isPasswordValid) {
      const dto = new UserDTO().fromEntity(user);
      return dto.toResponseUser();
    }

    return null;
  }

  public async login(userId: number) {
    const payload = { sub: userId };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1day' }),
    };
  }
}
