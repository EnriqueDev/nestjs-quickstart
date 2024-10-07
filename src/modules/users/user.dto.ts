import { User } from './user.entity';

export type UserData = Omit<User, 'password'>;

export class UserDTO {
  public id: number;

  public email: string;

  public password: string;

  public name: string;

  public lastName1: string;

  public lastName2: string;

  public createdAt: Date;

  public updatedAt: Date;

  public deletedAt: Date | null;

  fromEntity(user: Partial<User>): UserDTO {
    const dto = new UserDTO();

    dto.id = user.id;
    dto.email = user.email;
    dto.password = user.password;
    dto.name = user.name;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    dto.deletedAt = user.deletedAt;
    dto.lastName1 = user.lastName1;
    dto.lastName2 = user.lastName2;

    return dto;
  }

  toResponseUser(): UserData {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      lastName1: this.lastName1,
      lastName2: this.lastName2,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
