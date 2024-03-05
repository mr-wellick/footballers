import test from 'node:test';
import request from 'supertest';
import app from '../../../app.js';
import assert from 'node:assert/strict';

test('retrieve season with no body', async () => {
  const route = '/api/v1/footballers/season';
  const body = {};

  const response = await request(app)
    .post(route)
    .send(body)
    .set('Accept', 'application/json');

  assert.match(response.header['content-type'], /json/);
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.errors.length, 1);
});

test('retrieve season with invalid value', async () => {
  const route = '/api/v1/footballers/season';
  const body = { season: 'invalid_value' };

  const response = await request(app)
    .post(route)
    .send(body)
    .set('Accept', 'application/json');

  assert.match(response.header['content-type'], /json/);
  assert.equal(response.statusCode, 404);
  assert.equal(response.body.errors.length, 0);
});

test('retrieve season with a valid value', async () => {
  const route = '/api/v1/footballers/season';
  const body = { season: 'season_2004' };

  const response = await request(app)
    .post(route)
    .send(body)
    .set('Accept', 'application/json');

  assert.match(response.header['content-type'], /json/);
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.errors.length, 0);
});
