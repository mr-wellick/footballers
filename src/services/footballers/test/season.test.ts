import { describe, it } from 'node:test';
import request from 'supertest';
import app from '../../../app.js';
import assert from 'node:assert';

describe('retrieve season ', () => {
  it('has a missing body', () => {
    const route = '/api/v1/footballers/season';
    const body = {};

    new Promise<void>((resolve) => {
      request(app)
        .post(route)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then((req) => {
          const { statusCode, body } = req;

          assert.equal(statusCode, 400);
          assert.equal(body.errors.length, 1);
          resolve();
        });
    });
  });

  it('has an invalid input', () => {
    const route = '/api/v1/footballers/season';
    const body = { season: 'invalid_value' };

    new Promise<void>((resolve) => {
      request(app)
        .post(route)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then((req) => {
          const { statusCode, body } = req;

          assert.equal(statusCode, 404);
          assert.equal(body.errors.length, 0);
          resolve();
        });
    });
  });
});
