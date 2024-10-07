import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { DatabaseModule } from '~database/database.module';
import { UsersModule } from '../users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from '~modules/auth/auth.module';
import {
  createTestUser,
  loginUser,
  TEST_EMAIL,
  TEST_USER_DATA,
} from '~utils/testing';
import { App } from 'supertest/types';
import { HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let app: any;
  let httpServer: App;
  let repository: Repository<User>;

  let token: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule, AuthModule],
    }).compile();

    repository = module.get<Repository<User>>(getRepositoryToken(User));
    app = module.createNestApplication();

    await app.init();
    httpServer = app.getHttpServer();

    await createTestUser(httpServer);
    token = await loginUser(httpServer);
  });

  afterAll(async () => {
    await repository.delete({
      email: TEST_EMAIL,
    });
    await app.close();
  });

  describe('GET /users/me', () => {
    it('should reject unauthorised responses', async () => {
      const data = await request(httpServer).get('/users/me');

      expect(data.statusCode).toEqual(401);
    });

    it('should retrieve user data', async () => {
      const data = await request(httpServer)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`);

      const testData = {
        name: data.body.name,
        email: data.body.email,
        firstName: data.body.firstName,
        lastName1: data.body.lastName1,
        lastName2: data.body.lastName2,
      };

      expect(testData).toEqual(TEST_USER_DATA);
    });
  });

  describe('DELETE /users/me', () => {
    it('should reject unauthorised responses', async () => {
      const data = await request(httpServer).delete('/users/me');

      expect(data.statusCode).toEqual(401);
    });

    // Run this test last
    it('should delete user', async () => {
      const data = await request(httpServer)
        .delete('/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(data.statusCode).toEqual(HttpStatus.OK);
    });
  });
});
