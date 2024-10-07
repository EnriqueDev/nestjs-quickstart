import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '~database/database.module';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';
import { AuthModule } from '~modules/auth/auth.module';
import { createTestUser, TEST_EMAIL, TEST_USER_DATA } from '~utils/testing';
import { App } from 'supertest/types';

describe('UsersController', () => {
  let app: any;
  let httpServer: App;
  let repository: Repository<User>;
  let usersService: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule, AuthModule],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    app = module.createNestApplication();

    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await repository.delete({
      email: TEST_EMAIL,
    });
  });

  it('should create a user', async () => {
    const response = await createTestUser(httpServer);

    expect(response.status).toBe(HttpStatus.CREATED);
    const user = await usersService.findOne(response.body.id);
    expect(user.toResponseUser()).toMatchObject(TEST_USER_DATA);
  });
});
