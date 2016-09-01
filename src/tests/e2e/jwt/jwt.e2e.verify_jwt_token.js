/**
 * Created by prashun on 8/28/16.
 */

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as http_server from '../../../cut/middleware/cut.express.js';
import * as routes from '../../../server.js';
const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var o_agent = request.agent("http://localhost:9200");

describe(' should verify JWT token', () => {

    before( function(){
        http_server.listen(9200)
    });

    it('1. set jwt if the access token is set in the req header ', (done) => {

        o_agent
            .get('/api/v1/jwttoken/verify')
            .set("authorization", "Bearer "+  stubs.correct_jwt_token.response.value )
            .end( (err, res) =>  {
                expect(res.status).to.equal(200);
                if (err) return done(err);
                done()
            });
    });


    after(function () {
        http_server.close();
    });

});


