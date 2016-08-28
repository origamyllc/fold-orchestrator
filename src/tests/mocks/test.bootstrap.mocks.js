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

    nock('http://localhost:9100')
        .get('/api/v1/claims/57aec655adeceec90f543e13')
        .reply(200, stubs.claims_stub);

    nock('http://localhost:9000')
        .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
        .reply(200, stubs.jwt_token);

    nock('http://localhost:9000')
        .post('/api/v1/infrastructure/redis/', {
            key: stubs.access_token,
            value: "Bearer " + stubs.jwt_token.response.value
        })
        .reply(200, stubs.successResponse);

    nock('http://localhost:9100')
        .post('/api/oauth2/v1/login', {username: 'bart', password: 'bartmargeisTheSon'})
        .reply(200, {username: 'bart', password: 'bartmargeisTheSon'});

    nock('http://localhost:9100')
        .get('/api/v1/token/57aec655adeceec90f543e0f')
        .reply(200, { accestoken : stubs.access_token });
}

