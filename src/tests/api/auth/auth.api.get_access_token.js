/**
 * Created by prashun on 8/29/16.
 */


import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

const expect = require('chai').expect;
var request = require('supertest');
var m_agent = request.agent("http://localhost:9100");


describe('1. it should be able to get access token', () => {

    xit('1.1 should validate the username and password ', (done) => {

        const user = {username: 'bart', password: 'bartmargeisTheSon'};

        m_agent
            .post('/api/oauth2/v1/login')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(user));
                if (err) return done(err)
                done()
            });
    });

    describe('1.2 should get user info by user name ', (done) => {
        it('1.2.1  gets user info by user name when the access token is set ', (done) => {
            m_agent
                .get('/api/v1/user/username/bart')
                .set('authorization', stubs.access_token)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.text).to.equal(JSON.stringify(stubs.user_stub));
                    if (err) return done(err)
                    done()
                });
        });

        it('1.2.2  throws 401 error if the access token  is not set ', (done) => {
            m_agent
                .get('/api/v1/user/username/bart')
                .end(function (err, res) {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.not.equal(JSON.stringify(stubs.user_stub));
                    if (err) return done(err)
                    done()
                });
        });
        it('1.2.3  throws 401 error if the access token empty ', (done) => {
            m_agent
                .get('/api/v1/user/username/bart')
                .set('authorization', "")
                .end(function (err, res) {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.not.equal(JSON.stringify(stubs.user_stub));
                    if (err) return done(err)
                    done()
                });
        });
        it('1.2.4  throws 401 error if the access token invalid ', (done) => {
            m_agent
                .get('/api/v1/user/username/bart')
                .set('authorization', "kejrhwjehrkwjehrkjehwryu32")
                .end(function (err, res) {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.not.equal(JSON.stringify(stubs.user_stub));
                    if (err) return done(err)
                    done()
                });
        });

    });

    describe('1.3 should get accesstoken  by user id ', (done) => {
        it('1.3.1  gets accesstoken  by user id  ', (done) => {
            m_agent
                .get('/api/v1/tokens/user/57aec655adeceec90f543e10')
                .set('authorization', stubs.access_token)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.text).to.equal(JSON.stringify(stubs.token_stub));
                    if (err) return done(err)
                    done()
                });

        });
        it('1.3.2  throws 401 error if the access token  is not set ', (done) => {
            m_agent
                .get('/api/v1/tokens/user/57aec655adeceec90f543e10')
                .end(function (err, res) {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done()
                });
        });
        it('1.3.3  throws 401 error if the access token empty ', (done) => {
            m_agent
                .get('/api/v1/tokens/user/57aec655adeceec90f543e10')
                .set('authorization', "")
                .end(function (err, res) {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done()
                });
        });
        it('1.3.4  throws 401 error if the access token invalid ', (done) => {
            m_agent
                .get('/api/v1/tokens/user/57aec655adeceec90f543e10')
                .set('authorization', "78678687686jhhjgfjgjhg")
                .end(function (err, res) {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done()
                });

        });
    });

});

