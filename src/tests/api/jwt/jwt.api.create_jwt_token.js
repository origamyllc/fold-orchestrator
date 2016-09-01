/**
 * Created by prashun on 8/16/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';

const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var m_server = request.agent("http://localhost:9100");
var b_server = request.agent("http://localhost:9000");

describe(' 2 should  create JWT token when username and password is posted', () => {

    describe('2.1.  should get  user info by username', () => {
        it('2.1.1 should create the jwt object if the access_token is set as request header', (done) => {
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

        it('2.1.2 should return an error when access token is not set ', (done) => {
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

        it('2.1.3 should return an error when access token does not exist  ', (done) => {
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

        it('2.1.4 should return an error when wrong username is passed  ', (done) => {
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

    describe('2.2 should get role info  by role name', () => {
    it('2.2.1  should get role info  by role name ', (done) => {
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

    it('2.2.2 should return an error when access token is not set ', (done) => {
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

    it('2.2.3 should return an error when access token does not exist  ', (done) => {
        m_server
            .get("/api/v1/roles/name/catalog.admin")
            .expect("Content-type",/json/)
            .set("authorization","retwrgfsheyurikuop;[")
            .expect(401)
            .end(function(err,res){
                expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                if (err) return done(err)
            });
            done();
    });

    it('2.2.4 should return an error when wrong username is passed  ', (done) => {
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

    describe('2.3 should save the jwt token', () => {

        describe('2.3.1 should get jwt token by access token from redis ', () => {
            it('2.3.1.1 gets jwt token by access token from redis  ', (done) => {
                b_server
                    .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                    .set("authorization",stubs.access_token)
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(200);

                        if (err) return done(err)
                        done()
                    });
            });

            it('2.3.1.2 throws error when no access token ', (done) => {
                b_server
                    .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(401);
                        expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                        if (err) return done(err)
                    });
                done();
            });

            it('2.3.1.3 throws error when empty access token ', (done) => {
                b_server
                    .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                    .set("authorization","")
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(401);
                        expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                        if (err) return done(err)
                    });
                done();
            });

            it('2.3.1.4 throws error when no wrong access token', (done) => {
                b_server
                    .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                    .set("authorization","2354673547135t24retwjhdfgb")
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(401);
                        expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                        if (err) return done(err)
                        done()
                    });
            });

        });

        xit('2.3.2 should save the token in cache if the token does not already exists ', (done) => {
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

        describe('2.3.3 should not save the token in cache if the token already exist ', () => {
            it('2.3.3.1 should not save the token in cache if the token already exists ', (done) => {
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
                    });
                done()
            });

            it('2.3.3.2 throw an error when no access token  ', (done) => {
                var obj = { key:  stubs.access_token, value :"Bearer "+ stubs.jwt_token.response.value };
                b_server
                    .post('/api/v1/infrastructure/redis/')
                    .send(obj)
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(401);
                        expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                        if (err) return done(err)

                    });
                done()
            });

            it('2.3.3.3 throw an error when access token  is empty  ', (done) => {
                var obj = { key:  stubs.access_token, value :"Bearer "+ stubs.jwt_token.response.value };
                b_server
                    .post('/api/v1/infrastructure/redis/')
                    .send(obj)
                    .set("authorization"," ")
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(401);
                        expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                        if (err) return done(err)
                    });
                done();
            });

            it('2.3.3.4 should throw an error if wrong access key ', (done) => {
                var obj = { key:  stubs.access_token, value :"Bearer "+ stubs.jwt_token.response.value };
                b_server
                    .post('/api/v1/infrastructure/redis/')
                    .send(obj)
                    .set("authorization","iy324784yhjewhjkrkjwe")
                    .end( (err, res) =>  {
                        expect(res.status).to.equal(401);
                        expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                        if (err) return done(err)
                        done()
                    });
            });

        });

    });
});

