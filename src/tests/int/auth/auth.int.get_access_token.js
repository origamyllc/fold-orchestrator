/**
 * Created by prashun on 8/29/16.
 */


import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

const expect = require('chai').expect;
var request = require('supertest');
var m_agent = request.agent("http://localhost:9100");


describe('1. it should be able to get access token', () => {

    xit('1.1 should validate the username and password ', (done) => {

        const user =  { username :  'bart' , password : 'bartmargeisTheSon'};

        m_agent
            .post('/api/oauth2/v1/login')
            .send(user)
            .end( (err, res) =>  {
                expect(res.status).to.equal(200);
                console.log("====>>"+JSON.stringify(res.body))
                expect(res.text).to.equal(JSON.stringify(user));
                if (err) return done(err)
                done()
            });
    });

});

