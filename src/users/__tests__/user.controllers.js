import app from '../../index.js';
import request from 'supertest';

test('user api', () => {
  request(app)
    .post('/api/v1/user/login')
    .send({
      user_email: 'lorenz3192@gmail.com',
      user_password: 'test',
    })
    .set('Accept', 'application/json')
    // .expect('Content-Type', /json/)
    .expect(200)
    .end((res) => {
      console.log(res);
    });
  expect(true).toBe(true);
});
