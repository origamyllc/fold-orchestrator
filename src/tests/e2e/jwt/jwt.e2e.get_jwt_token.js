/**
 * Created by prashun on 8/28/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import { server } from 'hulk-cut';
import * as routes from '../../../server.js';
const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var o_agent = request.agent("http://localhost:9200");

describe(' should verify JWT token', () => {

    before( function(){
        server.listen(9200)
    });

    it('1. get jwt if the access token is set in the req header ', (done) => {

        o_agent
            .get('/api/v1/jwttoken')
            .set("authorization",stubs.access_token)
            .end( (err, res) =>  {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(JSON.stringify({"message":"jwt returned","status":200}));
                if (err) return done(err)
            });
            done();
    });

    it('1.1 should throw error when access token is not set ', (done) => {

        o_agent
            .get('/api/v1/jwttoken')
            .end( (err, res) =>  {
                expect(res.status).to.equal(401);
                expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                if (err) return done(err)
            });
            done();
    });

    it('1.2 should throw error when access token is wrong ', (done) => {

        o_agent
            .get('/api/v1/jwttoken')
            .set("authorization","udfgkufgiow54w9;8")
            .end( (err, res) =>  {
                expect(res.status).to.equal(401);
                expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                if (err) return done(err)
            });
            done();
    });

    after(function () {
         server.close();
    });

});


