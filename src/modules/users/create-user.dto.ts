import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
