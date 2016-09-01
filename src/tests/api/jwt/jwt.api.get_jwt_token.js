import * as stubs from '../../stubs/test.bootstrap.stubs.js';

const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var b_server = request.agent("http://localhost:9000");

describe('3. it should be able to get jwt token', () => {

    describe('3.1 should get JWT token by access token from redis  ', () => {
        it('3.1.1 gets JWT token by access token from redis  ', (done) => {
            b_server
                .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                .set("authorization",stubs.access_token)
                .end( (err, res) =>  {
                    expect(res.status).to.equal(200);
                    expect(res.body.response.value).to.equal(stubs.jwt_token.response.value);
                    if (err) return done(err)
                    done()
                });
        });

        it('3.1.2 throws error when no access token is set ', (done) => {
            b_server
                .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                .end( (err, res) =>  {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                });
            done()
        });

        it('3.1.3 throws error when no access token is set ', (done) => {
            b_server
                .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                .end( (err, res) =>  {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                });
            done()
        });

        it('3.1.4 throws error when no access token is set ', (done) => {
            b_server
                .get('/api/v1/infrastructure/redis/6d3323f5-e9ec-4717-90ea-b3217cda1333')
                .end( (err, res) =>  {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(JSON.stringify({ message: 'unauthorized access' }));
                    if (err) return done(err)
                });
               done()
        });
    });
});


