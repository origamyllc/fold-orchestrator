/**
 * Created by prashun on 8/28/16.
 */
/**
 * Created by prashun on 8/16/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as http_server from '../../../cut/middleware/cut.express.js';
import * as routes from '../../../server.js';
const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var o_agent = request.agent("http://localhost:9200");


describe(' should  create JWT token when username and password is posted', () => {

    before( function(){
        http_server.listen(9200)
    });

    xit('1. set jwt if the access token is set in the req header ', (done) => {
        const user = {
            username:'bart',
            password:'bartmargeisTheSon'
        };
        o_agent
            .post('/api/v1/jwttoken')
            .send(user)
            .set("authorization",stubs.access_token)
            .end( (err, res) =>  {
                expect(res.status).to.equal(200);
                // if (err) return done(err)
                done()
            });
    });

    it('1. return error if the jwt token has already been created', (done) => {
        const user = {
            username:'bart',
            password:'bartmargeisTheSon'
        };
        o_agent
            .post('/api/v1/jwttoken')
            .send(user)
            .set("authorization",stubs.access_token)
            .end( (err, res) =>  {
                expect(res.status).to.equal(500);
                if (err) return done(err)
                done()
            });
    });

    it('2. return error if the accesstoken is empty', (done) => {
        const user = {
            username:'bart',
            password:'bartmargeisTheSon'
        };
        o_agent
            .post('/api/v1/jwttoken')
            .send(user)
            .set("authorization",'')
            .end( (err, res) =>  {
                expect(res.status).to.equal(500);
                if (err) return done(err)
                done()
            });
    });



    it('1. return error if the accesstoken is wrong', (done) => {
        const user = {
            username:'bart',
            password:'bartmargeisTheSon'
        };
        o_agent
            .post('/api/v1/jwttoken')
            .send(user)
            .set("authorization",'hkjwheherojhiu4rhtoiu45hiothg')
            .end( (err, res) =>  {
                expect(res.status).to.equal(500);
                if (err) return done(err)
                done()
            });
    });

    after(function () {
        http_server.close();
    });

});

