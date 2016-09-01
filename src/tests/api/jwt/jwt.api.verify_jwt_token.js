/**
 * Created by prashun on 8/16/16.
 */

var request = require('supertest');
const  jwt = require('jsonwebtoken');
const expect = require('chai').expect;

import * as stubs from '../../stubs/test.bootstrap.stubs.js';

var m_server = request.agent("http://localhost:9100");

describe('4  it should be able to verify jwt token', () => {


    describe('4.1 should be able to get claims by claim id ', () => {

        it('4.1.1  get claims by claim id', (done) => {

         m_server
            .get('/api/v1/claims/57aec655adeceec90f543e13')
            .set("authorization",stubs.access_token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.claims_stub));
                if (err) return done(err)
                done()
            });
        });

        it('4.1.2 should return an error when access token is not set ', (done) => {
            m_server
                .get("/api/v1/claims/57aec655adeceec90f543e13")
                .expect("Content-type",/json/)
                .expect(401)
                .end(function(err,res){
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done();
                });
        });

        it('4.1.3 should return an error when access token does not exist  ', (done) => {
            m_server
                .get("/api/v1/claims/57aec655adeceec90f543e13")
                .expect("Content-type",/json/)
                .set("authorization","")
                .expect(401)
                .end(function(err,res){
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done();
                });
        });

        it('4.1.4 should return an error when wrong username is passed  ', (done) => {
            m_server
                .get("/api/v1/claims/57aec655adeceec90f543e13")
                .expect("Content-type",/json/)
                .set("authorization","retwrgfsheyurikuop;[")
                .expect(401)
                .end(function(err,res){
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done();
                });
        });
    });
});
