/**
 * Created by prashun on 8/22/16.
 */

import * as stubs from '../stubs/test.bootstrap.stubs.js';
const nock = require('nock');

export function bootstrap() {

    nock('http://localhost:9100')
        .get('/api/v1/user/username/bart')
        .reply(200, stubs.user_stub);

    nock('http://localhost:9100')
        .get('/api/v1/roles/name/catalog.admin')
        .reply(200, stubs.role_stub);

    nock('http://localhost:9000')
        .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
        .reply(200, stubs.jwt_token);
}