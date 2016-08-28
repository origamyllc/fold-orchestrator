/**
 * Created by prashun on 8/16/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import { cutRouter  } from '../../../cut/index.js';
const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var m_server = request.agent("http://localhost:9100");
var b_server = request.agent("http://localhost:9000");

describe(' should  create JWT token when username and password is posted', () => {

    describe('1.  should get  user info by username', () => {
        it('1.1 should create the jwt object if the access_token is set as request header', (done) => {
        m_server
            .get("/api/v1/user/username/bart")
            .set("authorization",stubs.access_token)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                 expect(res.body.docs.length).to.equal(1);
                 const  user_info = res.body.docs[0];
                 let jwt_object = {};
                 if (user_info) {
                    jwt_object.userId = user_info._id;
                    jwt_object.username = user_info.username;
                    jwt_object.roles = user_info.roles;
                }
                expect(jwt_object.userId).to.equal(stubs.user_stub.docs[0]._id);

                if (err) return done(err)
                 done();
            });
        });

        it('1.2 should return an error when access token is not set ', (done) => {
            m_server
                .get("/api/v1/user/username/bart")
                .expect("Content-type",/json/)
                .expect(401)
                .end(function(err,res){
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done();
                });
        });

        it('1.3 should return an error when access token does not exist  ', (done) => {
            m_server
                .get("/api/v1/user/username/bart")
                .expect("Content-type",/json/)
                .set("authorization","retwrgfsheyurikuop;[")
                .expect(401)
                .end(function(err,res){
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                    done();
                });
        });

        it('1.4 should return an error when wrong username is passed  ', (done) => {
             m_server
                .get("/api/v1/user/username/bartinder")
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

    describe('2 should get  user info by username', () => {
    it('2.1  should get role info  by role name ', (done) => {
        m_server
            .get('/api/v1/roles/name/catalog.admin')
            .set("authorization",stubs.access_token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.role_stub));
                if (err) return done(err)
                done()
            });
       });
    });

    it('2.2 should return an error when access token is not set ', (done) => {
        m_server
            .get("/api/v1/roles/name/catalog.admin")
            .expect("Content-type",/json/)
            .expect(401)
            .end(function(err,res){
                expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                if (err) return done(err)
                done();
            });
    });

    it('2.3 should return an error when access token does not exist  ', (done) => {
        m_server
            .get("/api/v1/roles/name/catalog.admin")
            .expect("Content-type",/json/)
            .set("authorization","retwrgfsheyurikuop;[")
            .expect(401)
            .end(function(err,res){
                expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                if (err) return done(err)
                done();
            });
    });

    it('2.4 should return an error when wrong username is passed  ', (done) => {
        m_server
            .get("/api/v1/roles/name/catalog-admin")
            .expect("Content-type",/json/)
            .set("authorization","retwrgfsheyurikuop;[")
            .expect(401)
            .end(function(err,res){
                expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                if (err) return done(err)
                done();
            });
    });

    describe('3 should save the jwt token    ', () => {
        it('3.1 should get jwt token by access token from redis  ', (done) => {
            b_server
                .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                .set("authorization",stubs.access_token)
                .end( (err, res) =>  {
                    expect(res.status).to.equal(200);

                    if (err) return done(err)
                    done()
                });
        });

        xit('1.3.2 should t save the token in cache if the token does not already exists ', (done) => {
            var obj = { key:  stubs.access_token, value :"Bearer "+ stubs.jwt_token.response.value };
            b_server
                .post('/api/v1/infrastructure/redis/')
                .send(obj)
                .set("authorization",stubs.access_token)
                .end( (err, res) =>  {
                    expect(res.status).to.equal(200);
                    if (err) return done(err)
                    done()
                });
        });


        it('1.3.2 should not save the token in cache if the token already exists ', (done) => {
            var obj = { key:  stubs.access_token, value :"Bearer "+ stubs.jwt_token.response.value };
            b_server
                .post('/api/v1/infrastructure/redis/')
                .send(obj)
                .set("authorization",stubs.access_token)
                .end( (err, res) =>  {
                    expect(res.status).to.equal(500);
                    expect(res.status).to.not.equal(200);
                    expect(res.text).to.not.equal(JSON.stringify(stubs.successResponse));
                    if (err) return done(err)
                    done()
                });
        });

    });
});

