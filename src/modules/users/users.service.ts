import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';
import { UserDTO } from './user.dto';
import { hashPassword } from '~helpers/password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async add(dto: CreateUserDTO) {
    const newPassword = await hashPassword(dto.password);
    dto.password = newPassword;
    try {
      await this.usersRepository.save(dto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        switch (e.driverError.code) {
          case 'ER_DUP_ENTRY':
            throw new UnprocessableEntityException('duplicated email');
        }
      }
    }
  }

  public async findOne(id: number): Promise<UserDTO | null> {
    const result = await this.usersRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException();
    }
    return new UserDTO().fromEntity(result);
  }

  public async findOneByEmail(email: string) {
    const entity = await this.usersRepository.findOneBy({ email });

    return entity ? new UserDTO().fromEntity(entity) : null;
  }

  public async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
