/**
 * Created by prashun on 8/16/16.
 */

var request = require('supertest');
var express = require('express');
var app = express();

import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import * as mocks from '../../mocks/test.bootstrap.mocks.js';

describe('2. it should be able to decode jwt token', () => {
    before( function(){
        mocks.bootstrap()
    });

    it('2.1 should decode JWT token ', (done) => {
        done();
    });

});


