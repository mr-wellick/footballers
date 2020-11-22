import app from '../../app.js';
import request from 'supertest';

test('validateInput middleware case: body is missing', () => {
  const route = '/api/v1/user/login';
  const body = {};

  return new Promise((done) => {
    request(app)
      .post(route)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { statusCode, body } = res;

        expect(statusCode).toBe(400);
        expect(body.errors.length).toBe(2);
        done();
      });
  });
});

test('userLogin controller case: user does not exist', () => {
  const route = '/api/v1/user/login';
  const body = {
    user_email: 'test@test.com',
    user_password: '12345678',
  };

  return new Promise((done) => {
    request(app)
      .post(route)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { statusCode } = res;

        expect(statusCode).toBe(404);
        done();
      });
  });
});

test('userLogin controller case: wrong password', () => {
  const route = '/api/v1/user/login';
  const body = {
    user_email: 'somename@gmail.com',
    user_password: '123456789',
  };

  return new Promise((done) => {
    request(app)
      .post(route)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { statusCode } = res;

        expect(statusCode).toBe(401);
        done();
      });
  });
});

test('userLogin controller case: successful login', () => {
  const route = '/api/v1/user/login';
  const body = {
    user_email: 'somename@gmail.com',
    user_password: '12345678',
  };

  return new Promise((done) => {
    request(app)
      .post(route)
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { statusCode } = res;

        expect(statusCode).toBe(200);
        done();
      });
  });
});
