/**
 * Created by prashun on 8/16/16.
 */

var request = require('supertest');
var express = require('express');
var app = express();
const  jwt = require('jsonwebtoken');
const expect = require('chai').expect;
const uuid = require('node-uuid');

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

var m_agent = request.agent("http://localhost:9100");
var agent = request.agent(app);

describe('4. it should be able to verify jwt token', () => {
    before( function(){
        mocks.bootstrap();
    });

    it('4.1 should verify JWT token ', (done) => {
        jwt.verify(stubs.jwt_token.response.value , 'hhhhhh', (err, decoded_token) => {

            expect(decoded_token.userId ).to.equal('57aec655adeceec90f543e0f');
            expect(decoded_token.username ).to.equal('marge');
            expect(decoded_token.roles ).to.equal('catalog.admin');
            expect(decoded_token.claimsId ).to.equal('57aec655adeceec90f543e13');
        });
        done();
    });

    it('4.2 should be able to get claims by claim id ', (done) => {
        m_agent
            .get('/api/v1/claims/57aec655adeceec90f543e13')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify(stubs.claims_stub));
                if (err) return done(err)
                done()
            });
    });

    it('4.3 should be able to set the x-authorization-header ', (done) => {

        let token = { userId: '57aec655adeceec90f543e0f',
                username: 'marge',
                roles: [ 'catalog.admin' ],
                claimsId: '57aec655adeceec90f543e13',
                iat: 1472097048 };

        var claims = stubs.claims_stub;

        let permissions = {};
        delete token.claimsId;
        permissions.devices = claims.devices;
        permissions.api_white_list = claims.api_white_list;
        permissions.applications = claims.applications;

        token.permissions =  permissions;

        app.get('/api/v1/jwttoken/verify', function(req, res) {
            res.setHeader("x-authorization-header",  "Bearer " + jwt.sign( token,'hhhhhh'));
            res.status(200).json(stubs.successResponse);
        });
        agent.get('/api/v1/jwttoken/verify')
            .expect(200, stubs.successResponse , done);
    });

});


