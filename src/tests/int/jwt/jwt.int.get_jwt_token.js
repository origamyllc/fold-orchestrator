import * as stubs from '../../stubs/test.bootstrap.stubs.js';

const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');
const express = require('express');
const app = express();


var agent = request.agent(app);
var b_server = request.agent("http://localhost:9000");

describe('3. it should be able to get jwt token', () => {

    it('3.1 should get JWT token by access token from redis  ', (done) => {
        b_server
            .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
            .end( (err, res) =>  {
                expect(res.status).to.equal(200);
                expect(res.body.response.value).to.equal(stubs.jwt_token.response.value);
                if (err) return done(err)
            });
        done()
    });


    it('3.2 should get JWT token by access token ', (done) => {
        app.get('/api/v1/jwttoken', function(req, res) {
            res.setHeader("authorization",  stubs.jwt_token.response.value);
            res.status(200).json(stubs.successResponse);
        });

        agent.get('/api/v1/jwttoken')
            .set('authorization',stubs.access_token )
            .expect('Content-Type', /json/)
            .expect('authorization', stubs.jwt_token.response.value )
            .expect(200, stubs.successResponse , done);

    });
});


