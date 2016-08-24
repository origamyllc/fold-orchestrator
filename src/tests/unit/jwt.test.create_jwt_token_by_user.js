/**
 * Created by prashun on 8/16/16.
 */

import * as stubs from '../stubs/test.bootstrap.stubs.js';
import * as mocks from '../mocks/test.bootstrap.mocks.js';

const request = require('supertest');
const express = require('express');
const app = express();
const expect = require('chai').expect;
const LRUCache = require('lru-cache');
const LRU = LRUCache(1000);

var agent = request.agent(app);
var m_agent = request.agent("http://localhost:9100");
var b_agent = request.agent("http://localhost:9000");

describe('POST : username and password to get JWT token ', (done) => {

    before( function(){
        mocks.bootstrap()
    });

    it('GET: user info by username', (done) => {
        m_agent
            .get('/api/v1/user/username/bart')
            .end(function (err, res) {
                //assert that the mocked response is returned
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.user_stub));
                if (err) return done(err)
                done()
            });
    });

    it('GET: role info  by role name ', (done) => {
        m_agent
            .get('/api/v1/roles/name/catalog.admin')
            .end(function (err, res) {
                //assert that the mocked response is returned
                 expect(res.status).to.equal(200);
                 expect(res.text).to.equal(JSON.stringify(stubs.role_stub));
                if (err) return done(err)
                done()
            });
    });

    it('GET : jwt token by accesss token from redis  ', (done) => {
        b_agent
            .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
            .end( (err, res) =>  {
                //assert that the mocked response is returned
                expect(res.status).to.equal(200);
                expect(res.body.response.value).to.equal(stubs.jwt_token.response.value);
                if (err) return done(err)
                done()
            });
    });

});






