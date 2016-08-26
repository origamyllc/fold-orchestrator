/**
 * Created by prashun on 8/16/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

const request = require('supertest');
const express = require('express');
const app = express();
const expect = require('chai').expect;
const LRUCache = require('lru-cache');
const LRU = LRUCache(1000);

var agent = request.agent(app);
var m_agent = request.agent("http://localhost:9100");
var b_agent = request.agent("http://localhost:9000");

describe('1. POST : username and password to get JWT token ', (done) => {

    before( function(){
        mocks.bootstrap()
    });

    it('1.1 GET: user info by username', (done) => {
        m_agent
            .get('/api/v1/user/username/bart')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.user_stub));
                if (err) return done(err)
                done()
            });
    });

    it('1.2 GET: role info  by role name ', (done) => {
        m_agent
            .get('/api/v1/roles/name/catalog.admin')
            .end(function (err, res) {
                 expect(res.status).to.equal(200);
                 expect(res.text).to.equal(JSON.stringify(stubs.role_stub));
                if (err) return done(err)
                done()
            });
    });


    describe('1.3 should save the jwt token    ', () => {

        it('1.3.1 GET : jwt token by accesss token from redis  ', (done) => {
            b_agent
                .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                .end( (err, res) =>  {
                    expect(res.status).to.equal(200);
                    expect(res.body.response.value).to.equal(stubs.jwt_token.response.value);
                    if (err) return done(err)
                    done()
                });
        });

        it('1.3.2 should save the token in cache if the token does not exist in cache ', (done) => {
               var obj = { key:  stubs.access_token, value :"Bearer "+ stubs.jwt_token.response.value };
            b_agent
                .post('/api/v1/infrastructure/redis/')
                .send(obj)
                .end( (err, res) =>  {
                    expect(res.status).to.equal(200);
                    expect(stubs.successResponse).to.equal(stubs.successResponse);
                    if (err) return done(err)
                    done()
                });
        });
    });

});







