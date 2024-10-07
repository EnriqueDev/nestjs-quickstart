import { Request } from 'express';
import { UserData } from '~modules/users/user.dto';

export interface IAuthRequest extends Request {
  user: UserData;
}
