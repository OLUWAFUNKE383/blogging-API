const request = require('supertest');
const app = require('../app'); // export app separately in app.js

describe('GET /api/blogs', () => {
  it('should return list of published blogs', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
