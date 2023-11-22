import supertest from 'supertest';
import app from '../app';
import { db } from '../utils/db';

const api = supertest(app);

beforeAll(async () => {
  await db.user.deleteMany();
});

describe('Auth routes', () => {
  const baseURL = '/api/v1/auth';

  test('[POST] user registration - missing fields', async () => {
    const user = {
      username: '',
      email: '',
      password: 'newUser',
      passConfirm: 'newUser',
    };
    await api.post(`${baseURL}/register`).send(user).expect(401);
  });

  test('[POST] user registration - password mismatch', async () => {
    const user = {
      username: 'newUser',
      email: 'newUser@gmail.com',
      password: 'newUser',
      passConfirm: 'newUse',
    };
    await api.post(`${baseURL}/register`).send(user).expect(401);
  });

  test('[POST] user registration - success', async () => {
    const user = {
      username: 'newUser',
      email: 'newUser@gmail.com',
      password: 'newUser',
      passConfirm: 'newUser',
    };
    await api
      .post(`${baseURL}/register`)
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('[POST] user login - missing fields', async () => {
    const user = {
      email: '',
      password: '',
    };
    await api.post(`${baseURL}/login`).send(user).expect(401);
  });

  test('[POST] user login - incorrect credentials', async () => {
    const user = {
      email: 'newUse@gmail.com',
      password: 'newUser',
    };
    await api.post(`${baseURL}/login`).send(user).expect(401);
  });

  test('[POST] user login - success', async () => {
    const user = {
      email: 'newUser@gmail.com',
      password: 'newUser',
    };
    await api
      .post(`${baseURL}/login`)
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
