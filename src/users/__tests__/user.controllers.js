import app from '../../index.js';
import request from 'supertest';

test('validateInput middleware case: body is missing', () => {
  return new Promise((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({})
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors.length).toBe(2);
        done();
      });
  });
});

test('userLogin controller case: user does not exist', () => {
  return new Promise((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        user_email: 'test@test.com',
        user_password: '12345678',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

test('userLogin controller case: wrong password', () => {
  return new Promise((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        user_email: 'somename@gmail.com',
        user_password: '123456789',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});

test('userLogin controller case: successful login', () => {
  return new Promise((done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        user_email: 'somename@gmail.com',
        user_password: '12345678',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
