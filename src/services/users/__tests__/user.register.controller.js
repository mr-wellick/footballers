import app from '../../../app';
import request from 'supertest';

test('validateInput middleware case: body is missing', () => {
  const route = '/api/v1/user/register';
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

test('cannot register a user if account exists already', () => {
  const route = '/api/v1/user/register';
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

        expect(statusCode).toBe(401);
        done();
      });
  });
});

test('registerUser controller case: register a user', async () => {
  const route = '/api/v1/user/register';
  const body = {
    user_email: 'newuser@gmail.com',
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
