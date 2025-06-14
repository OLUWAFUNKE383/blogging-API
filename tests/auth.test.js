const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user.model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/blogging-test');
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Auth Endpoints', () => {
  const userData = {
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    password: 'password123'
  };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login the user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: 'wrongpassword'
    });
    expect(res.statusCode).toBe(401);
  });
});
