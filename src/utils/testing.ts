import * as request from 'supertest';
import { App } from 'supertest/types';

export const TEST_EMAIL = 'test@test.com';
export const TEST_PASSWORD = 'PASSWORD';

export const TEST_USER_DATA = {
  name: 'test',
  lastName1: 'testy',
  lastName2: 'mctestface',
  email: TEST_EMAIL,
};

export const CREATE_TEST_USER_REQUEST = {
  ...TEST_USER_DATA,
  password: TEST_PASSWORD,
};

export const createTestUser = async (httpServer: App) => {
  return await request(httpServer)
    .post('/users')
    .send(CREATE_TEST_USER_REQUEST);
};

export const loginUser = async (httpserver: App): Promise<string> => {
  const data = await request(httpserver)
    .post('/auth/login')
    .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

  return data.body.accessToken;
};
