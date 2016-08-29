/**
 * Created by prashun on 8/16/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

const request = require('supertest');
const express = require('express');
const app = express();
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var agent = request.agent(app);
var m_agent = request.agent("http://localhost:9100");
var b_agent = request.agent("http://localhost:9000");


describe('1. should  create JWT token when username and password is posted  ', (done) => {

    before( function(){
        mocks.bootstrap()
    });

    it('1.1 should get  user info by username', (done) => {
        m_agent
            .get('/api/v1/user/username/bart')
            .end(function (err, res) {
                let user_info = JSON.parse(res.text);
                let jwt_object = {};
                expect(JSON.stringify(user_info)).to.equal(JSON.stringify(stubs.user_stub));
                if (user_info) {
                    jwt_object.userId = user_info.docs[0]._id;
                    jwt_object.username = user_info.docs[0].username;
                    jwt_object.roles = user_info.docs[0].roles;
                }
                expect(JSON.stringify(jwt_object)).to.equal(JSON.stringify(stubs.jwt_object));
                if (err) return done(err)
                done()
            });
    });

    it('1.2 should get role info  by role name ', (done) => {
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

        it('1.3.1 should get jwt token by access token from redis  ', (done) => {
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
                    expect(res.text).to.equal(JSON.stringify(stubs.successResponse));
                    if (err) return done(err)
                    done()
                });
        });

    });

    it('1.3.3 should set the jwt token as header and return the response', (done) => {
        app.post("/api/v1/jwttoken", function(req, res){
            expect(req.headers.authorization).to.equal(stubs.access_token);
            res.setHeader("authorization",  stubs.jwt_token.response.value);
            res.status(200).send( stubs.successResponse)

        });

        const user = {
            username:'bart',
            password:'bartmargeisTheSon'
        };

        agent.post("/api/v1/jwttoken")
            .set('Authorization', stubs.access_token)
            .send(user)
            .end(function(err, res) {
                expect(res.headers.authorization).to.equal(stubs.jwt_token.response.value);
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.successResponse));
                done();
            });

    });

});







