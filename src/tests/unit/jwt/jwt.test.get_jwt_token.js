/**
 * Created by prashun on 8/16/16.
 */

var request = require('supertest');
var express = require('express');
var app = express();

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

describe('3. it should be able to get jwt token', () => {

    var agent = request.agent(app);

    before( function(){
        mocks.bootstrap()
    });

    it('3.1 should get JWT token by access token ', (done) => {
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


