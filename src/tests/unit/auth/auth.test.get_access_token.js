/**
 * Created by prashun on 8/16/16.
 */

var request = require('supertest');
var express = require('express');
var app = express();

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

const expect = require('chai').expect;


var agent = request.agent(app);
var m_agent = request.agent("http://localhost:9100");


describe('1. it should be able to get access token', () => {

    before( function(){
        mocks.bootstrap();
    });

    it('1.1 should validate that the username and password ', (done) => {

        const user =  { username :  'bart' , password : 'bartmargeisTheSon'};

        m_agent
            .post('/api/oauth2/v1/login')
            .send(user)
            .end( (err, res) =>  {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(user));
                if (err) return done(err)
                done()
            });
    });

    it('1.2 should get user info by user name ', (done) => {
        m_agent
            .get('/api/v1/user/username/bart')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.user_stub));
                if (err) return done(err)
                done()
            });
    });

    it('1.3 should get accesstoken  by user id ', (done) => {
        m_agent
            .get('/api/v1/token/57aec655adeceec90f543e0f')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify( { accestoken : stubs.access_token }));
                if (err) return done(err)
                done()
            });
    });

});
